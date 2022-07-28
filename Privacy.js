class Privacy {
  
    static function ApplyMinN ( obj, min_n ) {
      if ( min_n == null ) min_n = Config.Privacy.Table.MinN; // default
      var count = (obj.N == null ) ? DataUtil.Count ( obj.Dist ) : obj.N;

      if ( count < min_n ) {
        obj.N = null;
        var distribution = obj.Dist;
        for (var key in distribution)
          distribution[key] = null;
      }
      else {
      	obj.N = count; 
      }
    }  
  
  
    static function ApplyItemsMinN ( obj, min_n ) {
      for (var item_id in obj) {
       	var item = obj[item_id];
        ApplyMinN ( item, min_n );
      }
    }    
}