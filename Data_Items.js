class Items {
  static const CacheKey = 'ITEMS';
  static const TableName = 'items';
  
  static function Data( page_context ) {    
    
    var data = DataUtil.RawItems( Items, page_context ); // data for multiple segments
    
    for (var key in data) {
    	var obj = data[key]; // data for one segment
        Privacy.ApplyItemsMinN ( obj );
    }
    
	return data;
  }

  static function Hash( page_context ) {
  	return HelperUtil.FilterHashCode ( page_context );
  }
  
}