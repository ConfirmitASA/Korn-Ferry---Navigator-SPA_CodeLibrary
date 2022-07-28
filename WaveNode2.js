class WaveNode2 {
	var node_id;
	var wave_id; 
  	var report;
	
	function WaveNode2 ( w_id, n_id, report2 ) {
		node_id = n_id;
		wave_id = w_id;
      	report = report2;
	}
      
    function NodeId() {
      return node_id;
    }
    
    function WaveId() {
      return wave_id;
    }
    
	function Expression() {
      
      var expr= [
			NodeExpression(),
			WaveExpression()
		].join('/');
      
      Debug.Log ('Expression=' +expr);
      return expr;
	}
	
	private function NodeExpression() {
      	var qid = report.PersonalizedQuestion.QuestionId;
      	var expr = 'INHIERARCHY(' + qid + ',"' + node_id + '")';
     	var label = qid + '.' + node_id;
      
		return SegmentExpression ( label, expr );
	}
	
	private function WaveExpression() {
      	var expr = 'Wave="' + wave_id + '"';
        var label = 'Wave.' + wave_id;
      
		return SegmentExpression ( label, expr );
	}
  
    private function SegmentExpression( label, expr ) {
      
      	
        var expr = '[SEGMENT]{' +
              'label: ' + report.TableUtils.EncodeJsString ( label ) + ';' +
              'expr: ' + report.TableUtils.EncodeJsString ( expr ) + 
          '}';
      
      	Debug.Log ( 'SegmentExpression=' + expr );
      	return expr;
      
    }
}