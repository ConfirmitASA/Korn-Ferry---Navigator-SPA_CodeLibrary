class EffectivenessProfileNormsDistribution {

  	static var DistributionLookup = [
      	//2017-2019 norms
        ['AllCompany_A_17TO19_Avg',          4442345, 46, 10, 14, 30], // TOTAL: General Industry
        ['G10_A_17TO19_Avg',                   91652, 48, 10, 15, 27], // INDUSTRY: Oil and Gas
        ['G15_A_17TO19_Avg',                  234723, 46,  9, 13, 31], // INDUSTRY: Natural Materials
        ['G20_A_17TO19_Avg',                  400939, 44, 10, 14, 31], // INDUSTRY: Health and Life Sciences
        ['G25_A_17TO19_Avg',                 1477377, 45, 10, 14, 31], // INDUSTRY: Industrials
        ['JPN_G25_A_17TO19_Avg',              356618, 25, 12, 12, 51], // COUNTRY x INDUSTRY: Japan Industrials
        ['GBR_G25_A_17TO19_Avg',               73803, 39, 11, 15, 35], // COUNTRY x INDUSTRY: United Kingdom Industrials
        ['G30_A_17TO19_Avg',                  651803, 48,  9, 14, 29], // INDUSTRY: Consumer Goods
        ['JPN_G30_A_17TO19_Avg',              204661, 21, 13, 11, 56], // COUNTRY x INDUSTRY: Japan Consumer Goods
        ['GBR_G30_A_17TO19_Avg',               33616, 41,  9, 16, 35], // COUNTRY x INDUSTRY: United Kingdom Consumer Goods
        ['G35_A_17TO19_Avg',                  521616, 47,  9, 14, 30], // INDUSTRY: Consumer Services
        ['GBR_G35_A_17TO19_Avg',               91105, 42,  9, 14, 35], // COUNTRY x INDUSTRY: United Kingdom Consumer Services
        ['G40_A_17TO19_Avg',                  572173, 49, 10, 13, 28], // INDUSTRY: Financials
        ['ASIA_G40_A_17TO19_Avg',             105795, 52,  8, 13, 26], // REGION x INDUSTRY: Asia Financials
        ['EURO_G40_A_17TO19_Avg',             243915, 41, 11, 14, 34], // REGION x INDUSTRY: Europe Financials
        ['GBR_G40_A_17TO19_Avg',               54863, 40, 12, 13, 35], // COUNTRY x INDUSTRY: United Kingdom Financials
        ['USA_G40_A_17TO19_Avg',               77746, 56, 11, 11, 23], // COUNTRY x INDUSTRY: United States of America Financials
        ['G45_A_17TO19_Avg',                  148478, 47, 10, 16, 26], // INDUSTRY: Utilities
        ['G50_A_17TO19_Avg',                  193761, 53,  9, 13, 25], // INDUSTRY: Communications
        ['G55_A_17TO19_Avg',                  119967, 41, 11, 15, 34], // INDUSTRY: Public Sector and NFP
        ['G99_A_17TO19_Avg',                    3043, 45, 13, 12, 30], // INDUSTRY: Unclassified
        ['X9000_A_17TO19_Avg',               1990777, 46, 10, 14, 30], // INDUSTRY: Manufacturing
        ['NORAM_X9000_A_17TO19_Avg',          199191, 50, 12, 12, 27], // REGION x INDUSTRY: North America Manufacturing
        ['EURO_X9000_A_17TO19_Avg',           542847, 41, 10, 16, 33], // REGION x INDUSTRY: Europe Manufacturing
        ['JPN_X9000_A_17TO19_Avg',            446092, 24, 12, 12, 52], // COUNTRY x INDUSTRY: Japan Manufacturing
        ['GBR_X9000_A_17TO19_Avg',             69069, 38, 11, 15, 36], // COUNTRY x INDUSTRY: United Kingdom Manufacturing
        ['USA_X9000_A_17TO19_Avg',            175090, 49, 12, 12, 27], // COUNTRY x INDUSTRY: United States of America Manufacturing
        ['X9001_A_17TO19_Avg',                389219, 47, 10, 13, 30], // INDUSTRY: Automobiles and Automobile Parts
        ['NORAM_X9001_A_17TO19_Avg',           67906, 50, 11, 11, 28], // REGION x INDUSTRY: North America Automobiles and Automobile Parts
        ['USA_X9001_A_17TO19_Avg',             57679, 41, 13, 12, 34], // COUNTRY x INDUSTRY: United States of America Automobiles and Automobile Parts
        ['G100_A_17TO19_Avg',                  91652, 48, 10, 15, 27], // INDUSTRY: Oil and Gas
        ['G150_A_17TO19_Avg',                 173135, 47,  9, 15, 29], // INDUSTRY: Natural Resources
        ['G151_A_17TO19_Avg',                  61588, 46, 10, 12, 32], // INDUSTRY: Chemicals
        ['G200_A_17TO19_Avg',                 202145, 45, 11, 14, 30], // INDUSTRY: Life Sciences
        ['G201_A_17TO19_Avg',                 198794, 44,  9, 14, 33], // INDUSTRY: Healthcare
        ['G250_A_17TO19_Avg',                 165983, 57,  9, 12, 21], // INDUSTRY: Construction and Materials
        ['G251_A_17TO19_Avg',                 562815, 46, 10, 14, 31], // INDUSTRY: Industrial Goods
        ['JPN_G251_A_17TO19_Avg',             119698, 28, 12, 12, 48], // COUNTRY x INDUSTRY: Japan Industrial Goods
        ['GBR_G251_A_17TO19_Avg',              14888, 37, 10, 15, 37], // COUNTRY x INDUSTRY: United Kingdom Industrial Goods
        ['G252_A_17TO19_Avg',                 309001, 43, 10, 15, 32], // INDUSTRY: High Technology
        ['JPN_G252_A_17TO19_Avg',              90913, 22, 11, 12, 56], // COUNTRY x INDUSTRY: Japan High Technology
        ['GBR_G252_A_17TO19_Avg',              13081, 36, 12, 15, 37], // COUNTRY x INDUSTRY: United Kingdom High Technology
        ['G253_A_17TO19_Avg',                  90200, 40, 10, 14, 36], // INDUSTRY: Transportation
        ['G254_A_17TO19_Avg',                 176279, 44, 10, 14, 32], // INDUSTRY: Services
        ['GBR_G254_A_17TO19_Avg',              16286, 34, 13, 16, 37], // COUNTRY x INDUSTRY: United Kingdom Services
        ['G300_A_17TO19_Avg',                 303974, 49,  8, 14, 29], // INDUSTRY: Fast Moving Consumer Goods
        ['G301_A_17TO19_Avg',                 330224, 44, 10, 15, 31], // INDUSTRY: Consumer Durables
        ['G350_A_17TO19_Avg',                 438797, 47, 11, 13, 28], // INDUSTRY: Retail
        ['EURO_G350_A_17TO19_Avg',             82381, 39, 12, 14, 36], // REGION x INDUSTRY: Europe Retail
        ['USA_G350_A_17TO19_Avg',             148235, 54, 11, 11, 24], // COUNTRY x INDUSTRY: United States of America Retail
        ['G351_A_17TO19_Avg',                  82819, 48,  7, 14, 31], // INDUSTRY: Leisure and Hospitality
        ['G400_A_17TO19_Avg',                 377792, 48, 10, 13, 29], // INDUSTRY: Banks
        ['EURO_G400_A_17TO19_Avg',            190398, 44, 10, 15, 30], // REGION x INDUSTRY: Europe Banks
        ['MIDEGCC_G400_A_17TO19_Avg',          18772, 51,  9, 12, 28], // REGION x INDUSTRY: Gulf Cooperation Council (GCC) Banks
        ['MIDE_G400_A_17TO19_Avg',             19310, 50,  9, 12, 29], // REGION x INDUSTRY: Middle East Banks
        ['MIDENA_G400_A_17TO19_Avg',           25599, 48,  9, 12, 31], // REGION x INDUSTRY: Middle East/North Africa Banks
        ['ASIAPAC_G400_A_17TO19_Avg',          70285, 49,  9, 13, 29], // REGION x INDUSTRY: Asia/Pacific Banks
        ['G401_A_17TO19_Avg',                  91029, 46, 11, 13, 31], // INDUSTRY: Insurance
        ['G402_A_17TO19_Avg',                  88905, 51,  9, 13, 27], // INDUSTRY: Financial Services
        ['GBR_G402_A_17TO19_Avg',               8818, 40, 12, 12, 36], // COUNTRY x INDUSTRY: United Kingdom Financial Services
        ['USA_G402_A_17TO19_Avg',              23750, 57, 10, 10, 23], // COUNTRY x INDUSTRY: United States of America Financial Services
        ['G450_A_17TO19_Avg',                 148478, 47, 10, 16, 26], // INDUSTRY: Utilities
        ['G500_A_17TO19_Avg',                 136181, 55, 10, 11, 23], // INDUSTRY: Telecommunications
        ['G550_A_17TO19_Avg',                  26518, 38, 11, 14, 36], // INDUSTRY: Public Sector
        ['G551_A_17TO19_Avg',                  84732, 46,  9, 15, 30], // INDUSTRY: Education
        ['G552_A_17TO19_Avg',                   8717, 38, 12, 15, 35], // INDUSTRY: Not-for-Profit
        ['G1001_A_17TO19_Avg',                 59911, 46, 15, 13, 26], // INDUSTRY: Integrated Oil and Gas
        ['G1003_A_17TO19_Avg',                 29668, 46,  7, 17, 29], // INDUSTRY: Oil Field Services
        ['G1510_A_17TO19_Avg',                 11250, 39, 10, 15, 37], // INDUSTRY: Basic Chemicals
        ['G2000_A_17TO19_Avg',                179291, 47, 12, 14, 27], // INDUSTRY: Pharmaceuticals
        ['G2002_A_17TO19_Avg',                 17552, 40,  9, 13, 38], // INDUSTRY: Medical equipment and supplies
        ['G2011_A_17TO19_Avg',                 35999, 42,  7, 15, 36], // INDUSTRY: Hospitals and health systems
        ['G2012_A_17TO19_Avg',                151123, 48,  9, 14, 30], // INDUSTRY: Health care providers (excluding hospitals)
        ['G2500_A_17TO19_Avg',                 99718, 58,  9, 12, 21], // INDUSTRY: Construction
        ['G2501_A_17TO19_Avg',                 60118, 57,  9, 12, 22], // INDUSTRY: Building Materials
        ['G2511_A_17TO19_Avg',                314617, 51, 11, 12, 27], // INDUSTRY: Automobiles
        ['G2512_A_17TO19_Avg',                 72654, 44,  9, 14, 33], // INDUSTRY: Automobile Parts
        ['G2513_A_17TO19_Avg',                 17482, 45,  9, 15, 30], // INDUSTRY: Industrial Machinery
        ['G2515_A_17TO19_Avg',                 97413, 43, 10, 15, 32], // INDUSTRY: Diversified Industrials
        ['G2521_A_17TO19_Avg',                169898, 42, 10, 13, 35], // INDUSTRY: Technology, Hardware and Equipment
        ['G2522_A_17TO19_Avg',                 25459, 46,  9, 18, 28], // INDUSTRY: Software
        ['G2534_A_17TO19_Avg',                 21270, 44, 10, 14, 31], // INDUSTRY: Transportation Infrastructure
        ['G2541_A_17TO19_Avg',                 38781, 46, 10, 13, 30], // INDUSTRY: Business Services
        ['G2549_A_17TO19_Avg',                 89493, 41, 10, 14, 35], // INDUSTRY: Other Professional Services
        ['G3000_A_17TO19_Avg',                191291, 48,  8, 15, 29], // INDUSTRY: Food and Drink
        ['G3503_A_17TO19_Avg',                 49193, 45, 13, 14, 28], // INDUSTRY: Apparel Retailers
        ['G3510_A_17TO19_Avg',                 26235, 55,  6, 14, 25], // INDUSTRY: Hotels, Resorts and Cruise Lines
        ['G4000_A_17TO19_Avg',                218174, 49, 11, 11, 28], // INDUSTRY: Universal Banks
        ['G4002_A_17TO19_Avg',                 87377, 54,  9, 11, 26], // INDUSTRY: Retail/Corporate/Commercial Banks
        ['G4012_A_17TO19_Avg',                 13063, 44,  8, 14, 34], // INDUSTRY: General Insurance
        ['G4020_A_17TO19_Avg',                 16173, 60, 10, 10, 19], // INDUSTRY: Real Estate
        ['G4022_A_17TO19_Avg',                 23523, 49, 10, 12, 29], // INDUSTRY: Asset Management
        ['G4029_A_17TO19_Avg',                 33179, 51,  9, 13, 27], // INDUSTRY: Other Financial Services
        ['G4500_A_17TO19_Avg',                 57349, 47, 12, 16, 24], // INDUSTRY: Electricity and Gas
        ['G5001_A_17TO19_Avg',                136181, 55, 10, 11, 23], // INDUSTRY: Integrated Telecommunications
        ['G5501_A_17TO19_Avg',                 10797, 37, 13, 15, 35], // INDUSTRY: National Government Agencies
        ['G5514_A_17TO19_Avg',                  4056, 43,  9, 16, 32], // INDUSTRY: Educational services and support
        ['G5520_A_17TO19_Avg',                  1925, 36, 12, 15, 37], // INDUSTRY: Membership Organizations
        ['G5521_A_17TO19_Avg',                  5923, 38, 12, 16, 33], // INDUSTRY: Charitable and Religious Organizations and NGOs
        ['AFRIC_A_17TO19_Avg',                 81421, 48, 10, 13, 29], // REGION: Africa
        ['LATCSAMER_A_17TO19_Avg',            229123, 56, 13,  9, 21], // REGION: South America
        ['OCEAN_A_17TO19_Avg',                101112, 45, 11, 14, 30], // REGION: Oceania
        ['AFRICW_A_17TO19_Avg',                 4091, 47,  8, 18, 27], // REGION: Western Africa
        ['LATCCENT_A_17TO19_Avg',              85971, 58, 10, 11, 20], // REGION: Central America
        ['AFRICE_A_17TO19_Avg',                18604, 53,  8, 13, 26], // REGION: Eastern Africa
        ['AFRICN_A_17TO19_Avg',                36000, 47, 11, 13, 28], // REGION: Northern Africa
        ['AFRICS_A_17TO19_Avg',                20683, 46, 11, 12, 31], // REGION: Southern Africa
        ['NORAM_A_17TO19_Avg',                762189, 50, 11, 12, 26], // REGION: North America
        ['LATCCAR_A_17TO19_Avg',                2711, 49, 12, 11, 28], // REGION: Caribbean
        ['ASIAE_A_17TO19_Avg',                900666, 41,  9, 13, 37], // REGION: Eastern Asia
        ['ASIAS_A_17TO19_Avg',                 83456, 65,  7, 11, 17], // REGION: Southern Asia
        ['ASIASE_A_17TO19_Avg',               196818, 57,  7, 14, 22], // REGION: South-Eastern Asia
        ['EUROS_A_17TO19_Avg',                238175, 42, 13, 11, 34], // REGION: Southern Europe
        ['OCEANANZ_A_17TO19_Avg',             100152, 45, 11, 14, 30], // REGION: Australia and New Zealand
        ['ASIA_A_17TO19_Avg',                1368387, 50,  9, 13, 29], // REGION: Asia
        ['ASIAC_A_17TO19_Avg',                  9672, 59,  6, 16, 19], // REGION: Central Asia
        ['ASIAW_A_17TO19_Avg',                173090, 53, 10, 12, 24], // REGION: Western Asia
        ['EURO_A_17TO19_Avg',                1260108, 41, 11, 15, 33], // REGION: Europe
        ['EUROE_A_17TO19_Avg',                369048, 43,  7, 19, 30], // REGION: Eastern Europe
        ['EURON_A_17TO19_Avg',                415135, 40, 11, 15, 34], // REGION: Northern Europe
        ['EUROW_A_17TO19_Avg',                252327, 40, 12, 16, 32], // REGION: Western Europe
        ['AFRICSSAH_A_17TO19_Avg',             45072, 49,  9, 13, 29], // REGION: Sub-Saharan Africa
        ['LATC_A_17TO19_Avg',                 319008, 56, 12, 11, 21], // REGION: Latin America and the Caribbean
        ['MIDEGCC_A_17TO19_Avg',              101342, 55,  9, 12, 23], // REGION: Gulf Cooperation Council (GCC)
        ['EUROBALT_A_17TO19_Avg',               9297, 37,  6, 25, 32], // REGION: Baltic
        ['EUROBRIT_A_17TO19_Avg',             306975, 41, 11, 14, 34], // REGION: British and Irish Isles
        ['EUROSCAN_A_17TO19_Avg',             104287, 41, 12, 15, 31], // REGION: Scandinavia
        ['MIDE_A_17TO19_Avg',                 108020, 55,  9, 12, 23], // REGION: Middle East
        ['MIDENA_A_17TO19_Avg',               144407, 54, 10, 12, 24], // REGION: Middle East/North Africa
        ['MIDEA_A_17TO19_Avg',                212794, 52, 10, 13, 26], // REGION: Middle East/Africa
        ['ASIAPAC_A_17TO19_Avg',             1464563, 49,  9, 13, 29], // REGION: Asia/Pacific
        ['ARG_A_17TO19_Avg',                   29504, 54, 12,  9, 25], // COUNTRY: Argentina
        ['AUS_A_17TO19_Avg',                   93149, 44, 12, 14, 30], // COUNTRY: Australia
        ['AUT_A_17TO19_Avg',                    6490, 50, 11, 16, 23], // COUNTRY: Austria
        ['BHR_A_17TO19_Avg',                    3157, 51, 10, 12, 27], // COUNTRY: Bahrain
        ['BEL_A_17TO19_Avg',                   17837, 41, 13, 14, 32], // COUNTRY: Belgium
        ['BRA_A_17TO19_Avg',                  136131, 55, 14,  8, 23], // COUNTRY: Brazil
        ['BGR_A_17TO19_Avg',                    8400, 46,  5, 22, 28], // COUNTRY: Bulgaria
        ['CAN_A_17TO19_Avg',                   83322, 49, 11, 13, 27], // COUNTRY: Canada
        ['CHL_A_17TO19_Avg',                   19503, 59, 14,  7, 20], // COUNTRY: Chile
        ['CHN_A_17TO19_Avg',                  222564, 55,  8, 12, 26], // COUNTRY: China
        ['TWN_A_17TO19_Avg',                    7827, 53,  8, 14, 25], // COUNTRY: Taiwan (Province of China)
        ['COL_A_17TO19_Avg',                   10816, 67, 12,  7, 15], // COUNTRY: Colombia
        ['CRI_A_17TO19_Avg',                    2739, 61, 13,  9, 17], // COUNTRY: Costa Rica
        ['CZE_A_17TO19_Avg',                   21426, 37,  6, 25, 33], // COUNTRY: Czech Republic (Czechia)
        ['DNK_A_17TO19_Avg',                   13366, 41, 14, 15, 29], // COUNTRY: Denmark
        ['FIN_A_17TO19_Avg',                   31661, 47, 12, 16, 25], // COUNTRY: Finland
        ['FRA_A_17TO19_Avg',                  107199, 39, 13, 14, 35], // COUNTRY: France
        ['DEU_A_17TO19_Avg',                   74815, 42, 11, 17, 30], // COUNTRY: Germany
        ['GRC_A_17TO19_Avg',                   17002, 49, 15, 10, 27], // COUNTRY: Greece
        ['HKG_A_17TO19_Avg',                   13671, 39,  8, 17, 37], // COUNTRY: Hong Kong Special Administrative Region of China
        ['HUN_A_17TO19_Avg',                    9973, 40, 11, 15, 34], // COUNTRY: Hungary
        ['IND_A_17TO19_Avg',                   75962, 64,  8, 11, 17], // COUNTRY: India
        ['IDN_A_17TO19_Avg',                   46125, 66,  8, 13, 13], // COUNTRY: Indonesia
        ['IRL_A_17TO19_Avg',                   15686, 42, 10, 14, 34], // COUNTRY: Ireland
        ['ISR_A_17TO19_Avg',                   22146, 52, 13, 12, 23], // COUNTRY: Israel
        ['ITA_A_17TO19_Avg',                   20574, 39, 14, 10, 37], // COUNTRY: Italy
        ['JPN_A_17TO19_Avg',                  606028, 26, 11, 13, 50], // COUNTRY: Japan
        ['KAZ_A_17TO19_Avg',                    9416, 59,  6, 16, 19], // COUNTRY: Kazakhstan
        ['JOR_A_17TO19_Avg',                    5450, 56, 11, 10, 22], // COUNTRY: Jordan
        ['KOR_A_17TO19_Avg',                   47102, 35, 14, 16, 35], // COUNTRY: Korea, South
        ['KWT_A_17TO19_Avg',                   13433, 61,  8, 11, 20], // COUNTRY: Kuwait
        ['LTU_A_17TO19_Avg',                    3335, 43,  5, 26, 26], // COUNTRY: Lithuania
        ['LUX_A_17TO19_Avg',                    1088, 44, 15, 12, 29], // COUNTRY: Luxembourg
        ['MYS_A_17TO19_Avg',                   51522, 52,  7, 16, 25], // COUNTRY: Malaysia
        ['MUS_A_17TO19_Avg',                   10867, 52,  7, 12, 29], // COUNTRY: Mauritius
        ['MEX_A_17TO19_Avg',                   78849, 58, 10, 11, 20], // COUNTRY: Mexico
        ['NLD_A_17TO19_Avg',                   21988, 39, 13, 14, 34], // COUNTRY: Netherlands
        ['NZL_A_17TO19_Avg',                   12964, 43, 12, 15, 30], // COUNTRY: New Zealand
        ['NOR_A_17TO19_Avg',                   17629, 50, 11, 14, 25], // COUNTRY: Norway
        ['PAN_A_17TO19_Avg',                    1366, 50, 13, 14, 23], // COUNTRY: Panama
        ['PER_A_17TO19_Avg',                   14841, 66,  9,  8, 17], // COUNTRY: Peru
        ['PHL_A_17TO19_Avg',                   20485, 65,  7, 12, 17], // COUNTRY: Philippines
        ['POL_A_17TO19_Avg',                   83175, 37,  7, 19, 37], // COUNTRY: Poland
        ['PRT_A_17TO19_Avg',                   28032, 40, 13, 12, 35], // COUNTRY: Portugal
        ['QAT_A_17TO19_Avg',                    5471, 60,  9, 13, 18], // COUNTRY: Qatar
        ['ROU_A_17TO19_Avg',                   26633, 49,  6, 18, 26], // COUNTRY: Romania
        ['RUS_A_17TO19_Avg',                  155156, 53,  9, 16, 22], // COUNTRY: Russian Federation
        ['SAU_A_17TO19_Avg',                   42262, 53,  9, 12, 25], // COUNTRY: Saudi Arabia
        ['SRB_A_17TO19_Avg',                    5224, 57,  7, 12, 23], // COUNTRY: Serbia
        ['SGP_A_17TO19_Avg',                   12418, 47,  8, 15, 30], // COUNTRY: Singapore
        ['SVK_A_17TO19_Avg',                    8856, 40,  9, 23, 28], // COUNTRY: Slovakia
        ['VNM_A_17TO19_Avg',                   22895, 65,  8, 11, 17], // COUNTRY: Vietnam
        ['ZAF_A_17TO19_Avg',                   20269, 50, 11, 12, 27], // COUNTRY: South Africa
        ['ESP_A_17TO19_Avg',                  146420, 43, 14, 10, 32], // COUNTRY: Spain
        ['SWE_A_17TO19_Avg',                   39393, 42, 12, 14, 32], // COUNTRY: Sweden
        ['CHE_A_17TO19_Avg',                   16658, 45, 14, 16, 26], // COUNTRY: Switzerland
        ['THA_A_17TO19_Avg',                   35091, 53, 10, 16, 21], // COUNTRY: Thailand
        ['ARE_A_17TO19_Avg',                   33607, 63,  7, 12, 18], // COUNTRY: United Arab Emirates
        ['TUR_A_17TO19_Avg',                   37345, 49, 13, 12, 26], // COUNTRY: Turkey
        ['UKR_A_17TO19_Avg',                   48482, 53,  8, 18, 21], // COUNTRY: Ukraine
        ['EGY_A_17TO19_Avg',                   21725, 49, 10, 12, 29], // COUNTRY: Egypt
        ['GBR_A_17TO19_Avg',                  290259, 41, 11, 14, 34], // COUNTRY: United Kingdom
        ['USA_A_17TO19_Avg',                  677429, 51, 11, 12, 26], // COUNTRY: United States of America
        ['HP_A_17TO19_Avg',                   402911, 55, 11, 12, 23]  // TOTAL: High Performing
	];
	
	static function GetByNormId (norm_id) {
		for (var i=0; i<DistributionLookup.length; ++i) {
          	var item = DistributionLookup[i];
			if (norm_id == item[0]) {
				return {
					ValidN: item[1],
					Effective: item[2],
					Frustrated: item[3],
					Detached: item[4],
					Ineffective: item[5]
				}
			}
		}
	}
}