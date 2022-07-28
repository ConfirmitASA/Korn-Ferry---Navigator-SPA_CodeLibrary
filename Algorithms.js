class Algorithms {

	static
	function KeyDriverAnalysis(pageContext) {

		var user = pageContext.Items['User'];
		var node_id = user.PersonalizedReportBase;

		var kda_key = HelperUtil.Key('KDA', Config.CurrentWave, node_id); // Example: 'KDA.2020.389' (not affected by filters)

		var kda = CacheUtil.GetData(kda_key, pageContext);

		if (kda == null) {

			kda = {
				DIM_ENG: [],
				DIM_ENA: []
			};

			try {

				var tmp = KDA.GetItemsByNodeId(node_id, pageContext);
				/*	
				    [{
				       "NodeId": "389",
				       "Type": 1,
				       "QuestionId": "AV15",
				       "Score": null
				   }, {
				       "NodeId": "389",
				       "Type": 1,
				       "QuestionId": "SD03",
				       "Score": null
				   },
				   ...
				*/

				for (var i = 0; i < tmp.length; ++i) {

					var item = tmp[i];
					/*
					{
					  "NodeId": "389",
					  "Type": 1,
					  "QuestionId": "AV15",
					  "Score": null
					}*/

					switch (item.Type) {
						case 1:
							kda.DIM_ENG.push(item.QuestionId);
							break;
						case 2:
							kda.DIM_ENA.push(item.QuestionId);
							break;
					}
				}
                CacheUtil.SaveData ( kda_key, kda, pageContext );

			} catch (e) {
				return {
					Key: kda_key,
					Data: {
						Error: e + ''
					}
				};
			}
		}

		return {
			Key: kda_key,
			Data: kda
		};
	}

	static
	function StrengthsAndOpportunities(pageContext) {
		var user = pageContext.Items['User'];
		var filter_hash = HelperUtil.FilterHashCode(pageContext);

		var so_key = HelperUtil.Key('SO', Config.CurrentWave, user.PersonalizedReportBase, filter_hash);

		// Try reading from cache
		var so = CacheUtil.GetData(so_key, pageContext);
		if (so == null) {

			// Strengths & Opportunities
			//Debug.Log('SO 1');
			var data = Items.Data(pageContext);
			var top_node_id = HelperUtil.TopNodeId(pageContext);

			// Current Items
			//Debug.Log('SO 2');
			var key = HelperUtil.Key('ITEMS', Config.CurrentWave, user.PersonalizedReportBase, filter_hash);
			var current_item_data = data[key];

			// Internal Comparator
			//Debug.Log('SO 3');
			var internal_comparator_key = HelperUtil.Key('ITEMS', Config.CurrentWave, top_node_id, filter_hash);
			var internal_comparator_data = data[internal_comparator_key]; // Company Overall data with demographic filter applied

			// External Comparator
			//Debug.Log('SO 4');
			var all_norms_data = Norms.Data(pageContext);
			var norms_key = ['NORMS', Config.Norms.IndustryBenchmark, filter_hash].join('.');
			var industry_norms_data = all_norms_data[norms_key];

			// Look up questions for exclusion
			//Debug.Log('SO 5');
			var exclude_map = {};
			var qids = Config.Algorithm.ExcludedQuestions;
			for (var i = 0; i < qids.length; ++i)
				exclude_map[qids[i]] = 1;

			var items = [];

			var qno = 0;
			for (var qid in current_item_data) {

				qno++;

				// Verify not excluded
				if (!exclude_map[qid] == 1) {

					var comparators = {
						Internal: internal_comparator_data[qid],
						External: (industry_norms_data == null) ? null : industry_norms_data[qid]
					};

					var is_kda = false; //todo
					var item = current_item_data[qid];

					var new_item = new HgQuestion(qid, qno, item, is_kda, comparators);

					// Only add item for consideration if it has a StrengthScore		
					if (new_item.StrengthScore() != null)
						items.push(new_item);
				}
			}
			//Debug.Log('SO 6');

			var sorted_items = items.sort(function(a, b) {
				return (a.StrengthScore() - b.StrengthScore());
			});

			// Opportunities -- pull first 5 (todo: make configurable)
			var opportunities = [];
			var max_opportunity_count = 5;
			for (var i = 0; i < max_opportunity_count && i < sorted_items.length; ++i)
				opportunities.push(sorted_items[i].Qid());

			var sorted_items = sorted_items.reverse();

			// Strengths -- pull first 5 (todo: make configurable)
			var strengths = [];
			var max_strength_count = 5;
			for (var i = 0; i < max_strength_count && i < sorted_items.length; ++i)
				strengths.push(sorted_items[i].Qid());

			//Debug.Log('SO 7');

			var so = {
				S: strengths,
				O: opportunities
			};

			CacheUtil.SaveData(so_key, so, pageContext);
		}

		return {
			Key: so_key,
			Data: so
		};

	}


}