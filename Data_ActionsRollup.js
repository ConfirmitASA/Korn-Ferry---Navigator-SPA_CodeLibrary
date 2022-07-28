class ActionsRollup {
	
	static var HitListName = 'actions_rollup';

	static function Data(page_context) {

      	var report = page_context.Items['Report'];
              
        var full_hitlist_name = 'calc:' + HitListName;
      
        var json = report.HitlistUtils.GetJson ( full_hitlist_name, 1000000 );
      	var records;
      	eval ( 'records=' + json + ';');
      
        var data = records;
      
      	return data;
	}

}