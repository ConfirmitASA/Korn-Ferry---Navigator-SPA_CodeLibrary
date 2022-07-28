class EffectivenessProfile_Breakdown {
  static const CacheKey = 'EPX';
  static const TableName = 'ep_breakdown';
  
  static function Data( page_context ) {    
    var segments_data = DataUtil.Raw_Breakdown( EffectivenessProfile_Breakdown, page_context ); // data for multiple segments (Male, Female, ...)
    
    for (var segment_code in segments_data) {
      var data = segments_data[segment_code];
      for (var key in data) {
          var obj = data[key]; // data for one segment
          Privacy.ApplyMinN ( obj );
      }
    }
    return segments_data;
  }

  static function Hash( page_context ) {
  	return HelperUtil.FilterHashCode ( page_context );
  }
  
}