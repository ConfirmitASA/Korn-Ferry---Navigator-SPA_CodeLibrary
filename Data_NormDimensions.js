class NormDimensions {
  static const CacheKey = 'NORMDIMS';
  
  static function Data( page_context ) {
	
    var normsdata = Norms.Data( page_context );
    
    //DataUtil.RawItems ( Items, page_context );
    var o = {};

    // Loop over Norm cuts
    for (var norm_id in normsdata) {
      
      // example: norm_id = "NORMS.<NormId>.0"
	
	  // Compute the key      
      var parts = norm_id.split('.');
      parts[0] = CacheKey;
      var key = parts.join('.'); // example: "NORMDIMS.<NormId>.0"
      o[key] = {};
      //Debug.Log ('key=' + key);
      
      var segment_data = normsdata[norm_id];
      
      // Loop over dimensions
      for (var i=0; i<Config.Dimensions.length; ++i) {
        var d = Config.Dimensions[i];
        var dimension = new Dimension ( d.Id, d.Questions, segment_data, page_context );
        o[key][d.Id] = dimension.Props();
      }
    }
    
    return o;
  }

}