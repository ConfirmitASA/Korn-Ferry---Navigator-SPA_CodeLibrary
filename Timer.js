class Timer {
 
  var timestamp;
  var name;
  var log = [];
  
  function Timer ( x ) {
  	name = x;
    timestamp = new Date();
  }
  
  function Get() {
    return {
      Name: name,
      Log: log
    }
  }
  
  function Add( x ) {
    var now = new Date();
    log.push ( {
      Label: x,
      Time: (now - timestamp)
    }
    );
    timestamp = now;
  }
  
  function Render() {
  	var o = [];
    o.push('\n' + name);
    for (var i=0; i<log.length; ++i)
    	o.push('\n' + log[i].Time + ' ' + log[i].Label);

    Debug.Log ( o.join('') );
  }
  
}