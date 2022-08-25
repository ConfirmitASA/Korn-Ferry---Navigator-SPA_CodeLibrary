class RequestHandler {
    var query;
    var report;
    var state;
    var user;
    var text;
    var pageContext;
  	var timer;

    function RequestHandler(qry, o) {

      	Debug.Log ('RH.New');
        query = qry;
        state = o.State;
        report = o.Report;
        pageContext = o.PageContext;
        user = o.User;
        text = o.Component;
      
        Debug.Log ( 'Query: ' + JSON.stringify(query) );
      
      	pageContext.Items['User'] = user;
        UpdateFilterExpression(); // important that this happens before any read/write
      
      	timer = new Timer('RequestHandler');
    }

    function Append ( a, b ) {
      //Debug.Log('Append');
									   
	   
      for (var key in b) {
          //Debug.Log ('Appending: ' + key);
          a[key] = b[key];
      }
      //Debug.Log('Append - done');
    }
  
  
    function Render() {
      	Debug.Log ('RH.Render ----------------------------------------------');
        timer.Add('Render');

      	var now = new Date();
      	var live_date = new Date(Config.Report.LiveDate);
      
      	var is_live = HelperUtil.IsLive ( pageContext );
		
		var is_professional_user = ( user.UserType == ReportUserType.Confirmit );
		
      	//Debug.Log ( 'is_live   = ' + is_live  );

      
      	Debug.Log ('RH 1');
        var newdata = {};
        var is_initial_load = (query.IsInitialLoad == true);
        
      	// Language switch handler
      
      if ( query.Language != report.CurrentLanguage ) {
      	
        // New langauge requested, treat as intial load
        is_initial_load = true;
      
      }
      
      	Debug.Log ('is_initial_load=' + is_initial_load);
      
		      	
      
      	// Store the query object in pageContext
        pageContext.Items['query'] = query;

      	timer.Add('UpdateFilterExpr');

        // Handler for Initial Page Load
		var menu;
      
      
      	// Meta
        var meta = {};

        // Norms - Items
        if ( is_live || is_professional_user ) {
          var normsdata = Norms.Data( pageContext ); // need access to this since we're going to calculate S&O
          timer.Add ('NormsData');
        }
      
      	Debug.Log ('RH 1.1');

		var config = null;
		
        if (is_initial_load) {
          
			// Config object
			config = {
				
				// Action Planner
				ActionPlannerUrl: Config.Report.ActionPlanner.Url,
				ActionPlannerDateFormat: Config.Report.ActionPlanner.DateFormat,
				LimitActionsPerPlan: Config.Report.ActionPlanner.LimitActionsPerPlan,
				
				// Norms
				Norms: Config.Report.Norms,
				
				// Waves
				CurrentWave: Config.Report.CurrentWave,
				PreviousWave: Config.Report.PreviousWave,
				
				// SigTest
				SigTest: Config.Report.SigTest,
				
				// Comparators (to be checked by default -- will be updated below
				comparators: [], //["Internal.Wave:2019", "External.IndustryBenchmark", "External.HighPerformers"],
              
                // limit of active external benchmarks shown on the card
                ExternalCardLimit: Config.Report.ExternalCardLimit,
				
				// Dimensions
				EngagementDimensionId: Config.Report.EngagementDimensionId,
				EnablementDimensionId: Config.Report.EnablementDimensionId,
				
				// Styles
				"styles": Config.Report.Styles,
              
                // PPT export
                DimensionsPerSlide: Config.Report.DimensionsPerSlide,
              
                // Personalized filter question
                PFQ: Config.Report.PFQ, 
              
                // External images file library 
                FileLib: Config.FileLibraryRootURL
              
			  };
			
			if ( Config.Report.PreviousWave != null )
				config.comparators.push ( "Internal.Wave:" + Config.Report.PreviousWave );
			
/*			if ( Config.Report.Norms.IndustryBenchmark != null)
				config.comparators.push ( "External.IndustryBenchmark" );
			
			if ( Config.Report.Norms.HighPerformers != null)
				config.comparators.push ( "External.HighPerformers" );
*/
          for (var key in Config.Report.DefaultNorms) {
				config.comparators.push ( "External."+ key );
          }
            
      	Debug.Log ('RH 1.2');
          
			// Metrics (for Flip Cards)
          	newdata.Metrics = Config.Report.Metrics;
          
      	Debug.Log ('RH 1.3');
          
          	// Load external norms
			if ( is_live || is_professional_user ) {
				for (var key in normsdata)
				  newdata[key] = normsdata[key];

			Debug.Log ('RH 1.4');
			  
				// Norms - Dimensions
				var normsdata = NormDimensions.Data( pageContext );
				for (var key in normsdata)
				  newdata[key] = normsdata[key];
			}
			
			
      	Debug.Log ('RH 1.5');
          
            //GlobalObjects.Log.LogDebug('Initial Load Handler');
          
          	var labels = SurveyMetaData.GetResourceTexts(report);
			timer.Add ('ResourceTexts');
          
          
          	// Process Labels for cleaner object structure for Actions
          
            var Actions = {};
          
          	var keys = [];
            for (var key in labels) {                
                // example: key = "actionstitles.N50_DM02_1"
                
                var tmp = key.split('.');
                if (tmp.length>1) {
                    var prefix = tmp[0];
                    
                    switch ( prefix ) {
                        
                        case 'actionstitles':
                        case 'actiontexts':
						
							//Debug.Log ( key );
                        
                            var key2 = tmp[1]; // example: "N50_DM02_1"		
                            var label = labels[key].Label;
                            
                            var parts = key2.split('_'); // example: ["N50", "DM02", "1"];
                            var index = parts.pop(); // example: index = "1"
                            var id = parts.join('_'); // example: "N50_DM02"
                            
                            if ( Actions[id] == null ) Actions[id] = {};
                            if ( Actions[id][index] == null) Actions[id][index] = {};
                            
                            if ( prefix == 'actionstitles')
                                Actions[id][index].Title = label;
                            else
                                Actions[id][index].Label = label;
                        
                        	// register for deletion
                        	keys.push ( key ); 
                                    
                            break;
                    }
                }
            }
          
          	// Remove labels we no longer need (these have been copied to the Actions object)
          	for (var i=0; i<keys.length; ++i) delete labels[keys[i]];
          
          	labels.Actions = Actions;



          	// Process Labels for cleaner object structure for SlideTexts
          
            var SlideTexts = {};
          
          	var keys = [];
            for (var key in labels) {                
                // example: key = "SLIDE_ENGFRAMEWORK.info_1"
                
                var tmp = key.split('_'); // example: ["SLIDE", "ENGFRAMEWORK.info", "1"]
                if (tmp.length>1) {
                    var prefix = tmp[0];
                    
                    switch ( prefix ) {
                        
                        case 'SLIDE':

                        	var key2 = 'SLIDE_' + tmp[1]; // example: "SLIDE_ENGFRAMEWORK.info"							
							var tmp2 = key2.split('.'); // example: ["SLIDE_ENGFRAMEWORK", "info"]
							var value = labels[key].Label;
                      
							switch ( tmp2.length ) {
								case 1:
                                
                                    var x = key2;
                                
                                    switch ( tmp.length )  {
                                    	
                                      case 2:
                                        //Debug.Log ('SlideTexts: ' + [x, 'title'].join('-') );
                                        if ( SlideTexts[x] == null)
                                          SlideTexts[x] = {};
                                        
                                        SlideTexts[x].title = labels[key].Title;
                                        break;
                                        
                                      case 3:
                                        var index = tmp[2]; // example: "1"
                                        
                                        if (SlideTexts[x] == null)
                                          	SlideTexts[x] = {};
                                        
                                        //Debug.Log ('SlideTexts: ' + [x,index].join('-') );
                                        SlideTexts[x][index] = value;
                                        break;
                                    }
                                	
									break;
									
								case 2:
                                	var x = tmp2[0];
                                	var y = tmp2[1];
                                
									if (SlideTexts[x] == null || typeof SlideTexts[x] == 'string') // override for the latter
										SlideTexts[x] = {};

									if (SlideTexts[x][y] == null)
										SlideTexts[x][y] = {};
									
                                    switch ( tmp.length )  {
                                    	
                                      case 2:
                                        //Debug.Log ('SlideTexts: ' + [x,y].join('-') );
                                        SlideTexts[x][y] = value;
                                        break;
                                        
                                      case 3:
                                        var index = tmp[2];
                                        //Debug.Log ('SlideTexts: ' + [x,y,index].join('-') );
                                        SlideTexts[x][y][index] = value;
                                        break;
                                    }

									break;								
							}
                        
                        	// register for deletion
                        	keys.push ( key ); 
                                    
                            break;
                    }
                }
            }
          
          	// Remove labels we no longer need (these have been copied to the SlideTexts object)
          	for (var i=0; i<keys.length; ++i) delete labels[keys[i]];
          
          	labels.SlideTexts = SlideTexts;

          
          	var resource_texts = labels;

      	Debug.Log ('RH 1.6');
          
            var comment_questions = {};
            for (var i=0; i<Config.Report.Comments.length; ++i) {
              var comment_qid = Config.Report.Comments[i].Question;
              try {
                  var q = SurveyMetaData.GetQuestion(report, 'ds0', comment_qid); //: Question = project.GetQuestion ( comment_qid );
                  comment_questions[ comment_qid ] = {Label: q.Label};
              } catch(e) {
                Debug.Log ('ERROR: \nError in Comments config variable \n' + e);
              }
            }
            
      	Debug.Log ('RH 1.7');
          
          	timer.Add ('Labels');
          
            // Labels, Menu, Hierarchy
          
          	var hierarchy_map = HierarchyUtil.HierarchyMap(report, pageContext);
          	timer.Add ('Hierarchy Map');
          
      	Debug.Log ('RH 1.8');
          
          
          	//var menu = Menu();
          	var menu = Temp.Menu(resource_texts);
          	timer.Add ('Menu');
                
      	Debug.Log ('RH 1.9');
          
          	var comp = {};
          
          	// Internal Comps -- read from source survey -- Wave question
            var q_wave : Question = GlobalObjects.Project.GetQuestion ( 'Wave' );
            var a_wave = q_wave.GetAnswers();
            for (var i=0; i<a_wave.length; ++i) {
                var a : Answer = a_wave[i];
              	if ( a.Precode != Config.Report.CurrentWave)
                  comp['Internal.Wave:' + a.Precode] = {Label: a.Text};
                  //"Internal.Wave:2019": { Label: "Trend 2019" }
            }
          
      	Debug.Log ('RH 1.10');
          
            comp['Internal.total'] = {Label: resource_texts['comparators.Internal_total'].Label};
            comp['Internal.parent'] = {Label: resource_texts['comparators.Internal_parent'].Label};
          
      	Debug.Log ('RH 1.11');
          
		    // External Comps        
//            comp['External.HighPerformers'] = {Label: resource_texts['comparators.External_HighPerformers'].Label};
//            comp['External.IndustryBenchmark'] = {Label: resource_texts['comparators.External_IndustryBenchmark'].Label};
          	
            for(var key in Config.Report.Norms){
              var externalLabel =  resource_texts['comparators.External_'+key];
			  var externalKey = 'External.'+key;
                
              externalLabel !== undefined 
                ? comp[externalKey] = {Label: externalLabel.Label}
         	    : comp[externalKey] = {Label: 'Missing label'};
            }
          
      	Debug.Log ('RH 1.12');

          // Fun Facts
          	var ff = [];
            for (var key in resource_texts) {
              if ( key.substring(0,2) == 'ff' ) {
              	// Found Fun Fact
                var item = resource_texts[key];
                ff.push ( {Title: item.Title, Text: item.Label} );
                delete resource_texts[key];
              }
            }
          
      	Debug.Log ('RH 1.13');
          
            meta = {
              
			  CommentQuestions: comment_questions,
              NonStandardQuestions: Temp.NSQ( pageContext ),
              Comparators: comp,
              CurrentWave: Config.Report.CurrentWave,
              PreviousWave: Config.Report.PreviousWave,
              ReportName: report.Name,
              ClientName: Config.Report.ClientName,
              Items: Temp.Items2( report ),
              Dimensions: Temp.Dimensions( resource_texts ),
              Labels: labels,
              Menu: menu,
              VisiblePages: AccessControl.VisiblePages ( pageContext, AccessControl.Map ),
              VisibleSlides: AccessControl.VisibleSlides ( pageContext, AccessControl.PPTMap ),
              RTL: HelperUtil.IsRtl( report ),
              FunFacts: ff,
              Hierarchy: {
                TopNode: null, // this will be updated on the client
                Map: hierarchy_map // this will be enriched on the client (Parent: ..., Children: [...])
              }
            };
    
      	Debug.Log ('RH 1.14');
          
          
          	// Comment Categories
			meta.CommentCategories = {};
			for (var i=0; i<Config.Report.Comments.length; ++i) {
				var comment = Config.Report.Comments[i];
				var qid_coded = comment.QuestionCategory; // example: "Comm1Theme"
				
				if ( qid_coded != null ) {
					
					// This question is coded
					var categories = {};
					var qid = comment.Question; // example: "Comm1"
				
					try {
						var map = SurveyMetaData.GetAnswerMap ( report, 'ds0', qid_coded );
						for (key in map) {
							var answer: Answer = map[key];
							categories[key] = {Label: answer.Text};
						}
					} catch(e) {
						Debug.Log ('ERROR: \nError in Comments config variable \n' + e);
				 
											
					}

					meta.CommentCategories[qid] = categories;    				
				}
			}

          	// Demographics
          	meta.Demographics = Filters( user ).Items;

          
            // Filters
            var filter_qids = [];
            for (var filter_qid in meta.Demographics)
              filter_qids.push ( filter_qid );
          
          	newdata.Filters = filter_qids;
                    
			timer.Add ('Filters');
          
        }
      	Debug.Log ('RH 2');

        // Language
        newdata.Report = {
            CurrentLanguage: report.CurrentLanguage
        };

        // User Info
        var u = {
            UserId: user.UserId,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            PersonalizedReportBase: user.PersonalizedReportBase + '',
            PersonalizedReportBaseText: (user.PersonalizedReportBaseText[0] + ''),
	        Role: (user.UserType == ReportUserType.Confirmit) ? Config.Report.ProfessionalUserRole : user.Roles.join('.')
        };

        newdata.User = u;
        newdata.User.IsTestData = false;
		timer.Add ('User');

      	Debug.Log ('RH 3');
      
        // Hash values
        var filters = query.Filters ? query.Filters.join(',') : '';
        var report_base = user.PersonalizedReportBase;
        var hash = HelperUtil.HashCode(report_base);
        var hash_w_demos = HelperUtil.HashCode(report_base + ':' + filters);

      	Debug.Log ('RH 4');
      
      
        // Loop over array of Data Requests, process one by one
        timer.Add('Start DataRequest'); 
        for (var i = 0; i < query.DataRequest.length; ++i) {
            var request = query.DataRequest[i];
            Debug.Log('Processing: ' + request.Type);
            switch (request.Type) {

                // Response Rate
                case 'ResponseRate.Overall':
                    Append ( newdata, ResponseRate.Data(pageContext) );
                	timer.Add('ResponseRate.Overall');
                    break;
                
                // Response Rate Breakdown
                case 'ResponseRate.Breakdown':
                    Append ( newdata, ResponseRate_Breakdown.Data(pageContext) );
                	timer.Add('ResponseRate.Breakdown');
                    break;
                
                // Comment Categories
                case 'CommentCategories.Overall':
					if ( is_live || is_professional_user ) {
                      if ( Config.Report.Comments.length>0 ) {
						try {
						    Append ( newdata, CommentCategories.Data(pageContext) );
                        } catch(e) {
                            Debug.Log ('ERROR: \nError in Comments config variable \n' + e);
                        }
						timer.Add('CommentCategories.Overall');
                      }
					}
                    break;
                	

                // Comments
                case 'Comments':
					if ( is_live || is_professional_user ) {
                      if ( Config.Report.Comments.length>0 ) {
						Append ( newdata, Comments.Data(pageContext) );
						timer.Add('Comments');
                      }
					}
                    break;

                // Items and Dimensions
                case 'ItemsAndDimensions.Overall':
					if ( is_live || is_professional_user ) {
						Append ( newdata, Items.Data(pageContext) );
						timer.Add('Items');
						
						Append ( newdata, Dimensions.Data(pageContext) );
						timer.Add('Dimensions');
					}
                    break;
                
                // Items and Dimensions - Breakdown
                case 'ItemsAndDimensions.Breakdown':
					if ( is_live || is_professional_user ) {
						pageContext.Items['Breakdown'] = request.Breakdown;
						Append ( newdata, Items_Breakdown.Data ( pageContext ) );
						timer.Add('Items.Breakdown');

						Append ( newdata, Dimensions_Breakdown.Data ( pageContext ) );
						timer.Add('Dimensions.Breakdown');
					}
					break;
                

                // ENPS
                case 'ENPS.Overall':
					if ( is_live || is_professional_user ) {
                        if ( Config.Report.ENPS.VariableId != null ) {
                          Append ( newdata, ENPS.Data(pageContext));
                          timer.Add('ENPS.Overall');
                        }
					}
                    break;
                
                // ENPS Breakdown
                case 'ENPS.Breakdown':
					if ( is_live || is_professional_user ) {
                        if ( Config.Report.ENPS.VariableId != null ) {
                          pageContext.Items['Breakdown'] = request.Breakdown;
                          Append ( newdata, ENPS_Breakdown.Data ( pageContext ) );
                          timer.Add('ENPS.Breakdown');
                        }
					}
					break;

                // Effectiveness Profile
                case 'EffectivenessProfile.Overall':
					if ( is_live || is_professional_user ) {
						Append ( newdata, EffectivenessProfile.Data(pageContext));
						timer.Add('EP.Overall');
					}
                    break;

                
                // Effectiveness Profile Breakdown
                case 'EffectivenessProfile.Breakdown':
					if ( is_live || is_professional_user ) {
						pageContext.Items['Breakdown'] = request.Breakdown;
						Append ( newdata, EffectivenessProfile_Breakdown.Data ( pageContext ) );
						timer.Add('EP.Breakdown');
					}
                	break;
                
                // N
                case 'N':
					if ( is_live || is_professional_user ) {
						Append ( newdata, N.Data ( pageContext ) );
						timer.Add('N');
					}
                	break;
                 
                // N Breakdown
                case 'N.Breakdown':
					if ( is_live || is_professional_user ) {
						pageContext.Items['Breakdown'] = request.Breakdown;
						Append ( newdata, N_Breakdown.Data ( pageContext ) );
						timer.Add('N.Breakdown');
					}
                	break;

                // NSQ - Non Standard Questions (Current Wave only)
                case 'NSQ':
					if ( is_live || is_professional_user ) {
                        if ( Config.Report.NonStandardQuestions.length>0 ) {
                          Append ( newdata, NSQ.Data ( pageContext ) );
                          timer.Add('NSQ');
                        }
					}
                	break;

                 
				// Strengths & Opportunities
				case 'SO.Overall':
					if ( is_live || is_professional_user ) {
						var so = Algorithms.StrengthsAndOpportunities ( pageContext );
						newdata[so.Key] = so.Data;
						timer.Add ('S&O');      
					}
					break;
            
				// Key Drivers
				case 'KDA.Overall':
					if ( is_live || is_professional_user ) {
						var kda = Algorithms.KeyDriverAnalysis ( pageContext );
						newdata[kda.Key] = kda.Data;      
						timer.Add ('KDA');
					}
					break;
			
                default:
                    GlobalObjects.Log.LogDebug('Not found: ' + request.Type);

            }
        }
      
      	var actions_rollup = ActionsRollup.Data ( pageContext );
      	var own_actions = ActionsOwn.Data ( pageContext );
      
      
      	Debug.Log ('RH 4');
      
      	newdata.Performance = timer.Get();
      
	  
        var refresh = {
            Data: newdata,
            Meta: meta
        };
		
		if ( config != null)
			refresh.Config = config;


		if (actions_rollup != null) {
			refresh.Actions = {Rollup: actions_rollup};
		}
      
        if (own_actions != null) {
			if (refresh.Actions == null) refresh.Actions = {};
			refresh.Actions.Own = own_actions;
		}
		
        // Custom CSS for RTL languages
        if (HelperUtil.IsRtl(report)) {
            text.Output.Append(StyleUtil.GetRtlCss());
        }

        // Client-side scripting
        text.Output.Append(ClientSideScript(refresh, is_initial_load));
      
      	timer.Add('Done');
        Debug.Log ('RH.Render End ------------------------------------------');
    }

    // ---------------------------------------------------------------

    function UpdateFilterExpression() {
        GlobalObjects.Log.LogDebug('UpdateFilterExpression()');
        if (query.Filters != null) {

            var codes = query.Filters;
     
            GlobalObjects.Log.LogDebug(codes.join(', '));
            var map = {};
            for (var j = 0; j < codes.length; ++j) {
                var parts = codes[j].split('.'); // ['Age', '651']
                var qid = parts[0];
                var code = parts[1];
                if (map[qid] == null) map[qid] = [];
                map[qid].push('"' + code + '"');
            }
            var tmp = [];
            for (var key in map) {
                tmp.push('IN(' + key + ',' + map[key].join(',') + ')');
            }

            var filter_expression = tmp.join(' AND ');
            pageContext.Items['FilterExpressionKey'] = codes.join(','); // this needs to match the client side function
            pageContext.Items['FilterExpression'] = filter_expression;
            GlobalObjects.Log.LogDebug('expression = ' + filter_expression);
        } else {
            GlobalObjects.Log.LogDebug('query.Filters = null');
            pageContext.Items['FilterExpressionKey'] = ''; // this needs to match the client side function
            pageContext.Items['FilterExpression'] = '';
        }
        GlobalObjects.Log.LogDebug('UpdateFilterExpression() - done');

    }

    function Filters( user ) {

		var role = AccessControl.GetRole( user )
		
        var filters = {};
        var demos = Config.Report.FilterVariables[role];
        var p: Project = report.DataSource.GetProject('ds0');
        for (var i = 0; i < demos.length; ++i) {
            var q: Question = p.GetQuestion(demos[i]);
            var tmp = {};
            var answers = q.GetAnswers();
            for (var j = 0; j < answers.length; ++j) {
                var answer: Answer = answers[j];
                tmp[answer.Precode] = {
                    Label: answer.Text
                };
            }

            filters[demos[i]] = {
                Label: q.Title,
                Answers: tmp
            }
        }

        return {
            Items: filters,
            IsTestData: false
        };

    }

  function ClientSideScript(refresh, is_initial_load) {

      var language_info = HelperUtil.LanguageInfo(report);

      var o = [];

      o.push(
          '<script>',
        	
          // Add the "refresh" object with both data and meta data          
          'var refresh = ' + JSON.stringify(refresh) + ';',

          'var newdata = refresh.Data;',
          'var newmeta = refresh.Meta;'
            
      );

      if (refresh.Config != null)
          o.push(
              'var config = refresh.Config;', // override global object on client
            "if (!('comparators' in state.Parameters)) {",
            "    State_Set('comparators', config.comparators);", // Set Default Comparators
            "}"
          );

      // Actions
      if (refresh.Actions != null)
          o.push(
              'var actions = refresh.Actions;',
              'FocusAreas_SetValues();'
          );

      // Filters
      o.push(
          'if (newdata.Filters != null) filter_variables = newdata.Filters;'
      );

      // Merge new data
      o.push(
          'for (var key in newdata) { ',
          '	data[key] = { ...data[key], ...newdata[key] };',
          '	console.log("Updating data." + key);',
          '}'
      );

      // Merge new meta data
      o.push(
          'for (var key in newmeta) { ',
          '	meta[key] = newmeta[key];',
          '	console.log("Updating meta." + key);',
          '}'
      );
    
      // Update with RTL for Arabic (if applicable)
      o.push(
          '$("html").attr("dir","' + HelperUtil.GetDirection(report) + '");'
      );
    
    
      // Update lang (if exists)
      if (language_info.Lang != null)
          o.push(
              '$("html").attr("lang", "' + language_info.Lang + '");'
          );
    
      // Mark the update as complete
      o.push(
          'UpdateComplete();'
      );

      // "Your Report is Loading" message
      o.push(
          '$("#loading-message").fadeOut();'
      );
    
      // Redraw Hierarchy Picker in case we've changed branch
      o.push(
          'Main_RenderHierarchyPicker();'
      );

      // Refresh the current page with the newly loaded data
      o.push(
          'Main_RefreshCurrentPage();'
      );
    
      // Tell the page that the report is ready
      o.push(
          'ShowWaitCloseButton();'
      );
    
      // For language switching
      o.push(
          "$('#master-page-modal-spinner-container').fadeOut();"
      );

      // Hide the default spinner
      o.push(
          '$("#spinner").css("display","none");'
      );

      // Unhide the hierarchy picker that was initially auto expanded
      if ( is_initial_load)
        o.push ('EnrichHierarchy ( newmeta.Hierarchy );')
      else
        o.push (
        	'$("#hidden-components").css("z-index", "999999");', 
          	'$("#hidden-components").css("display", "unset");'
      	);

      // Update the data in the hidden request field
      o.push(
          'Main_UpdateRequest();'
      );

      // Redraw Filter/Comparator Window
      o.push(
          'Modal_Render();'
      );
    
      // Remove the newly added script; we have everything we need at this point
    
      o.push(
          '$("head").find("script").last().remove();'
      );
    
      o.push(
          '</script>'
      );

      return o.join('');

  }
}