class HierarchyUtil {
  	static const TOP_NODE_ID = -1;

	static function isNotANumber (x) {
		if (x==0) return false;
		return isNaN (x) || (x == null) || (x == '');
	}
  
  static function HierarchyMap ( report, pageContext ) {
    
    if ( GlobalObjects.HierarchyMap == null )
      GlobalObjects.HierarchyMap = HierarchyUtil.Map(report, 'calc:hier', pageContext); // this should load the hierarchy from the top
   
    var map = GlobalObjects.HierarchyMap;
    var hier = {}; // Just return parent/child relationships
    
    for (var key in map) {
      var node = map[key];
      var parent = node.Parent;
      if ( parent != null) 
        hier[key] = {Label: node.Label, ParentId: parent.Id}; // Label supplied temporarily
    }  
  	return hier;
  }
  
  
    static
    function Map(report, table_name, page_context) {
            
        var titles = report.TableUtils.GetRowHeaderCategoryTitles(table_name);
        var ids = report.TableUtils.GetRowHeaderCategoryIds(table_name);
      
        var item_name = 'Hierarchy_' + table_name;
        var map;

        if (page_context) {
            map = (page_context.Items['HierarchyMap_' + table_name] == null) ?
                {} :
                page_context.Items['HierarchyMap_' + table_name];
        } else
            map = {};

        // let's store a pointer to the map in pageContext in case of timeout
        // so we can restart from point of failure
        if (page_context)
            page_context.Items['HierarchyMap_' + table_name] = map;

        // For re-entry
        if (map[TOP_NODE_ID] == null)
            map[TOP_NODE_ID] = {
                Id: TOP_NODE_ID,
                Label: "Top Level",
                Children: [],
                Map: map,
                Level: 0
            };

        // This is for restart from point-of-failure logic
        var start_row_idx = (page_context == null) ?
            0 :
            (
                (page_context.Items[item_name] == null) ?
                0 :
                page_context.Items[item_name]
            );

		var table_key = table_name + ':GetPlainTableValues';
		var rows;
		
		if (page_context == null) {
			rows = report.TableUtils.GetPlainTableValues(table_name);			
		}
		else {
			var pcontext_rows = page_context.Items[ table_key ];
			
			if (pcontext_rows == null) {
				// Read all rows
				
				rows = report.TableUtils.GetPlainTableValues(table_name);
				page_context.Items[ table_key ] = rows;
			}
			else {
				rows = pcontext_rows;
			}
		}
      
        for (var row_idx = start_row_idx; row_idx < ids.length; ++row_idx) {

            if (page_context) page_context.Items[item_name] = row_idx;

            var data = rows[row_idx];
            var row_titles = titles[row_idx].reverse();
            var row_ids = ids[row_idx].reverse();

            for (var i = 0; i < row_ids.length; ++i) {
                var parts = row_ids[i].split('\n');
                var id = parts[0];

                // Hierarchy Relationships
                if (id != '') {
                    if (map[id] == null) {
                        // Create Initial Entry
                        var parent_id = (i == 0) ? TOP_NODE_ID : row_ids[i - 1];
                        var parent = map[parent_id];
                        map[id] = {
                            Id: id,
                            Label: row_titles[i],
                            Parent: parent,
                            Children: [],
                            Level: i
                        };
                        parent.Children.push(map[id]);
                    }
                }
            }
          

            // Assign data
			var values = data;
			
            if (id != null && id != '') {
                if (parts.length == 1) {
                    // Leaf Node
                    map[id].DirectData = values;
                    map[id].IndirectData = values;
                } else {
                    // Child of Self
                    map[id].DirectData = values;
                }
            } else {
                // Roll-up Subtotal
                map[row_ids[i - 2]].IndirectData = values;
            }
        }

      	if (page_context)
            page_context.Items['HierarchyMapCompleteFlag_' + table_name] = 1;
        return map;
    }  
  
  
}