class CacheUtil {

  static function GetData ( key, page_context ) {

    if ( !HelperUtil.IsLive ( page_context ) ) {
      //Debug.Log ('CacheUtil: IsLive = false');
      return null; // for professional users accessing before the live date
    }
    
	// Next, check Redis    
  	var redis_key = GetRedisKey( key );
    var s = GlobalObjects.Confirmit.ReportDataCache ( redis_key );
    if (s == null) {
      Debug.Log ( 'Read: ' + key + ' - NOT FOUND IN REDIS' );
      return null; // not found
    }
    Debug.Log ( 'Read: ' + key + ' - FOUND IN REDIS' );

    // Found, turn into JSON object
    var tmp;
    eval ('tmp=' + s + ';');
    
    return tmp;
  }

  static function SaveData ( key, obj, page_context ) {

    if ( !HelperUtil.IsLive ( page_context ) ) {
      return; // for professional users accessing before the live date
    }
    
    var s = JSON.stringify ( obj );

    page_context.Items[key] = obj;
    Debug.Log ('Save PAGE CONTEXT: ' + key);
    
  	var redis_key = GetRedisKey( key );
    Debug.Log ('Save REDIS: ' + key + ' Length=' + s.length);
    GlobalObjects.Confirmit.ReportDataCache ( redis_key, s, Config.CacheTimeout );

  }
  
  private static function GetRedisKey( key ) {
  	return Config.CacheKeyPrefix + '.' + key;
  }
  

}