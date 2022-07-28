class Items_Breakdown {
  static const CacheKey = 'ITEMSX';
  static const TableName = 'items_breakdown';
  
  static function Data( page_context ) {    
    
    // Data for multiple outer segments, example:
    // ITEMSX.2020.389.0.GENDER, ITEMSX.2018.389.0.GENDER, ITEMSX.2019.389.0.GENDER
    var outer_data = DataUtil.RawItems_Breakdown( Items_Breakdown, page_context );

    for (var main_key in outer_data) { // example main_key: "ITEMSX.2020.389.0.GENDER"
     	var segments_data = outer_data[main_key];
      
        for (var segment_code in segments_data) {          
          var data = segments_data[segment_code];
          for (var key in data) {
              var obj = data[key]; // data for one demographic segment (such as "410" Male)
              Privacy.ApplyMinN ( obj ); // obj contains all questions
          }
        } 
    }
    
    return outer_data;
  }

  static function Hash( page_context ) {
  	return HelperUtil.FilterHashCode ( page_context );
  }
  
}