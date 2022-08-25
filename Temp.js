class Temp {
  
 static function NSQ( pageContext ) {
		var report = pageContext.Items('Report');
		
		var nsq = {};
		for (var i=0; i<Config.Report.NonStandardQuestions.length; ++i) {
			var nsq_id = Config.Report.NonStandardQuestions[i]; // example: "NSQ01"
			var q = SurveyMetaData.GetQuestion(report, 'ds0', nsq_id);
			var answer_map = SurveyMetaData.GetAnswerMap ( report, 'ds0', nsq_id );
			var tmp = {};
			for (var code in answer_map)
				tmp[code] = {Label: answer_map[code].Text};
			
			nsq[nsq_id] = {
				Label: q.Label,
				Answers: tmp
			};
		}
   
   		return nsq;
	}
  
  static function Menu( rt ) {
      var menu = [
        {"Code": "Intro"}, 
        {"Code": "Home"},
        {"Code": "Slideshow"},
        {"Code": "GroupHeadlines", "Submenu": [
          	{"Code": "KeyMetrics"},
          	{"Code": "KeyDrivers"},
          	{"Code": "StrengthsAndOpportunities"},
          	{"Code": "EffectivenessProfile"},
          	{"Code": "EffectivenessProfileBreakdown"}]
      	}, 
		{"Code": "GroupExplore", "Submenu": [
          	{"Code": "AllResults"},
			{"Code": "ResultsBreakdown"},
          	{"Code": "DemographicHeatmap"},
          	{"Code": "DemographicHighlighter"},
          	{"Code": "NonStandardQuestions"}]
      	}, 
		{"Code": "GroupComments", "Submenu": [
          	{"Code": "CommentsThemes"},
          	{"Code": "OpenComments"}]
      	}, 
        {"Code": "GroupEnps", "Submenu": [
          	{"Code": "ENPSScore"}, 
          	{"Code": "ENPSBreakdown"}]
      	}, 
        {"Code": "GroupResponse", "Submenu": [
			{"Code": "ResponseRates"}]
      	}, 
        {"Code": "GroupActions", "Submenu": [
			{"Code": "ActionsFocusAreas"},
			{ Code: 'ActionsSummaries' },
			{ Code: 'ActionsStatistics' }]
      	}, 
        {"Code": "Filters"}, 
        {"Code": "LogOut"}
      ];
      
      for (var i=0; i<menu.length; ++i) {
          var item = menu[i];
        
          switch ( item.Code ) {
        
            case 'Filters':
              item.Label = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-filter\"><polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\"></polygon></svg>";
              break;
              
            default:
              var tmp = rt['menu.' + item.Code];
              item.Label = (tmp == null) ? 'MISSING_LABEL' : tmp.Label;
              
              if ( item.Submenu != null ) {
                  
                  for (var j=0; j<item.Submenu.length; ++j) {
                      var subitem = item.Submenu[j];
                      var tmp = rt['menu.' + subitem.Code];
                      subitem.Label = (tmp == null) ? 'MISSING_LABEL' : tmp.Label;
                  }		
              }
            }
      }
      
      return menu;
	}
  
  static function Items2( report ) {
    
    var o = {};
    var p : Project = GlobalObjects.Project;    
    var q : Question =  p.GetQuestion ('GRID_RECODE');
    
    var a : Answer[] = q.GetAnswers();
    for (var i=0; i<a.length; ++i) {
    	var qid = a[i].Precode;
        o[qid] = {Label:  HelperUtil.TextSubstitute2 (p.GetQuestion(qid).HtmlText, report) };
    }
    
    return o;
  }
  
  static function Dimensions( rt ) {

    var o = {};    

/*

In Config.Report.Dimensions: [ ...
    {Id:'DIM_ENG', Questions:['OM12','OM01','OM11','OS02','OM06'],Tier:1}, //Employee Engagement
    {Id:'DIM_ENA', Questions:['WE12','JS05','JS02','WE08'],Tier:2}, //Employee Enablement
*/  

    for (var i=0; i<Config.Report.Dimensions.length; ++i) {
      try {
          var dim = Config.Report.Dimensions[i];
      
          var front = rt['KeyMetric_BackCardText.' + dim.Id ];
          var more = rt['KeyMetric_MoreCardText.' + dim.Id ];
      
          o[ dim.Id ] = {
              Items: dim.Questions,
              Label: rt['dimensions.' + dim.Id].Label,
              KeyMetric_BackCardText: (front == null) ? 'MISSING_TEXT' : front.Label,
              KeyMetric_MoreCardText: (more == null) ? 'MISSING_TEXT' : more.Label
          };
      } catch (e) {
          Debug.Log ('ERROR: \nError in Dimensions config variable \n' + e);
      }
      
    }
    
    return o;
    
  }
    
  
}