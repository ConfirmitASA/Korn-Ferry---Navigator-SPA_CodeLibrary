// Reverse Engineered from old Navigator report

// 2022: To do: GetDisplayNumber() function must be updated
class HgQuestion {

	private var m_qid;
	private var m_item; // {N: ..., Dist: {Fav: ..., Neu: ..., Unfav: ...} }
	private var m_is_kda; // Boolean
	private var m_is_suppressed; // Boolean
	private var m_strength_score;
	private var m_comparators;
  	private var m_qno;
	public var m_score_map = {};

	public function HgQuestion(qid, qno, item, is_kda, comparators) {

        /*
          comparators format: { External: {...}, Internal: {...} }
        */

		m_qid = qid;
      	m_qno = qno;
		m_item = item;
		m_is_kda = is_kda;
		m_comparators = comparators;

		m_is_suppressed = item.N < Config.Privacy.Table.MinN;

		CalculateStrengthScore();
	}

	public function StrengthScore() {
		return m_strength_score;
	}

	public function Qid() {
		return m_qid;
	}

	//Returns S&O score
	//Calculates it if it wasn't calculated before (since we need internal comps for this it cannot be a part of normal calc)
	//Returns - SO score (floating point number) if question is above min N, null in any other case

	private function CalculateStrengthScore() {

		if (m_is_suppressed)
			m_strength_score = null;
		else {

			var d = HelperUtil.CountsToPercents(m_item.Dist); // distribution {Fav: ..., Neu: ..., Unfav: ...}		

			var strengthScore = 0;

			// Hard-coded thresholds
			var favThreshold = 65; //We could make it a property in config if needed
			var unfavThreshold = 19; //We could make it a property in config if needed

			// Contribution from FAV
			m_score_map['Fav'] = (d.Fav > favThreshold) 
              ? (d.Fav - favThreshold) 
              : 0;

			// Contribution from UNFAV
			m_score_map['Unfav'] = (d.Fav < favThreshold && d.Unfav > unfavThreshold)
              ? (unfavThreshold - d.Unfav) 
              : 0;

			if (m_comparators != null) {

				// Internal Comparator
				if (m_comparators.Internal != null) {

					var comp = m_comparators.Internal;

					var is_significant = false;
					if (!(m_item == null || m_item.N == null || comp == null ||
							comp.N == null)) {
						var pct_dist = HelperUtil.CountsToPercents(m_item.Dist);
						var pct_comp_dist = HelperUtil.CountsToPercents(comp.Dist);
						is_significant = SigTest.fnStatSig_NumberInput(
							m_item.N,
							pct_dist.Fav,
							comp.N,
							pct_comp_dist.Fav,
							false
						);
					}

					// Contribution from INTERNAL COMPARATOR
					m_score_map['InternalComp'] = is_significant 
                      ? (pct_dist.Fav - pct_comp_dist.Fav) // positive or negative
					  : 0;
				}

				if (m_comparators.External != null) {

					var comp = m_comparators.External;

					var is_significant = false;
					if (!(m_item == null || m_item.N == null || comp == null ||
							comp.N == null)) {
						var pct_dist = HelperUtil.CountsToPercents(m_item.Dist);
						var pct_comp_dist = comp.Dist; // external norm distributions are already pct based 
						is_significant = SigTest.fnStatSig_NumberInput(
							m_item.N,
							pct_dist.Fav,
							comp.N,
							pct_comp_dist.Fav,
							false
						);

						// Contribution from EXTERNAL COMPARATOR
						m_score_map['ExternalComp'] = is_significant 
                          ? (pct_dist.Fav - pct_comp_dist.Fav) // positive or negative
						  : 0;

					}
				}
				

				// Sum what we have so far
				for (var key in m_score_map)
					strengthScore += m_score_map[key];

				// Apply KDA multiplier if it's a KDA
				m_score_map['Multiplier'] = m_is_kda ?
					Config.Algorithm.KeyDriverMultiplier :
					1;

				strengthScore *= m_score_map['Multiplier'];


				// Tiebreakers

				var tiebreak_score = 0;

				// 1
				var p = (d.Fav - d.Unfav) / 1000;
				if (!HelperUtil.isNotANumber(p))
					tiebreak_score += p;

				// 2
				p = d.Fav / 1000000;
				if (!HelperUtil.isNotANumber(p))
					tiebreak_score += p;

				//3
				p = (1000 - m_qno) / 1000000000;
				if (!HelperUtil.isNotANumber(p))
					tiebreak_score += p;

				m_score_map['Tiebreaker'] = tiebreak_score;

				strengthScore += m_score_map['Tiebreaker'];

				m_strength_score = strengthScore;
			}
		}
	}

  	/*
	public function GetDisplayNumber() {
		return 1; // to do: fix
	}
	*/

}