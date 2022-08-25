class Dimensions {
  static const CacheKey = 'DIMS';
  
  static function Data( page_context ) {
	
    var raw_items = DataUtil.RawItems ( Items, page_context );
    var o = {};

    // Loop over segments
    var segments = SegmentUtil.GetSegments( page_context );
    var hash = HelperUtil.FilterHashCode( page_context );
    
    for (var segment_idx=0; segment_idx<segments.length; ++segment_idx) {
      var segment = segments[segment_idx];
      var key = HelperUtil.Key ( CacheKey, segment.WaveId(), segment.NodeId(), hash );
      
      var items_key = HelperUtil.Key ( Items.CacheKey, segment.WaveId(), segment.NodeId(), hash );
      o[key] = {};

      var segment_data = raw_items[items_key];
      
      // Loop over dimensions
      for (var i=0; i<Config.Report.Dimensions.length; ++i) {
        var d = Config.Report.Dimensions[i];
        var dimension = new Dimension ( d.Id, d.Questions, segment_data, page_context );
        o[key][d.Id] = dimension.Props();
      }
      
      // Apply Min N to this segment
      Privacy.ApplyItemsMinN ( o[key] );
    }
    
    return o;
  }

  
}