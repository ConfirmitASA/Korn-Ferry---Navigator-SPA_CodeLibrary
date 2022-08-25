class AccessControl {
  
  static const Map = {
    Intro: {SUPER: 1, MANAGER: 1},
    Home: {SUPER: 1, MANAGER: 1},
    Slideshow: {SUPER: 1, MANAGER: 1},
    
    GroupHeadlines: {SUPER: 1, MANAGER: 1},
    KeyMetrics: {SUPER: 1, MANAGER: 1},
    KeyDrivers: {SUPER: 1, MANAGER: 0},
    StrengthsAndOpportunities: {SUPER: 1, MANAGER: 1},
    EffectivenessProfile: {SUPER: 1, MANAGER: 0},
    EffectivenessProfileBreakdown: {SUPER: 1, MANAGER: 0},
    
    GroupExplore: {SUPER: 1, MANAGER: 1},
    AllResults: {SUPER: 1, MANAGER: 1},
    ResultsBreakdown: {SUPER: 1, MANAGER: 0},
    DemographicHeatmap: {SUPER: 1, MANAGER: 0},
    DemographicHighlighter: {SUPER: 1, MANAGER: 0},
    NonStandardQuestions: {SUPER: 1, MANAGER: 1},
    
    GroupComments: {SUPER: 1, MANAGER: 0},
    CommentsThemes: {SUPER: 1, MANAGER: 0},
    OpenComments: {SUPER: 1, MANAGER: 0},
    
    GroupEnps: {SUPER: 1, MANAGER: 1},
    ENPSScore: {SUPER: 1, MANAGER: 1},
    ENPSBreakdown: {SUPER: 1, MANAGER: 0},
    
    GroupResponse: {SUPER: 1, MANAGER: 0},
    ResponseRates: {SUPER: 1, MANAGER: 0},
    
    GroupActions: {SUPER: 1, MANAGER: 1},
    
    ActionsFocusAreas: {SUPER: 1, MANAGER: 1},
    ActionsSummaries:  {SUPER: 1, MANAGER: 1},      
    ActionsStatistics: {SUPER: 1, MANAGER: 0},
    
    Filters: {SUPER: 1, MANAGER: 1},
    LogOut: {SUPER: 1, MANAGER: 1}
  };
  
  static const PPTMap = {
    
    Title: {SUPER: 1, MANAGER: 1},
    SurveyBackground: {SUPER: 0, MANAGER: 1},
    HowToReadResults: {SUPER: 1, MANAGER: 1},
    EngagedPerformanceFramework: {SUPER: 1, MANAGER: 1},
    
    KeyMetrics_Cover: {SUPER: 1, MANAGER: 1},
    KeyIndices: {SUPER: 1, MANAGER: 1},
    Engagement: {SUPER: 1, MANAGER: 1},
    Enablement: {SUPER: 1, MANAGER: 1},
    KeyDrivers: {SUPER: 1, MANAGER: 1},
    TeamStrengths: {SUPER: 1, MANAGER: 1},
    TeamOpportunities: {SUPER: 1, MANAGER: 1},

    EP_Cover: {SUPER: 1, MANAGER: 0},
    EP_Segmentation: {SUPER: 1, MANAGER: 0},
    EP_Detail: {SUPER: 1, MANAGER: 0},

    Details_Cover: {SUPER: 1, MANAGER: 1},
    Details_Dimensions: {SUPER: 1, MANAGER: 1},
    Details_Top5: {SUPER: 1, MANAGER: 1},
    Details_Bottom5: {SUPER: 1, MANAGER: 1},

    Comments: {SUPER: 1, MANAGER: 0}, // several slides treated as one

    TakingAction: {SUPER: 1, MANAGER: 1},

    Charts_Engagement: {SUPER: 1, MANAGER: 1},
    Charts_Enablement: {SUPER: 1, MANAGER: 1},
    Charts_Strengths: {SUPER: 1, MANAGER: 1},
    Charts_Opportunities: {SUPER: 1, MANAGER: 1},
    Charts_Dimensions: {SUPER: 1, MANAGER: 1},
    Charts_Top5: {SUPER: 1, MANAGER: 1},
    Charts_Bottom5:  {SUPER: 1, MANAGER: 1}

  };
  
  
  static function GetRole ( user ) {
  	return user.UserType == (ReportUserType.Confirmit)
      ? Config.Report.ProfessionalUserRole  // emulate role
      : user.Roles.join('.');  // End-User: use assigned role
  }
  
  static function VisiblePages ( pageContext, map ) {
    var user = pageContext.Items['User'];
    var role = GetRole ( user );
    var is_live = HelperUtil.IsLive ( pageContext );
    var is_professional_user = ( user.UserType == ReportUserType.Confirmit );
    
    var o = [];
    for (var key in map) {
      if ( HasPageAccess ( key, role, map ) ) {
        if ( is_live || is_professional_user ) {
          
          switch (key) {
              
            case 'GroupComments':
            case 'CommentsThemes':
            case 'OpenComments':
              if ( Config.Report.Comments.length>0 )
                o.push ( key );
              break;
              
              
            case 'GroupEnps':
            case 'ENPSScore:':
            case 'ENPSBreakdown':
              if ( Config.Report.ENPS.VariableId != null )
              	o.push ( key );
              break;
              
            case 'NonStandardQuestions':
              if ( Config.Report.NonStandardQuestions.length>0)
                o.push ( key );
              break;
            
            default:
              o.push ( key );
          }
          
        }
        else {
          switch (key) {
            case 'GroupResponse':
            case 'ResponseRates':
            case 'Intro':
              o.push (key);
              break;
          } 
        }
      }
    }
    return o;
  }
  
  static function VisibleSlides ( pageContext, map ) {
    var user = pageContext.Items['User'];
    var role = GetRole ( user );
    
    var o = [];
    for (var key in map) {
      if ( HasPageAccess ( key, role, map ) ) {
          switch (key) {
              
            case 'Comments':
              if ( Config.Report.Comments.length>0 ) o.push ( key );
              break;
            
            default:
              o.push ( key );
          }
      }
    }
    return o;
  }
  
  static function HasPageAccess ( page_id, role, map ) {
    try {
      return map[page_id][role.toUpperCase()] == 1;
    }
    catch (e) {
      //return true; // for testing
      return false;
    }
  }
  
}