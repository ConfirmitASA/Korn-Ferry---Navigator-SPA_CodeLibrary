class N {
  static const CacheKey = 'N';
  static const TableName = 'n';
  
  static function Data( page_context ) {    
    var data = DataUtil.Raw_N(N, page_context );
	return data;
  }

  static function Hash( page_context ) {
  	return HelperUtil.FilterHashCode ( page_context );
  }
  
}