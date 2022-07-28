class EffectivenessProfile {
  static const CacheKey = 'EP';
  static const TableName = 'ep';
  
  static function Data( page_context ) {    
    var data = DataUtil.Raw( EffectivenessProfile, page_context ); // data for multiple segments
    
    for (var key in data) {
    	var obj = data[key]; // data for one segment
        Privacy.ApplyMinN ( obj );
    }
	return data;
  }

  static function Hash( page_context ) {
  	return HelperUtil.FilterHashCode ( page_context );
  }
  
}