class ActionsOwn{
	
	static var HitListName = 'actions_own_shared'; 

	static function Data(page_context) {

      	var report = page_context.Items['Report'];
              
        var full_hitlist_name = 'calc:' + HitListName;
      
        var json = report.HitlistUtils.GetJson ( full_hitlist_name, 1000000 );
      	var records;
      	eval ( 'records=' + json + ';');
      	
      	/*
        var data = {};
        for (var i=0; i<records.length; ++i) {
          var record = records[i];
          data[record['item_id']] = record;
        }
      	*/
      
      	var data = records;
               
      	return data;
	}

}