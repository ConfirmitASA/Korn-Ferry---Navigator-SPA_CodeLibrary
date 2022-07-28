class DataUtil {

  static function RecalculateItems ( x, page_context ) {
    var report = page_context.Items['Report'];

    Debug.Log ( 'RI 1' );        

    // This is our output object
    // It will be constructed from a mix of cached data and live queries
    LoadFromCache (x, page_context);

    Debug.Log ( 'RI 2' );        

    var o = {};
    
    var table_query_required = (page_context.Items[x.CacheKey + '.SegmentExpression'] != '');
    
    if ( table_query_required ) {
      // Did not find everything in the cache, need to run table query
      // Data from the table will be appended to what we already found in the cache
      
      Debug.Log ('Missing one or more items in cache');
      
      // Read distributions for all segments
      var rows_data = DataUtil.GetTableRowsData2 ( x.TableName, report );  
 
    Debug.Log ( 'RI 3' );        
      
      var report = page_context.Items['Report'];
      var tu = report.TableUtils;
      var table_name = 'calc:' + x.TableName;
	  
      var cuts_titles = tu.GetColumnHeaderCategoryTitles ( table_name );
      var cuts_ids = tu.GetColumnHeaderCategoryIds ( table_name );
      
      var tmp = tu.GetRowHeaderCategoryIds ( table_name );
      var item_ids = [];
      for (var i=0; i<tmp.length; ++i)
        item_ids.push ( tmp[i][0].toUpperCase() );

    Debug.Log ( 'RI 4' );
      
    Debug.Log ( 'RI 5' );
      
      // Loop Over Columns ( segment cuts nested by metrics )
      for (var col_idx=0; col_idx<cuts_titles.length; ++col_idx) {
          var seg_titles = cuts_titles[col_idx];
          var seg_ids = cuts_ids[col_idx];
          var metric = HelperUtil.Capitalize ( seg_ids[0] ); // example: "Fav"
          var outer_segment = seg_titles[1].split('.').pop(); // example: "2019" (from "Wave.2019")
          var inner_segment = seg_titles[2].split('.').pop(); // example: "12345" (from "Orgcode.12345")
        
          var key = HelperUtil.Key ( x.CacheKey, outer_segment, inner_segment, x.Hash ( page_context ) );
          if (o[key] == null) o[key] = {};
          
          // Loop over rows
          for (var row_idx=0; row_idx<rows_data.Count; ++row_idx) {
            var item_id = item_ids[row_idx];
            var data = rows_data[row_idx];
            var value = data[col_idx];
            
            if (o[key][item_id] == null) o[key][item_id] = {Dist:{}};
            
            o[key][item_id].Dist[metric] = value;            
          }
      }
    }
    
    Debug.Log ( 'RI 6' );
    
    // Loop over everthing that was queried
    var output = page_context.Items[ x.CacheKey ];
    for (var key in o) {
      
      // Save to Page Context
      output[key] = o[key]; 
      
      // Save to Redis cache
      CacheUtil.SaveData ( key, o[key], page_context );
    }
    
    Debug.Log ( 'RI 7' );
    
	return output;
  }
  
  static function RecalculateItems_Breakdown ( x, page_context ) {
    var report = page_context.Items['Report'];
	var breakdown_variable_id = HelperUtil.BreakdownVariableId ( page_context );


    // This is our output object
    // It will be constructed from a mix of cached data and live queries
    LoadFromCache (x, page_context);

    var o = {};
    var table_query_required = (page_context.Items[x.CacheKey + '.SegmentExpression'] != '');
    
    if ( table_query_required ) {
      // Did not find everything in the cache, need to run table query
      // Data from the table will be appended to what we already found in the cache
      
      // Read distributions for all segments
      var rows_data = DataUtil.GetTableRowsData2 ( x.TableName, report );  
      
      var report = page_context.Items['Report'];
      var tu = report.TableUtils;
      var table_name = 'calc:' + x.TableName;
	  
      var cuts_titles = tu.GetColumnHeaderCategoryTitles ( table_name );
      var cuts_ids = tu.GetColumnHeaderCategoryIds ( table_name );
      
      var tmp = tu.GetRowHeaderCategoryIds ( table_name ); // Codes (410 for Male, ...)
      var item_ids = [];
	  var metric_codes_outer = []; // example: ['410', '420', ...]
	  
      for (var i=0; i<tmp.length; ++i) {
        item_ids.push ( tmp[i][0].toUpperCase() );
		metric_codes_outer.push ( tmp[i][1] );
	  }
      
      // Loop Over Columns ( segment cuts nested by metrics )
      for (var col_idx=0; col_idx<cuts_titles.length; ++col_idx) {
          var seg_titles = cuts_titles[col_idx];
          var seg_ids = cuts_ids[col_idx];
          var metric = HelperUtil.Capitalize ( seg_ids[0] ); // example: "Fav"
          var outer_segment = seg_titles[1].split('.').pop(); // example: "2019" (from "Wave.2019")
          var inner_segment = seg_titles[2].split('.').pop(); // example: "12345" (from "Orgcode.12345")
        
          var key = HelperUtil.Key ( x.CacheKey, outer_segment, inner_segment, x.Hash ( page_context ), breakdown_variable_id  );
          if (o[key] == null) o[key] = {};
          
          // Loop over rows
          for (var row_idx=0; row_idx<rows_data.Count; ++row_idx) {
            var item_id = item_ids[row_idx];
            var data = rows_data[row_idx];
            var value = data[col_idx];
			var breakout = metric_codes_outer[row_idx]; // example: '410' (for Male)

			if ( o[key][breakout] == null ) o[key][breakout] = {};
			if ( o[key][breakout][item_id] == null ) o[key][breakout][item_id] = {Dist:{}};
			
            o[key][breakout][item_id].Dist[metric] = value;            
          }
      }
    }
    
    // Loop over everthing that was queried
    var output = page_context.Items[ x.CacheKey ];
    for (var key in o) {
      
      // Save to Page Context
      output[key] = o[key]; 
      
      // Save to Redis cache
      CacheUtil.SaveData ( key, o[key], page_context );
    }
    
	return output;
  }
  
  
  static function LoadFromCache (x, page_context, breakout_variable_id) {
    
    page_context.Items[ x.CacheKey ] = {};
    var obj = page_context.Items[ x.CacheKey ];
    var user = page_context.Items[ 'User' ];

    // STEP 1: Look up all requested segments
    var segments = SegmentUtil.GetSegments( page_context );

    // STEP 2: Exclude segments where data is cached
    var filter_hash = x.Hash( page_context );
    
    var segments; 
    var query_segments = [];
    for (var i=0; i<segments.length; ++i) {
      
        var segment = segments[i];
        var key = HelperUtil.Key ( x.CacheKey, segment.WaveId(), segment.NodeId(), filter_hash, breakout_variable_id );
      
        // Retrieve from cache
        var data = CacheUtil.GetData ( key, page_context );
      
        if ( data != null ) {
          // Found, store it in pageContext
          Debug.Log ('Appending: ' + key);
          obj[ key ] = data;
        }
        else {  
          // Not found, add to query
          query_segments.push ( segment );
        }  
    }
    
    var expressions = [];
    for (var i=0; i<query_segments.length; ++i) {
        var expression = query_segments[i].Expression();
        expressions.push ( expression );
    }
    
    var segment_expression = expressions.length==0 ? '' : '(' + expressions.join('+') + ')';
    page_context.Items[x.CacheKey + '.SegmentExpression'] = segment_expression;

    Debug.Log ('DataUtil.LoadFromCache 7');
  }
    
	
  static function Recalculate ( x, page_context ) {
      var report = page_context.Items['Report'];

    // This is our output object
    // It will be constructed from a mix of cached data and live queries
    LoadFromCache (x, page_context);
    var o = page_context.Items[ x.CacheKey ];
    
    var table_query_required = (page_context.Items[x.CacheKey + '.SegmentExpression'] != '');
    
    if ( o == null ) o = {}; // if nothing was found in the cache
    
    if ( table_query_required ) {
      // Did not find everything in the cache, need to run table query
      // Data from the table will be appended to what we already found in the cache
      var report = page_context.Items['Report'];
     
      // Read distributions for all segments
      var rows_data = DataUtil.GetTableRowsData2 ( x.TableName, report );  
      
      var tu = report.TableUtils;
      var table_name = 'calc:' + x.TableName;
      var cuts = tu.GetColumnHeaderCategoryTitles ( table_name );
      
      var metrics = tu.GetRowHeaderCategoryTitles ( table_name );
      var metric_codes = []; // example: ['Detractors', 'Neutrals', 'Promoters']
      
      for (var i=0; i<metrics.length; ++i)
          metric_codes.push ( metrics[i][0] );    
  
      // Loop Over Columns ( segment cuts )
      for (var col_idx=0; col_idx<cuts.length; ++col_idx) {
         var seg = cuts[col_idx];
                
          var outer_segment = seg[0].split('.').pop(); // example: "2019" (from "Wave.2019")
          var inner_segment = seg[1].split('.').pop(); // example: "12345" (from "Orgcode.12345")
        
          var key = HelperUtil.Key ( x.CacheKey, outer_segment, inner_segment, x.Hash ( page_context ) );
          if (o[key] == null) o[key] = {Dist:{}};
  
          // Loop over rows
          for (var row_idx=0; row_idx<rows_data.Count; ++row_idx) {
            var data = rows_data[row_idx];
            var metric = metrics[row_idx];
            var value = data[col_idx];
            o[key].Dist[metric] = value;            
          }

          // Save to Redis cache
          CacheUtil.SaveData ( key, o[key], page_context );
      }
    }
        
	return o;  
  }
 
 static function Recalculate_Breakdown ( x, page_context ) {
    var report = page_context.Items['Report'];

	Debug.Log ('Recalculate_Breakdown');
   
	var breakdown_variable_id = HelperUtil.BreakdownVariableId ( page_context );
   
	// This is our output object
	// It will be constructed from a mix of cached data and live queries
	LoadFromCache (x, page_context, breakdown_variable_id);
	var o = page_context.Items[ x.CacheKey ];
	
	var table_query_required = (page_context.Items[x.CacheKey + '.SegmentExpression'] != '');
	
	if ( o == null ) o = {}; // if nothing was found in the cache
	
	if ( table_query_required ) {
	  // Did not find everything in the cache, need to run table query
	  // Data from the table will be appended to what we already found in the cache
	  
	  // Read distributions for all segments
	  var rows_data = DataUtil.GetTableRowsData2 ( x.TableName, report );  
	  
	  var tu = report.TableUtils;
	  var table_name = 'calc:' + x.TableName;
	  var cuts = tu.GetColumnHeaderCategoryTitles ( table_name );
	  
	  var metrics = tu.GetRowHeaderCategoryTitles ( table_name );
	  var metrics_breakouts = tu.GetRowHeaderCategoryIds ( table_name ); // Codes (410 for Male, ...)
	  
	  var metric_codes = []; // example: ['Detractors', 'Neutrals', 'Promoters']
	  var metric_codes_outer = []; // example: ['410', '420', ...]
	  
	  for (var i=0; i<metrics.length; ++i) {
		metric_codes.push ( metrics[i][0] );    
		metric_codes_outer.push ( metrics_breakouts[i][1] );
	  }
	  
	  Debug.Log ( 'metric_codes_outer=' + metric_codes_outer.join(', ') );
  
	  // Loop Over Columns ( segment cuts )
	  for (var col_idx=0; col_idx<cuts.length; ++col_idx) {
		var seg = cuts[col_idx];

		var outer_segment = seg[0].split('.').pop(); // example: "2019" (from "Wave.2019")
		var inner_segment = seg[1].split('.').pop(); // example: "12345" (from "Orgcode.12345")

		var key = HelperUtil.Key ( x.CacheKey, outer_segment, inner_segment, x.Hash ( page_context ), breakdown_variable_id );
		if (o[key] == null) o[key] = {}; // {Dist:{}};

		// Loop over rows
		for (var row_idx=0; row_idx<rows_data.Count; ++row_idx) {

			var data = rows_data[row_idx];
			var metric = metric_codes[row_idx]; // example: 'Fav'
			var breakout = metric_codes_outer[row_idx]; // example: '410' (for Male)

			if ( o[key][breakout] == null) o[key][breakout] = {Dist:{}};

			var value = data[col_idx];
			o[key][breakout].Dist[metric] = value;            
		}

		  // Save to Redis cache
		  CacheUtil.SaveData ( key, o[key], page_context );
	  }
	}
		
	return o;  
  }
  
  static function RecalculateNSQ( x, page_context ) {

	var user = page_context.Items['User'];
	var key = [
	  x.CacheKey,
	  Config.CurrentWave,
	  user.PersonalizedReportBase,
	  x.Hash(page_context)
	].join('.'); // example: NSQ.2020.389.0	  

	var o = CacheUtil.GetData ( key, page_context );
       
    if ( o == null ) {

		var o = {};  // if nothing was found in the cache
		var output = {};

      	var report = page_context.Items['Report'];
		var tu = report.TableUtils;
		
		var table_name = 'calc:nsq';
		var ids = tu.GetRowHeaderCategoryIds ( table_name );
		var titles = tu.GetRowHeaderCategoryTitles( table_name );
		var rows_data = tu.GetPlainTableValues( table_name );

		for (var i=0; i<ids.length; ++i) {
		  var row_data = rows_data[i];
		  var t = titles[i];
		  var codes = ids[i];
		  var type = (ids[i].length == 3) ? 'MULTI' : 'SINGLE';
		  
		  var selected = (type == 'MULTI') ? codes[0] : '-';
		  
		  var qid = t[t.length-1].toUpperCase();
		  
		  if ( output[qid] == null) {
			switch (type) {
			  case 'SINGLE':
				output[qid] = {N:0, Dist:{}};
				break;
				
			  case 'MULTI':
				output[qid] = {CAT: {}};
				break;
			}
		  }
		  
		  var n = row_data[0];
		  var code = codes[codes.length-2];
		  
			switch (type) {
			  case 'SINGLE':
				Debug.Log ('SINGLE: Adding ' + n);
				output[qid].N += n;
				output[qid].Dist[code] = {N: n};
				break;
				
			  case 'MULTI':
				var cat = output[qid].CAT;
				if (cat[code] == null) cat[code] = {N:0};
				cat[code].N += n;
				if (selected == '1') cat[code].C = n;
				break;
			}  
		  
		}
		
		o[key] = output;

		// Save to Redis cache
		CacheUtil.SaveData ( key, o, page_context ); // note: not o[key]
		
	}
	else {
		Debug.Log ('Found in cache: ' + key );
	}
	return o;
  }
  
  
  static function Raw_NSQ ( x, page_context ) {
  	var o = RecalculateNSQ ( x, page_context );
	return o;
  }

 
  static function Raw( x, page_context ) {    
    var o = Recalculate( x, page_context );
    return o;
  } 

  static function Raw_Breakdown( x, page_context ) {    
    var o = Recalculate_Breakdown( x, page_context );
    return o;
  } 



  static function RawItems ( x, page_context ) {
    var o = RecalculateItems( x, page_context );
    return o;  
  }  

  static function RawItems_Breakdown ( x, page_context ) {
    var o = RecalculateItems_Breakdown( x, page_context );
    return o;  
  }  


  static function Raw_N(x, page_context) {

      Debug.Log('Raw_N');

      // This is our output object
      // Either cached data or a live query

    var report = page_context.Items['Report'];
    var user = page_context.Items['User'];
	
	var map = GlobalObjects.GetHierarchyMap ( report, page_context );
	var node_id = user.PersonalizedReportBase; // map['-1'].Children[0].Id;
	  
	  
	  var user = page_context.Items['User'];
	  var key = [
		  x.CacheKey,
		  Config.CurrentWave,
		  node_id,
		  x.Hash(page_context)
	  ].join('.'); // example: N.2020.389.0	  
	  
	  var cached_data = CacheUtil.GetData ( key, page_context );
	  var o = {};
	  
      if (cached_data == null) {
		  
		  Debug.Log ('Not found in cache: ' + key + '; querying');
		  
          // Did not find everything in the cache, need to run table query
			
          // Read N distribution for Current Wave for the current breakdown variable
          var rows_data = DataUtil.GetTableRowsData2(x.TableName, report);
          o[key] = {N: rows_data[0][0]};

          // Save to Redis cache
          CacheUtil.SaveData(key, o[key], page_context);
      }
	  else {
		  Debug.Log ('Found in cache: ' + key);
		  o[key] = cached_data;
	  }

      return o;
  }


  static function Raw_N_Breakdown(x, page_context) {

      Debug.Log('Raw_N_Breakdown');

      var breakdown_variable_id = HelperUtil.BreakdownVariableId( page_context ); // example: "Age"

      // This is our output object
      // Either cached data or a live query
	  
	  var user = page_context.Items['User'];
	  var key = [
		  x.CacheKey,
		  Config.CurrentWave,
		  user.PersonalizedReportBase,
		  x.Hash(page_context),
		  breakdown_variable_id.toUpperCase()
	  ].join('.'); // example: NX.2020.389.0.AGE	  
	  
	  var cached_data = CacheUtil.GetData ( key, page_context );
	  var o = {};
	  
      if (cached_data == null) {
		  
		  Debug.Log ('Not found in cache: ' + key + '; querying');
		  
          // Did not find everything in the cache, need to run table query
			
          // Read N distribution for Current Wave for the current breakdown variable
          var report = page_context.Items['Report'];
          var rows_data = DataUtil.GetTableRowsData2(x.TableName, report);

          var tu = report.TableUtils;
          var table_name = 'calc:' + x.TableName;
          var breakouts = tu.GetRowHeaderCategoryIds(table_name); // Codes (410 for Male, ...)
          var codes = [];
          for (var i = 0; i < breakouts.length; ++i)
              codes.push(breakouts[i][0]);

          o[key] = {};

          // Loop over rows
          for (var row_idx = 0; row_idx < rows_data.Count; ++row_idx) {

              var data = rows_data[row_idx]; // array length=1 (data for Current Wave)
              var breakout = codes[row_idx]; // example: '410' (for Male)
              o[key][breakout] = {
                  N: data[0]
              };
          }

          // Save to Redis cache
          CacheUtil.SaveData(key, o[key], page_context);
      }
	  else {
		  Debug.Log ('Found in cache: ' + key);
		  o[key] = cached_data;
	  }

      return o;
  }

  
  static function Count (distribution) {
  	var count = 0;
    for (var key in distribution)
      count += distribution[key];
    
    return count;
  }
  
    static function Copy ( o ) {
      var c;
      eval ( 'c=' + JSON.stringify(o) + ';' );
      return c;    
    }
  
	static function GetTableRowsData2 ( table_name, report ) {

      var tname = 'calc:' + table_name;
      
	  var values = report.TableUtils.GetPlainTableValues(tname);  
      
	  return values;
	}
 
	static function GetTableData2 ( table_name, report ) {

      var counter = 0;
	  var tname = 'calc:' + table_name;
	  var t = {};
	  var values = report.TableUtils.GetPlainTableValues(tname);  
	  var items = Config.QuestionIds;
	  
	  for (var i=0; i<items.length; ++i) {
		
		var id = (i+1)+'';
		t[id] = {
		  Label: SurveyMetaData.GetQuestion(report, 'ds0', items[i]).Label,
		  Values: values[i]
		};
	  }
	  
	  return t;
	}
 
 
}