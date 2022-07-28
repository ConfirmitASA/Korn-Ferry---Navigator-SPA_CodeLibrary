class KDA {

  	// NODEID:1 = Engagement Drivers
  	// NODEID:2 = Enablement Drivers
  
  	// Drivers (items) must be listed according to rank (highest rank first)
	
	
	static var LookupTable = {

      '389:1':['AV15','SD03','VC04','SR05','SD05'],
      '389:2':['AV15','DM02','RC01','AV09','VC04'],
      '390:1':['AV15','SD03','SD04','SR05','VC04'],
      '390:2':['AV15','DM02','AV09','RC01','DC09'],
      '403:1':['VC04','AV15','SD03','ER01','SD04'],
      '403:2':['AV15','DM02','SD03','VC04','RC01'],
      '424:1':['AV15','SD03','VC04','CP14','PE03'],
      '424:2':['AV15','VC04','DM02','DC09','QS01'],
      '428:1':['SD03','AV15','VC04','SD05','IV04'],
      '428:2':['RC01','AV09','AV15','DM02','SD03']

      
	};
	
  
  	static var KeyDriverMap = {};
   
	static function GetMapByNodeId( node_id, pageContext )  {
      
      var id = node_id; //[node_id, false].join('|');
      
      if ( KeyDriverMap[ id ] == null ) {
        var tmp = {};
        var items = GetItemsByNodeId(node_id, pageContext);
        for (var i=0; i<items.length; ++i) {
          tmp [ items[i].QuestionId ] = "1";
        }
        KeyDriverMap [ id ] = tmp;
      }
      return KeyDriverMap [ id ];
    }
  
	static function GetItemsByNodeId( id, pageContext ) {
      var o=[];
            
		// Check for Engagement Drivers
		var eng_drivers = LookupTable[id + ':1' ];
		if (eng_drivers != null) {
			for (var j=0; j<eng_drivers.length; ++j)
				o.push (
					{
						NodeId: id, 
						Type: 1, 
						QuestionId: eng_drivers[j], 
						Score: null
					}
				)
		}
		
		// Check for Enablement Drivers
		var ena_drivers = LookupTable[id + ':2' ];
		if (ena_drivers != null) {
			for (var j=0; j<ena_drivers.length; ++j)
				o.push (
					{
						NodeId: id, 
						Type: 2, 
						QuestionId: ena_drivers[j], 
						Score: null
					}
				)
		}
		
      	if (o.length>0) 
          	return o;
      
      if ( id == HelperUtil.TopNodeId( pageContext ) )
          	return [];
      else {
		// Not found, look to parent for KDA info
        var hierarchy_map = HelperUtil.HierarchyMap( pageContext );
        //Debug.Log ( 'hierarchy_map = ' + hierarchy_map );
        
        //Debug.Log ( 'id = ' + id );
        //Debug.Log ( 'hierarchy_map[ id ] = ' + hierarchy_map[ id ] );
        //Debug.Log ( 'hierarchy_map[ id ].Parent.Id = ' + hierarchy_map[ id ].Parent.Id );

        var parent_id = hierarchy_map[ id ].Parent.Id;

        return GetItemsByNodeId(parent_id, pageContext);
      }
	}
  
	static function GetItemCountsByNodeId(id, pageContext ) {
		var items = GetItemsByNodeId(id, pageContext);
		var count_engagement = 0;
		var count_enablement = 0;
		
		for (var i=0; i<items.length; ++i) {
			switch (items[i].Type) {
				
				case 1:
					count_engagement++;
					break;
				
				case 2:
					count_enablement++;
					break;
			}
		}
		return {Enablement: count_enablement, Engagement: count_engagement};
	}

}