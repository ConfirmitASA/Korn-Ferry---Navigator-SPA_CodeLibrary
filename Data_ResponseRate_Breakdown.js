class ResponseRate_Breakdown {
  static const CacheKey = 'RRX';
  static const TableName = 'rr_breakdown';
  
  static function Data( page_context ) {
      var user = page_context.Items['User'];
      var key = [ CacheKey, Config.CurrentWave, user.PersonalizedReportBase ].join('.'); // example: RRX.2020.389
      var report = page_context.Items['Report'];
    
      // Check Redis Cache
    	/*
      var cached_value = CacheUtil.GetData ( key, page_context );
      if (cached_value != null) {
        return cached_value;
      }
      */
    
      // Not found in cache, run live query
      Debug.Log ('Running live RRX query');
    
      var rows = DataUtil.GetTableRowsData2 ( 'rr_breakdown', report );
      var ids = report.TableUtils.GetRowHeaderCategoryIds('calc:rr_breakdown');
      
      var o = {};
    
      for (var i=0; i<ids.length; ++i) {
        var node_id = ids[i][0]; // example: "389"
        var row = rows[i];
        var completes = row[0];
        var n = row[1];
        o[node_id] = {
          N: Config.ResponseRateReporting.SelfReportedHierarchyNode
          	? CountsByNode.Map[ node_id ]
          	: n,
          C: completes
        };
      }

      var response_rate = {};
      response_rate[key] = {
        OrgCode: o
      };
    
    /*
      // Save to cache
      CacheUtil.SaveData ( key, response_rate, page_context );    
    */
    
      return response_rate;
    
  }
}