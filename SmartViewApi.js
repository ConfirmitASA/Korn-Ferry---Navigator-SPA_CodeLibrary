/*
Codelibrary_Script.SMARTVIEW_API
Purpose/Description: 
Last updated by: Sumit 
Last updated on: 14/10/2020
*/
class SMARTVIEW_API {
	// SmartView Helper Functions
	
	public static function NEST ( a, b ) {
		// a = outer node (header)
      	// b = inner node (array of headers)
      
      	a.SubHeaders.AddRange ( b );
      
      	return a;
	}  
  
  	public static function CONTENT (obj) {
      var h : HeaderContent = new HeaderContent();
      return H ( h, obj );
	}
	
	public static function N (obj) {
      var h : HeaderBase = new HeaderBase();
      return H ( h, obj );
	}
	
	public static function FORMULA (obj) {
      var h : HeaderFormula = new HeaderFormula();
      return H ( h, obj );
	}

	public static function STATISTICS (obj) {
      var h : HeaderStatistics = new HeaderStatistics();
      return H ( h, obj );
	}
	
	public static function CATEGORIES (obj) {
        var h : HeaderCategories = new HeaderCategories();
		return H ( h, obj );
	}

	public static function SEGMENT (obj) {
        var h : HeaderSegment = new HeaderSegment();
        h.DataSourceNodeId = 'ds0';
		return H ( h, obj );
	}

	public static function Q( qid, obj, report) {
		
      var h : HeaderQuestion = new HeaderQuestion();
      
	  if (GlobalObjects.Project == null)      
      	GlobalObjects.Project = report.DataSource.GetProject("ds0"); 
      
      var project : Project = GlobalObjects.Project;
      var qe : QuestionnaireElement = project.CreateQuestionnaireElement( qid );
      h.QuestionnaireElement = qe;
      
      return H ( h, obj );
	}
	
	private static function H( h, obj) {
		HeaderProperties ( h, obj );
		return h;
	}
	
	private static function HeaderProperties ( h, obj ) {
	      
        if (obj == null) return h;

      	for (var key in obj) {
			var KEY = key.toUpperCase();
			
			switch ( KEY ) {
				
				case 'LABEL':
                  switch ( h.HeaderType) {
					
                    case HeaderVariableType.Segment:
                      h.Label = new Label (9, obj[key]);
                      break;
                      
                    default:
                      h.Title = new Label (9, obj[key]);
                  }
                  break;

				case 'DECIMALS':
                	h.Decimals = obj[key];
					break;
                
				case 'EXPR':
				case 'EXPRESSION':
                	h.Type = FormulaType.Expression;
                	h.Expression = obj[key];
					break;
                
				case 'MASK':
				case 'XMASK':
                  switch ( h.HeaderType) {
                      
                    case HeaderVariableType.QuestionnaireElement:
                      var mask = new MaskFlat();
                      mask.IsInclusive = (KEY=='MASK');
                      var codes = (obj[key]+'').split(','); // array
                      for (var i=0; i<codes.length; ++i)
                          mask.Codes.Add ( codes[i] );
                  
                      h.AnswerMask = mask;
                      break;
                      
                    default:
                      var generic_mask : GenericCodeMask = new GenericCodeMask();
                      generic_mask.Type = (KEY=='MASK') ? MaskType.ShowCodes : MaskType.HideCodes;
                      generic_mask.Codes = obj[key];
                      h.Mask = generic_mask;
                  }
                  break;
				
                case 'HIDEDATA':
                	h.HideData = obj[key];
                	break;
                
                case 'HIDEHEADER':
                	h.HideHeader = obj[key];
                	break;
                
                case 'TOTALS':
                  switch ( h.HeaderType) {
                      
                    case HeaderVariableType.QuestionnaireElement:
                      h.ShowTotals = obj[key];
                      break;
                      
                    default:
                      h.Totals = obj[key];
                  }
                  break;
                
                case 'COLLAPSED':
                	h.IsCollapsed = obj[key];
                	break;
                
                case 'FILTERBYMASK':
                	h.FilterByMask = obj[key];
                	break;
                
                case 'STATS':
                	var stats = obj[key].split(',');
                    for (var i=0; i<stats.length; ++i) {
                      var stat = stats[i].toUpperCase();
                      
                      switch ( stat ) {
                      	
                        case 'AVG':
                          h.Statistics.Avg = true;
                          break;
                          
                        case 'SUM':
                          h.Statistics.Sum = true;
                          break;
                          
                        case 'COUNT':
                          h.Statistics.Count = true;
                          break;
                          
                        default:
                          GlobalObjects.Log.LogDebug ( 'SMARTVIEW API PROPERTY NOT SUPPORTED IN STATS: ' + stat );
                          
                      }
                    }
 					break;               
                
                case 'CHILDREN':
                  h.ReferenceGroup.Enabled = true;
                  h.ReferenceGroup.Levels = obj[key];
                  break;
                
                case 'ALLPARENTS':
                  h.ReferenceGroup.Enabled = true;
                  h.ReferenceGroup.AllParents = true;
                  break;
                
				default:
                	// Property not supported
                    GlobalObjects.Log.LogDebug ( 'SMARTVIEW API PROPERTY NOT SUPPORTED: ' + KEY );
			}
			
		}
		return h;
	}
}