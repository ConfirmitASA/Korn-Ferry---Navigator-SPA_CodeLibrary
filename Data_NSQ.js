class NSQ {
  static const CacheKey = 'NSQ';
  static const TableName = 'nsq';
  
  static function Data( page_context ) {    
    var data = DataUtil.Raw_NSQ( NSQ, page_context ); // data just for current wave

    for (var key in data) {
    	var obj = data[key]; // data for one segment
      	
      	for (var qid in obj) {
          
          var o = obj[qid];        
          var is_multi = ( o.CAT != null); 
          
          // Apply Min N logic based on question type
          if ( is_multi) {
            
              // Multi Select Question
              for (var category_key in o.CAT) {
                  var x = o.CAT[category_key];
                  if ( x.N < Config.Privacy.Table.MinN ) {
                    for (var mykey in x)
                      x[mykey] = null;
                  }
              }
          }
          else {
              // Single Select Question
            if ( o.N < Config.Privacy.Table.MinN ) {
              o.N = null;
              for (var mykey in o.Dist) o.Dist[mykey].N = null;
            }
            
          }
      }
    }
	return data;
  }

  static function Hash( page_context ) {
  	return HelperUtil.FilterHashCode ( page_context );
  }
  
}