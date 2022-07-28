class Dimension {
  var id;
  var qids;
  var segment_data; // raw item data for this segment (e.g. ["ITEMS.2020.389.0"] or ["NORMS".<NormId>.0"] )
  var page_context;
  var fav, neu, unfav;
  var valid_n;
  var properties;
  
  function Dimension ( dimension_id, question_ids, data, pageContext ) {
  	id = dimension_id;
    qids = question_ids;
    segment_data = data;
    page_context = pageContext;
  }
  
  
  function Props() {
    // Return Value: {N: ..., Dist: {Fav: ..., Neu: ..., Unfav: ...} as N counts
	
    if (properties == null) {
      
      var max_item_valid_n = null;
      var item_pct_distributions = [];

      for (var i=0; i<qids.length; ++i) {
      	var item = segment_data[ qids[i] ];
        if (item == null) {
          //Debug.Log ('Not found: ' + qids[i] );
        }
        else {
          var distribution = item.Dist;

          var is_norm = !distribution.hasOwnProperty('Neu');
          
          // Get the percentage distribution for the item
          // This will be used for creating Fav/Neu/Unfav scores for the dimension
          var item_pct_distribution = is_norm 
              ? distribution // handler to address Norms
              : HelperUtil.CountsToPercents ( distribution );
          
		  // Make sure it is not suppressed
		  var item_N = (item.N == null)
			? HelperUtil.Count ( item.Dist )
			: item.N;
			
		  if ( !is_norm && item_N < Config.Privacy.Table.MinN ) {
			  properties = {
				Dist: {Fav: null, Neu: null, Unfav: null},
				N: null
			  };

			  return properties;
		  }
		  
          item_pct_distributions.push ( item_pct_distribution );
		  
          
          // Track the item with the highest valid N
          var item_valid_n = is_norm 
              ? item.N // norms handler
              : DataUtil.Count ( distribution );
          
          if ( max_item_valid_n == null || item_valid_n > max_item_valid_n )
            max_item_valid_n = item_valid_n;
        }
      }
      
      var dimension_pct_distribution = is_norm
          ? {Fav: null} // norms handler
          : {Fav: null, Neu: null, Unfav: null};
      
      // Dimension scores are averages of the rounded Item averages.
      // If one or more items are missing scores, then the dimension scores will all be null.
      
      // Loop over Fav/Neu/Unfav
      for (var key in dimension_pct_distribution) {
        var valid_count = 0;
        var sum = 0;
        
        // Loop over all item percentage distributions
        for (var i=0; i<item_pct_distributions.length; ++i) {
          var x = item_pct_distributions[i][key];
          if ( x != null) {
            valid_count++;
            sum += x;
          }
        }
        if ( valid_count == item_pct_distributions.length) {
        	// All items had scores
        	dimension_pct_distribution[key] = Math.round(sum/valid_count); // rounded to whole number
        }
        else {
          	// Leave as-is (Fav/Neu/Unfav originally set to null)
        }
      }
      
      var o = {
        Dist: dimension_pct_distribution,
        N: max_item_valid_n
      }

      properties = o;
    }
    
    return properties;
  }

}