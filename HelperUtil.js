class HelperUtil {

  static var TOP_NODE_ID;
  static var ClientName, ClientName2

  static function Init ( report, confirmit, user, log, pageContext ) {
      pageContext.Items['User'] = user;
      pageContext.Items['Report'] = report;		
    
      GlobalObjects.Set ( pageContext, confirmit, log );
  };      
      
  static function GetHeaderQuestion(breakdown_qid) {
	var hq: HeaderQuestion = SMARTVIEW_API.Q( breakdown_qid, {
		totals: false,
		hidedata: true
	});

	if (breakdown_qid == Config.PFQ) ApplyHierarchySettings ( hq );
    
    return hq;
  }
  
  static function ApplyHierarchySettings ( hq : HeaderQuestion ) {
    hq.ReferenceGroup.Enabled = true;
    hq.ReferenceGroup.Self = true;
    hq.ReferenceGroup.NumberOfChildLevels = 1;
  }
  

  static function GetLiveDate() {
    var parts = Config.LiveDate.split('-');
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1], 10) - 1;
    var date = parseInt(parts[2]);
    
    var live_date = new Date();  
    live_date.setFullYear ( year );
    live_date.setMonth ( month );
    live_date.setDate ( date );
	
    return live_date;    
  }

  
  static function IsLive ( pageContext ) {
    if ( pageContext.Items['is_live'] == null ) {
      var now = new Date();
      pageContext.Items['is_live'] = (now >= GetLiveDate ());
    }
  	return pageContext.Items['is_live'];
  }
  
  static function TextSubstitute2 ( s, report ) {
    
    if ( ClientName == null ) {
      
      	var map = SurveyMetaData.GetAnswerMap ( report, 'ds0', 'ClientName');
      	var map2 = SurveyMetaData.GetAnswerMap ( report, 'ds0', 'ClientName2');

      	var ClientName = map['0'].Text;
      	var ClientName2 = map2['0'].Text;
    }    
    
    s = s.replace('^ClientName()^', ClientName );
    s = s.replace('^ClientName ()^', ClientName ); // because some questions were coded this way, unclear why
    s = s.replace('^ClientName2()^', ClientName2 );
    
    return s;
  }
  
  static function BreakdownVariableId ( pageContext ) {
    var breakdown_qid = pageContext.Items['Breakdown'];
    
    // For Testing in preview
    if ( breakdown_qid == null ) breakdown_qid = 'Age';
    
    return breakdown_qid;
  }
  
  static function TopNodeId( pageContext ) {
    if ( TOP_NODE_ID == null) {
      var map = HelperUtil.HierarchyMap( pageContext );
      var TOP_NODE_ID = map['-1'].Children[0].Id;
    }
  	return TOP_NODE_ID;
  }
  
  static function isNotANumber (x) {
    if (x==0) return false;
    return isNaN (x) || (x == null) || (x == '');
  }
  
  static function Count ( dist ) {
      var count = 0;
      for (var key in dist)
          count += dist[key];
  
      return count;
  }
  
  static function CountsToPercents  ( dist ) {
      var count = Count ( dist );
      var o = {};
  
      for ( var key in dist)
          o[key] = (count == 0) ? null : Math.round(100 * dist[key] / count);
      
      return o;
  }
  
  static function GetTrendCodes2( report ) {
  	// return array of all wave codes that do not match the current wave
    if (GlobalObjects.TrendCodes == null) {
      var map = SurveyMetaData.GetAnswerMap(report, 'ds0', 'Wave');
      var o = [];
      for (var key in map)
        if ( key != Config.CurrentWave ) o.push ( key ); 

      GlobalObjects.TrendCodes = o;
    }
    
    return GlobalObjects.TrendCodes;
  }
  
  static function HierarchyMap( page_context ) {
    if ( GlobalObjects.HierarchyMap == null) {
      	var report = page_context.Items['Report'];
        GlobalObjects.HierarchyMap = HierarchyUtil.Map( report, 'calc:hier', page_context );
    }
    return GlobalObjects.HierarchyMap;
  }
  
  static function NullOrEmptyString(o) {
  	return o==null || o=='';
  }
  
  static function Capitalize(s)
  {
      return s.substring(0,1).toUpperCase() + s.substring(1,1000);
  }


  static function LanguageInfo ( report ) {
    switch ( report.CurrentLanguage ) {
    
      case 1: // Arabic
      case 14337: // Arabic (UAE)
        return {
          RTL: true,
          Lang: 'ar'
        }
        
      default:
        return {
          RTL: false
        };
    }
  
  }  
  
  
  static function IsRtl ( report ) {
    
    var language_info = LanguageInfo ( report );
    
    return language_info.RTL;
    
  }

  static function GetDirection( report ) {
    return IsRtl ( report ) ? 'rtl' : 'ltr';
  }

  static function Key ( type_id, wave_id, node_id, hash, breakout_variable_id ) {
    
    /* Examples:

      type_id: "ENPS"
      wave_id: "2020"
      node_id: "389"
      hash: "12345678"
      breakout_variable_id: null or Gender
		
	*/
    
    var o = [type_id, wave_id, node_id];
    if (hash != null) o.push ( hash );
    if (breakout_variable_id != null ) o.push ( breakout_variable_id.toUpperCase() );
    
  	return o.join('.');
  }
  
  static function FilterHashCode ( pageContext ) {
    var key = pageContext.Items['FilterExpressionKey'];
    if (key == null) {
      Debug.Log ('*** FilterExpressionKey not set ***')
      key = '';
    }
    return HashCode ( key );
  }
  
  static function HashCode ( s ) {
      var hash = 0, i, chr;
      if (s.length === 0) return hash;
      for (i = 0; i < s.length; i++) {
        chr	= s.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
  };
}