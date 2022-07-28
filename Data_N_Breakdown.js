class N_Breakdown {
  static const CacheKey = 'NX';
  static const TableName = 'n_breakdown';
  
  static function Data( page_context ) {    
    var data = DataUtil.Raw_N_Breakdown(N_Breakdown, page_context );
	return data;
  }

  static function Hash( page_context ) {
  	return HelperUtil.FilterHashCode ( page_context );
  }
  
}