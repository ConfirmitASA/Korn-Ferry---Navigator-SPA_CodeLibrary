/*
Codelibrary_Script.SurveyMetaData
Purpose/Description: 
Last updated by: Sumit 
Last updated on: 14/10/2020
*/
class SurveyMetaData {
  static var survey_questions = {};
  static var survey_questions_map = {};
  static var answerlist_map = {};
  
	static function GetSurveyQuestions( report, datasource_id) {
      
      	var language_id = report.CurrentLanguage;
      
		if ( survey_questions[language_id] == null ) {
            var map = {};
			var project : Project = report.DataSource.GetProject ( datasource_id );
			var questions = project.GetQuestions();
			
          	var tmp_log = [];
          
			var tmp=[];
            for (var i=0; i<questions.length; ++i) {
              var q : Question = questions[i];
              var category_map = {};
              var categories = q.GetCategories();
              for (var j=0; j<categories.length; ++j)
                category_map [ categories[j] ] = 1;
              
              var item = {
                  Id: q.QuestionId,
                  Title: q.Title,
                  Label: q.Text, 
                  Type: q.QuestionType+'', 
                  CategoryMap: category_map,
                  AnswerCount: q.AnswerCount
              
              };
              
              tmp_log.push ( q.QuestionId );
              
              tmp.push ( item );
              map[q.QuestionId] = item;
            }
			survey_questions[language_id] = tmp;
          	survey_questions_map[language_id] = map;
          
          	//GlobalObjects.Log.LogDebug ( tmp_log.join(',') );
		}
		return survey_questions[language_id];
	}
  
  static function GetAnswerMap ( report, datasource_id, qid ) {
    
    var language_id = report.CurrentLanguage;
    
    if ( answerlist_map[language_id] == null ) answerlist_map[language_id] = {};
    if ( answerlist_map[language_id][qid ] == null ) {
        var map = {};
        var project : Project = report.DataSource.GetProject ( datasource_id );
        var answers : Answer [] = project.GetQuestion(qid).GetAnswers();
        for (var i=0; i<answers.length; ++i) {
          var answer : Answer = answers[i];
          map [ answer.Precode ] = answer;
        }
      
      	answerlist_map[language_id][qid] = map;
    }
    return answerlist_map[language_id][qid];
  }
  
  static function GetQuestion(report, datasource_id, qid) {
    var language_id = report.CurrentLanguage;
    
    if (survey_questions[language_id] == null)
      var dummy = GetSurveyQuestions( report, datasource_id); // this will populate the cache
    
    return survey_questions_map[language_id][ qid ];
  }
  
  static function IsInCategory (report, datasource_id, qid, category) {
    var q = GetQuestion(report, datasource_id, qid);
    return q.CategoryMap[category] == 1;
  }

  static function GetResourceTexts( report ) {
    var o = {};
    
    var p : Project = report.DataSource.GetProject('ds_res2');
    
    var questions = p.GetQuestions();
    
    for (var i=0; i<questions.length; ++i) {
      var q : Question = questions[i];
      var qid = q.QuestionId;
      
      var obj = {
        Id: qid,
        Title: q.Title,
        Label: q.HtmlText
      };
      
      //log.LogDebug ( qid );
      o[qid] = obj;
      
      try {
        var answers = q.GetAnswers();
        for (var j=0; j<answers.length; ++j) {
          var answer : Answer = answers[j];
          //log.LogDebug ( qid + '.' + answer.Precode );
          o[qid + '.' + answer.Precode] = {
            Label: answer.HtmlText
          };
        }
      }
    catch (e){}
      
    }
    
    return o;
  }
  
}