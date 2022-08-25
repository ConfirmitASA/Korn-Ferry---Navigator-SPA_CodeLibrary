class CommentCategories {
	static var CacheKey = 'COMCAT';
	static var TableName = 'comment_categories';

	static function Data(page_context) {

      	var user = page_context.Items['User'];
      	var report = page_context.Items['Report'];
      
		var node_id = user.PersonalizedReportBase;
		var wave_id = Config.Report.CurrentWave;
		var filter_hash = Hash( page_context );
      
		var key = HelperUtil.Key(CacheKey, wave_id, node_id, filter_hash);
      
      	var data = CacheUtil.GetData ( key, page_context );
        if ( data == null) {
            
          var rows_data = DataUtil.GetTableRowsData2 ( TableName, report );
          
          var full_table_name = 'calc:' + TableName;
        
          var ids = report.TableUtils.GetRowHeaderCategoryIds ( full_table_name );
          var titles = report.TableUtils.GetColumnHeaderCategoryTitles ( full_table_name ); // example: ['Comm1', 'Comm2']
        
          var o = {};
          for (var i=0; i<titles.length; ++i) {
            var variable_id = titles[i][0]; // example: 'Comm1'
            
            o[variable_id] = {N: null, Dist: {}};
            
            for (var j=0; j<rows_data.Count; ++j) {
              var value = rows_data[j][i];
              var code = ids[j][0];
              
              o[variable_id].Dist[code] = value;
            }
            o[variable_id].N = DataUtil.Count ( o[variable_id].Dist );
          }
          data = {};
          data[ key ] = o;
          CacheUtil.SaveData ( key, data, page_context );
        }
      	
      	// Privacy / Min N
        for (var key in data) {
            var obj = data[key]; // data for one segment
            Privacy.ApplyItemsMinN ( obj, Config.Report.Privacy.Verbatim.MinN );
        }
      
      	return data;
	}

	static function Hash(page_context) {
		return HelperUtil.FilterHashCode(page_context);
	}

}