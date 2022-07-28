class ResponseRate {
  static const CacheKey = 'RR';
  static const TableName = 'rr';
  
  static function Data( page_context ) {
      var user = page_context.Items['User'];
      var key = [ CacheKey, Config.CurrentWave, user.PersonalizedReportBase ].join('.'); // example: RR.2020.12345
      var report = page_context.Items['Report'];
      var is_live = HelperUtil.IsLive ( page_context );
    
    
      // Check Redis Cache
      var cached_value = is_live
          ? CacheUtil.GetData ( key, page_context )
          : null;
    
      if (cached_value != null) {
        return cached_value;
      }
    
      // Not found in cache, run live query
      Debug.Log ('Running live RR query');
      var rows_data = DataUtil.GetTableRowsData2 ( TableName, report );
      var data = rows_data[0];

      var response_rate = {};
      response_rate[key] = {
        Completes: data[0],
        Total: Config.ResponseRateReporting.SelfReportedHierarchyNode
          	? CountsByNode.Map[ user.PersonalizedReportBase ]
          	: data[1]
      };
    
      // Save to cache
      if (is_live)
        CacheUtil.SaveData ( key, response_rate, page_context );    
    
      return response_rate;
    
  }
}