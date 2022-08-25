class Comments {
	static var CacheKey = 'COMM';
	static var HitListName = 'comments';

	static function Data(page_context) {

      	var user = page_context.Items['User'];
      	var report = page_context.Items['Report'];
      
		var node_id = user.PersonalizedReportBase;
		var wave_id = Config.Report.CurrentWave;
		var filter_hash = Hash( page_context );
      
      	var key = CacheKey; // example: "COMM"

        // Note: We're not storing Comments queries in Redis
              
        var full_hitlist_name = 'calc:' + HitListName;
      
        var json = report.HitlistUtils.GetJson ( full_hitlist_name, 1000000 );
      	var records;
      	eval ( 'records=' + json + ';');

      	var o = {};
      
        for (var i=0; i<Config.Report.Comments.length; ++i) {
          var qid = Config.Report.Comments[i].Question; // example: "Comm1"
          var key = [CacheKey, wave_id, node_id, qid.toUpperCase(), filter_hash].join('.');
          // example: "COMM.2020.389.COMM1.0"
          o[key] = [];
          
          for (var j=0; j<records.length; ++j) {
            var comment = records[j][qid];
            if ( comment != "" && comment != null) {
              var category = records[j][Config.Report.Comments[i].QuestionCategory];
               o[key].push(
                 {
                  Comment: comment, 
                  Category: category
                 }
               );
            }
          }
        }
      
      	// Privacy Handler
        for (var i=0; i<Config.Report.Comments.length; ++i) {
          var qid = Config.Report.Comments[i].Question; // example: "Comm1"
          var key = [CacheKey, wave_id, node_id, qid.toUpperCase(), filter_hash].join('.');
          // example: "COMM.2020.389.COMM1.0"
          if ( o[key].length < Config.Report.Privacy.Verbatim.MinN)
            o[key] = [];//'Too Few Responses'];
        }
      
        var data = {
          COMM: o
        };
      
      	// example:
        // data = { 'COMM': {
      	//     'COMM.2020.389.COMM1.0': [{Comment: 'This is comment 1', Category: "..."},  ...],
        //     'COMM.2020.389.COMM2.0': [{Comment: 'This is another comment', Category: "..."},  ...]
        // }
      
      	return data;
	}

	static function Hash(page_context) {
		return HelperUtil.FilterHashCode(page_context);
	}

}