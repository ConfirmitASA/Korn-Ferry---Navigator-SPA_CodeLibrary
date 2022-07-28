class SegmentUtil {
 
  static function GetAllSegmentsExpression ( pageContext ) {
    
    Debug.Log ('GetAllSegmentsExpression 1');
    
  	var o = [];
    var segments = GetSegments ( pageContext );
    
    Debug.Log ('GetAllSegmentsExpression 2');
    
    for (var i=0; i<segments.length; ++i)
      	o.push ( segments[i].Expression() );
    
    Debug.Log ('GetAllSegmentsExpression 3');
    
    return '(' + o.join( '+' ) + ')';
  }
  
  static function GetSegments( pageContext ) {
    
    Debug.Log ('GetSegments - BEGIN');
    
    var segments = [];
    var user = pageContext.Items[ 'User' ];
    var report = pageContext.Items[ 'Report' ];
    var current_branch_id = user.PersonalizedReportBase;
    var map = HelperUtil.HierarchyMap( pageContext );
        
    // Current Year: Current Node
    Debug.Log ('CurrentId: ' + current_branch_id);
    Debug.Log ( map[current_branch_id] == null ? 'NULL' : map[current_branch_id].Label );

    segments.push ( new WaveNode2(Config.CurrentWave, current_branch_id, report ) );
    
    // Current Year: Parent Node (if applicable)
    Debug.Log ('Checking parent segment');
    var parent = map[current_branch_id].Parent;
    if ( parent != null && parent.Id != '-1' ) {
      Debug.Log ('ParentId: ' + parent.Id + ': ' + parent.Label );
      segments.push ( new WaveNode2(Config.CurrentWave, parent.Id, report) );
    }
    
    // Current Year: Top Node
    Debug.Log ('Checking top node');
    var top_node = map['-1'].Children[0]; // should always be length 0
    if (top_node.Id != parent.Id && top_node.Id != current_branch_id) {
      Debug.Log ('top_node.Id: ' + top_node.Id + ': ' + top_node.Label );
      segments.push ( new WaveNode2(Config.CurrentWave, top_node.Id, report ) );
    }
    
    // Previous Years: Current Branch
    Debug.Log ('Adding waves');
    var trend_codes = HelperUtil.GetTrendCodes2( report );
    for (var i=0; i<trend_codes.length; ++i) {
      segments.push ( new WaveNode2(trend_codes[i], current_branch_id, report ) );
    }  
    
    Debug.Log ('GetSegments - END');
    return segments;
  }
  
  static function DemoAndHierarchy( user, page_context ) {
    var o = [];
    
  	var demo_filter_expression = Demo( page_context );
    if ( !HelperUtil.NullOrEmptyString (demo_filter_expression) )
        o.push ( '(' + demo_filter_expression + ')');
    
    var report = page_context.Items['Report'];
	var branch_filter_expression = Branch2 ( user, report );
    o.push ( '(' + branch_filter_expression + ')' );
    
    return o.join(' AND ');
  }
  
  static function Demo( page_context ) {
  	return page_context.Items['FilterExpression']
  }
  
  static function Branch2 ( user, report ) {
	return 'INHIERARCHY(' + report.PersonalizedQuestion.QuestionId + ', "' + user.PersonalizedReportBase + '")';  
  }
  
  static function CurrentWave() {
  	return 'Wave="' + Config.CurrentWave  + '"';
  }
}