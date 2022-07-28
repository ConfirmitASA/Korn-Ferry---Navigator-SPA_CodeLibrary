class Dimensions_Breakdown {
  static const CacheKey = 'DIMSX';
  
  static function Data( page_context ) {
	
	var breakdown_variable_id = HelperUtil.BreakdownVariableId ( page_context );
	
    var outer_segments = DataUtil.RawItems_Breakdown ( Items_Breakdown, page_context );
    var o = {};

    // Loop over segments
    var segments = SegmentUtil.GetSegments( page_context );
    var hash = HelperUtil.FilterHashCode( page_context );
    
	// Loop over outer segements
	for (var main_key in outer_segments) {
		// main_key example: "ITEMSX.2020.389.0.GENDER"
		var key = main_key.split('ITEMSX.').join(CacheKey + '.'); // example: "DIMSX.2020.389.0.GENDER"
		o[key] = {};
		
		var segments_data = outer_segments[main_key]; // example: { '410': {...}, '420': {...} }
		for (var segment_key in segments_data) {
			o[key][segment_key] = {};
			var segment_data = segments_data[segment_key]; // example: { 'AV01': {N: ..., Dist: {...}}, 'AV02': ...}

			// Loop over dimensions
			for (var i=0; i<Config.Dimensions.length; ++i) {
				var d = Config.Dimensions[i];
				var dimension = new Dimension ( d.Id, d.Questions, segment_data, page_context );
				o[key][segment_key][d.Id] = dimension.Props();
			}

			// Apply Min N to this segment
			Privacy.ApplyItemsMinN ( o[key][segment_key] );

			
		}
	}
    
    return o;
  }

  
}