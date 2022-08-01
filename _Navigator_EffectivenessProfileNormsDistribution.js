class EffectivenessProfileNormsDistribution {

  
  static var DistributionLookup = {
    'AllCompany_18TO20_Avg':     {'N': 4028164, 'Dist': {  'MostEffective': 47, 'Frustrated': 10, 'Detached': 14, 'LeastEffective': 29} },    // TOTAL: General Industry
    'G10_18TO20_Avg':            {'N': 71983,   'Dist': {  'MostEffective': 49, 'Frustrated': 8,  'Detached': 15, 'LeastEffective': 27} },    // INDUSTRY: Oil and Gas
    'G15_18TO20_Avg':            {'N': 203797,  'Dist': {  'MostEffective': 48, 'Frustrated': 9,  'Detached': 13, 'LeastEffective': 30} },    // INDUSTRY: Natural Materials
    'G20_18TO20_Avg':            {'N': 317852,  'Dist': {  'MostEffective': 44, 'Frustrated': 10, 'Detached': 14, 'LeastEffective': 32} },    // INDUSTRY: Health and Life Sciences
    'G25_18TO20_Avg':            {'N': 1713230, 'Dist': {  'MostEffective': 46, 'Frustrated': 10, 'Detached': 14, 'LeastEffective': 30} },    // INDUSTRY: Industrials
    'JPN_G25_18TO20_Avg':        {'N': 464924,  'Dist': {  'MostEffective': 25, 'Frustrated': 11, 'Detached': 13, 'LeastEffective': 51} },    // COUNTRY x INDUSTRY: Japan Industrials
    'GBR_G25_18TO20_Avg':        {'N': 76170,   'Dist': {  'MostEffective': 40, 'Frustrated': 11, 'Detached': 15, 'LeastEffective': 34} },    // COUNTRY x INDUSTRY: United Kingdom Industrials
    'G30_18TO20_Avg':            {'N': 553888,  'Dist': {  'MostEffective': 49, 'Frustrated': 9,  'Detached': 13, 'LeastEffective': 29} },    // INDUSTRY: Consumer Goods
    'JPN_G30_18TO20_Avg':        {'N': 199163,  'Dist': {  'MostEffective': 24, 'Frustrated': 13, 'Detached': 12, 'LeastEffective': 51} },    // COUNTRY x INDUSTRY: Japan Consumer Goods
    'GBR_G30_18TO20_Avg':        {'N': 31401,   'Dist': {  'MostEffective': 42, 'Frustrated': 8,  'Detached': 15, 'LeastEffective': 34} },    // COUNTRY x INDUSTRY: United Kingdom Consumer Goods
    'G35_18TO20_Avg':            {'N': 413909,  'Dist': {  'MostEffective': 50, 'Frustrated': 9,  'Detached': 13, 'LeastEffective': 28} },    // INDUSTRY: Consumer Services
    'GBR_G35_18TO20_Avg':        {'N': 60338,   'Dist': {  'MostEffective': 44, 'Frustrated': 9,  'Detached': 13, 'LeastEffective': 33} },    // COUNTRY x INDUSTRY: United Kingdom Consumer Services
    'G40_18TO20_Avg':            {'N': 327548,  'Dist': {  'MostEffective': 51, 'Frustrated': 10, 'Detached': 13, 'LeastEffective': 27} },    // INDUSTRY: Financials
    'ASIA_G40_18TO20_Avg':       {'N': 92234,   'Dist': {  'MostEffective': 55, 'Frustrated': 8,  'Detached': 13, 'LeastEffective': 24} },    // REGION x INDUSTRY: Asia Financials
    'EURO_G40_18TO20_Avg':       {'N': 123637,  'Dist': {  'MostEffective': 43, 'Frustrated': 11, 'Detached': 15, 'LeastEffective': 31} },    // REGION x INDUSTRY: Europe Financials
    'GBR_G40_18TO20_Avg':        {'N': 22467,   'Dist': {  'MostEffective': 43, 'Frustrated': 13, 'Detached': 13, 'LeastEffective': 31} },    // COUNTRY x INDUSTRY: United Kingdom Financials
    'USA_G40_18TO20_Avg':        {'N': 52150,   'Dist': {  'MostEffective': 58, 'Frustrated': 10, 'Detached': 11, 'LeastEffective': 21} },    // COUNTRY x INDUSTRY: United States of America Financials
    'G45_18TO20_Avg':            {'N': 149740,  'Dist': {  'MostEffective': 49, 'Frustrated': 10, 'Detached': 16, 'LeastEffective': 24} },    // INDUSTRY: Utilities
    'G50_18TO20_Avg':            {'N': 149040,  'Dist': {  'MostEffective': 53, 'Frustrated': 9,  'Detached': 13, 'LeastEffective': 25} },    // INDUSTRY: Communications
    'G55_18TO20_Avg':            {'N': 66861,   'Dist': {  'MostEffective': 42, 'Frustrated': 12, 'Detached': 14, 'LeastEffective': 32} },    // INDUSTRY: Public Sector and NFP
    'X9000_18TO20_Avg':          {'N': 2026209, 'Dist': {  'MostEffective': 47, 'Frustrated': 10, 'Detached': 14, 'LeastEffective': 29} },    // INDUSTRY: Manufacturing
    'NORAM_X9000_18TO20_Avg':    {'N': 179532,  'Dist': {  'MostEffective': 50, 'Frustrated': 11, 'Detached': 12, 'LeastEffective': 26} },    // REGION x INDUSTRY: North America Manufacturing
    'EURO_X9000_18TO20_Avg':     {'N': 549847,  'Dist': {  'MostEffective': 43, 'Frustrated': 10, 'Detached': 16, 'LeastEffective': 31} },    // REGION x INDUSTRY: Europe Manufacturing
    'JPN_X9000_18TO20_Avg':      {'N': 463669,  'Dist': {  'MostEffective': 26, 'Frustrated': 11, 'Detached': 12, 'LeastEffective': 51} },    // COUNTRY x INDUSTRY: Japan Manufacturing
    'GBR_X9000_18TO20_Avg':      {'N': 67478,   'Dist': {  'MostEffective': 39, 'Frustrated': 11, 'Detached': 15, 'LeastEffective': 35} },    // COUNTRY x INDUSTRY: United Kingdom Manufacturing
    'USA_X9000_18TO20_Avg':      {'N': 158511,  'Dist': {  'MostEffective': 50, 'Frustrated': 11, 'Detached': 13, 'LeastEffective': 27} },    // COUNTRY x INDUSTRY: United States of America Manufacturing
    'X9001_18TO20_Avg':          {'N': 638665,  'Dist': {  'MostEffective': 48, 'Frustrated': 11, 'Detached': 12, 'LeastEffective': 29} },    // INDUSTRY: Automobiles and Automobile Parts
    'NORAM_X9001_18TO20_Avg':    {'N': 74626,   'Dist': {  'MostEffective': 53, 'Frustrated': 11, 'Detached': 11, 'LeastEffective': 25} },    // REGION x INDUSTRY: North America Automobiles and Automobile Parts
    'G100_18TO20_Avg':           {'N': 71983,   'Dist': {  'MostEffective': 49, 'Frustrated': 8,  'Detached': 15, 'LeastEffective': 27} },    // INDUSTRY: Oil and Gas
    'G150_18TO20_Avg':           {'N': 146792,  'Dist': {  'MostEffective': 50, 'Frustrated': 9,  'Detached': 14, 'LeastEffective': 27} },    // INDUSTRY: Natural Resources
    'G151_18TO20_Avg':           {'N': 57005,   'Dist': {  'MostEffective': 46, 'Frustrated': 9,  'Detached': 12, 'LeastEffective': 32} },    // INDUSTRY: Chemicals
    'G200_18TO20_Avg':           {'N': 179237,  'Dist': {  'MostEffective': 45, 'Frustrated': 11, 'Detached': 14, 'LeastEffective': 30} },    // INDUSTRY: Life Sciences
    'G201_18TO20_Avg':           {'N': 136842,  'Dist': {  'MostEffective': 42, 'Frustrated': 8,  'Detached': 15, 'LeastEffective': 36} },    // INDUSTRY: Healthcare
    'G250_18TO20_Avg':           {'N': 143428,  'Dist': {  'MostEffective': 58, 'Frustrated': 9,  'Detached': 12, 'LeastEffective': 21} },    // INDUSTRY: Construction and Materials
    'G251_18TO20_Avg':           {'N': 819708,  'Dist': {  'MostEffective': 47, 'Frustrated': 10, 'Detached': 14, 'LeastEffective': 30} },    // INDUSTRY: Industrial Goods
    'JPN_G251_18TO20_Avg':       {'N': 182189,  'Dist': {  'MostEffective': 28, 'Frustrated': 11, 'Detached': 12, 'LeastEffective': 48} },    // COUNTRY x INDUSTRY: Japan Industrial Goods
    'GBR_G251_18TO20_Avg':       {'N': 21637,   'Dist': {  'MostEffective': 38, 'Frustrated': 11, 'Detached': 15, 'LeastEffective': 35} },    // COUNTRY x INDUSTRY: United Kingdom Industrial Goods
    'G252_18TO20_Avg':           {'N': 259949,  'Dist': {  'MostEffective': 44, 'Frustrated': 10, 'Detached': 15, 'LeastEffective': 32} },    // INDUSTRY: High Technology
    'JPN_G252_18TO20_Avg':       {'N': 42343,   'Dist': {  'MostEffective': 23, 'Frustrated': 9,  'Detached': 13, 'LeastEffective': 55} },    // COUNTRY x INDUSTRY: Japan High Technology
    'GBR_G252_18TO20_Avg':       {'N': 8290,    'Dist': {  'MostEffective': 36, 'Frustrated': 11, 'Detached': 15, 'LeastEffective': 38} },    // COUNTRY x INDUSTRY: United Kingdom High Technology
    'G253_18TO20_Avg':           {'N': 213320,  'Dist': {  'MostEffective': 39, 'Frustrated': 10, 'Detached': 14, 'LeastEffective': 37} },    // INDUSTRY: Transportation
    'G254_18TO20_Avg':           {'N': 144819,  'Dist': {  'MostEffective': 44, 'Frustrated': 11, 'Detached': 14, 'LeastEffective': 31} },    // INDUSTRY: Services
    'G300_18TO20_Avg':           {'N': 222688,  'Dist': {  'MostEffective': 48, 'Frustrated': 9,  'Detached': 14, 'LeastEffective': 29} },    // INDUSTRY: Fast Moving Consumer Goods
    'G301_18TO20_Avg':           {'N': 319578,  'Dist': {  'MostEffective': 50, 'Frustrated': 10, 'Detached': 12, 'LeastEffective': 28} },    // INDUSTRY: Consumer Durables
    'G350_18TO20_Avg':           {'N': 353307,  'Dist': {  'MostEffective': 49, 'Frustrated': 11, 'Detached': 13, 'LeastEffective': 27} },    // INDUSTRY: Retail
    'EURO_G350_18TO20_Avg':      {'N': 48371,   'Dist': {  'MostEffective': 39, 'Frustrated': 11, 'Detached': 14, 'LeastEffective': 36} },    // REGION x INDUSTRY: Europe Retail
    'G351_18TO20_Avg':           {'N': 60602,   'Dist': {  'MostEffective': 52, 'Frustrated': 7,  'Detached': 13, 'LeastEffective': 29} },    // INDUSTRY: Leisure and Hospitality
    'G400_18TO20_Avg':           {'N': 171054,  'Dist': {  'MostEffective': 49, 'Frustrated': 9,  'Detached': 13, 'LeastEffective': 28} },    // INDUSTRY: Banks
    'EURO_G400_18TO20_Avg':      {'N': 83193,   'Dist': {  'MostEffective': 45, 'Frustrated': 10, 'Detached': 16, 'LeastEffective': 30} },    // REGION x INDUSTRY: Europe Banks
    'ASIAPAC_G400_18TO20_Avg':   {'N': 57037,   'Dist': {  'MostEffective': 52, 'Frustrated': 9,  'Detached': 11, 'LeastEffective': 28} },    // REGION x INDUSTRY: Asia/Pacific Banks
    'G401_18TO20_Avg':           {'N': 66338,   'Dist': {  'MostEffective': 48, 'Frustrated': 10, 'Detached': 13, 'LeastEffective': 28} },    // INDUSTRY: Insurance
    'G402_18TO20_Avg':           {'N': 70432,   'Dist': {  'MostEffective': 52, 'Frustrated': 10, 'Detached': 13, 'LeastEffective': 26} },    // INDUSTRY: Financial Services
    'GBR_G402_18TO20_Avg':       {'N': 5476,    'Dist': {  'MostEffective': 42, 'Frustrated': 13, 'Detached': 13, 'LeastEffective': 31} },    // COUNTRY x INDUSTRY: United Kingdom Financial Services
    'USA_G402_18TO20_Avg':       {'N': 14127,   'Dist': {  'MostEffective': 58, 'Frustrated': 10, 'Detached': 10, 'LeastEffective': 21} },    // COUNTRY x INDUSTRY: United States of America Financial Services
    'G450_18TO20_Avg':           {'N': 149740,  'Dist': {  'MostEffective': 49, 'Frustrated': 10, 'Detached': 16, 'LeastEffective': 24} },    // INDUSTRY: Utilities
    'G500_18TO20_Avg':           {'N': 108829,  'Dist': {  'MostEffective': 56, 'Frustrated': 9,  'Detached': 11, 'LeastEffective': 24} },    // INDUSTRY: Telecommunications
    'G550_18TO20_Avg':           {'N': 19759,   'Dist': {  'MostEffective': 42, 'Frustrated': 12, 'Detached': 14, 'LeastEffective': 32} },    // INDUSTRY: Public Sector
    'G551_18TO20_Avg':           {'N': 41531,   'Dist': {  'MostEffective': 47, 'Frustrated': 9,  'Detached': 15, 'LeastEffective': 29} },    // INDUSTRY: Education
    'G552_18TO20_Avg':           {'N': 5571,    'Dist': {  'MostEffective': 38, 'Frustrated': 14, 'Detached': 15, 'LeastEffective': 33} },    // INDUSTRY: Not-for-Profit
    'G1003_18TO20_Avg':          {'N': 19748,   'Dist': {  'MostEffective': 47, 'Frustrated': 7,  'Detached': 17, 'LeastEffective': 30} },    // INDUSTRY: Oil Field Services
    'G2000_18TO20_Avg':          {'N': 150560,  'Dist': {  'MostEffective': 46, 'Frustrated': 12, 'Detached': 14, 'LeastEffective': 28} },    // INDUSTRY: Pharmaceuticals
    'G2002_18TO20_Avg':          {'N': 15435,   'Dist': {  'MostEffective': 41, 'Frustrated': 9,  'Detached': 15, 'LeastEffective': 36} },    // INDUSTRY: Medical equipment and supplies
    'G2500_18TO20_Avg':          {'N': 88800,   'Dist': {  'MostEffective': 58, 'Frustrated': 9,  'Detached': 12, 'LeastEffective': 21} },    // INDUSTRY: Construction
    'G2501_18TO20_Avg':          {'N': 48481,   'Dist': {  'MostEffective': 58, 'Frustrated': 8,  'Detached': 13, 'LeastEffective': 20} },    // INDUSTRY: Building Materials
    'G2511_18TO20_Avg':          {'N': 560383,  'Dist': {  'MostEffective': 52, 'Frustrated': 11, 'Detached': 11, 'LeastEffective': 26} },    // INDUSTRY: Automobiles
    'G2512_18TO20_Avg':          {'N': 76334,   'Dist': {  'MostEffective': 44, 'Frustrated': 9,  'Detached': 14, 'LeastEffective': 33} },    // INDUSTRY: Automobile Parts
    'G2513_18TO20_Avg':          {'N': 12480,   'Dist': {  'MostEffective': 48, 'Frustrated': 9,  'Detached': 15, 'LeastEffective': 28} },    // INDUSTRY: Industrial Machinery
    'G2515_18TO20_Avg':          {'N': 115977,  'Dist': {  'MostEffective': 43, 'Frustrated': 10, 'Detached': 15, 'LeastEffective': 32} },    // INDUSTRY: Diversified Industrials
    'G2521_18TO20_Avg':          {'N': 53095,   'Dist': {  'MostEffective': 42, 'Frustrated': 9,  'Detached': 14, 'LeastEffective': 36} },    // INDUSTRY: Technology
    'G2522_18TO20_Avg':          {'N': 26871,   'Dist': {  'MostEffective': 48, 'Frustrated': 8,  'Detached': 17, 'LeastEffective': 27} },    // INDUSTRY: Software
    'G2534_18TO20_Avg':          {'N': 29567,   'Dist': {  'MostEffective': 43, 'Frustrated': 10, 'Detached': 14, 'LeastEffective': 33} },    // INDUSTRY: Transportation Infrastructure
    'G2549_18TO20_Avg':          {'N': 123704,  'Dist': {  'MostEffective': 43, 'Frustrated': 11, 'Detached': 14, 'LeastEffective': 31} },    // INDUSTRY: Other Professional Services
    'G3000_18TO20_Avg':          {'N': 143691,  'Dist': {  'MostEffective': 47, 'Frustrated': 8,  'Detached': 14, 'LeastEffective': 31} },    // INDUSTRY: Food and Drink
    'G3510_18TO20_Avg':          {'N': 17020,   'Dist': {  'MostEffective': 58, 'Frustrated': 6,  'Detached': 13, 'LeastEffective': 24} },    // INDUSTRY: Hotels
    'G4002_18TO20_Avg':          {'N': 67065,   'Dist': {  'MostEffective': 54, 'Frustrated': 9,  'Detached': 11, 'LeastEffective': 26} },    // INDUSTRY: Retail/Corporate/Commercial Banks
    'G4020_18TO20_Avg':          {'N': 14547,   'Dist': {  'MostEffective': 59, 'Frustrated': 11, 'Detached': 12, 'LeastEffective': 18} },    // INDUSTRY: Real Estate
    'G4022_18TO20_Avg':          {'N': 17586,   'Dist': {  'MostEffective': 47, 'Frustrated': 10, 'Detached': 12, 'LeastEffective': 30} },    // INDUSTRY: Asset Management
    'G4029_18TO20_Avg':          {'N': 20542,   'Dist': {  'MostEffective': 51, 'Frustrated': 9,  'Detached': 13, 'LeastEffective': 28} },    // INDUSTRY: Other Financial Services
    'G4500_18TO20_Avg':          {'N': 53514,   'Dist': {  'MostEffective': 50, 'Frustrated': 12, 'Detached': 16, 'LeastEffective': 22} },    // INDUSTRY: Electricity and Gas
    'G5001_18TO20_Avg':          {'N': 108829,  'Dist': {  'MostEffective': 56, 'Frustrated': 9,  'Detached': 11, 'LeastEffective': 24} },    // INDUSTRY: Integrated Telecommunications
    'G5501_18TO20_Avg':          {'N': 7072,    'Dist': {  'MostEffective': 38, 'Frustrated': 15, 'Detached': 16, 'LeastEffective': 31} },    // INDUSTRY: National Government Agencies
    'G5514_18TO20_Avg':          {'N': 3866,    'Dist': {  'MostEffective': 46, 'Frustrated': 9,  'Detached': 16, 'LeastEffective': 29} },    // INDUSTRY: Educational services and support
    'G5520_18TO20_Avg':          {'N': 1340,    'Dist': {  'MostEffective': 33, 'Frustrated': 15, 'Detached': 14, 'LeastEffective': 38} },    // INDUSTRY: Membership Organizations
    'G5521_18TO20_Avg':          {'N': 3856,    'Dist': {  'MostEffective': 41, 'Frustrated': 13, 'Detached': 16, 'LeastEffective': 30} },    // INDUSTRY: Charitable and Religious Organizations and NGOs
    'AFRIC_18TO20_Avg':          {'N': 83270,   'Dist': {  'MostEffective': 52, 'Frustrated': 9,  'Detached': 12, 'LeastEffective': 27} },    // REGION: Africa
    'LATCSAMER_18TO20_Avg':      {'N': 160519,  'Dist': {  'MostEffective': 58, 'Frustrated': 12, 'Detached': 9,  'LeastEffective': 21} },    // REGION: South America
    'OCEAN_18TO20_Avg':          {'N': 80381,   'Dist': {  'MostEffective': 46, 'Frustrated': 12, 'Detached': 14, 'LeastEffective': 29} },    // REGION: Oceania
    'AFRICW_18TO20_Avg':         {'N': 5569,    'Dist': {  'MostEffective': 51, 'Frustrated': 8,  'Detached': 18, 'LeastEffective': 22} },    // REGION: Western Africa
    'LATCCENT_18TO20_Avg':       {'N': 71461,   'Dist': {  'MostEffective': 59, 'Frustrated': 10, 'Detached': 11, 'LeastEffective': 20} },    // REGION: Central America
    'AFRICE_18TO20_Avg':         {'N': 18874,   'Dist': {  'MostEffective': 55, 'Frustrated': 8,  'Detached': 12, 'LeastEffective': 25} },    // REGION: Eastern Africa
    'AFRICN_18TO20_Avg':         {'N': 41457,   'Dist': {  'MostEffective': 51, 'Frustrated': 12, 'Detached': 11, 'LeastEffective': 26} },    // REGION: Northern Africa
    'AFRICS_18TO20_Avg':         {'N': 15006,   'Dist': {  'MostEffective': 50, 'Frustrated': 10, 'Detached': 11, 'LeastEffective': 29} },    // REGION: Southern Africa
    'NORAM_18TO20_Avg':          {'N': 569928,  'Dist': {  'MostEffective': 51, 'Frustrated': 11, 'Detached': 12, 'LeastEffective': 26} },    // REGION: North America
    'ASIAE_18TO20_Avg':          {'N': 1033959, 'Dist': {  'MostEffective': 42, 'Frustrated': 9,  'Detached': 13, 'LeastEffective': 36} },    // REGION: Eastern Asia
    'ASIAS_18TO20_Avg':          {'N': 74066,   'Dist': {  'MostEffective': 65, 'Frustrated': 8,  'Detached': 11, 'LeastEffective': 17} },    // REGION: Southern Asia
    'ASIASE_18TO20_Avg':         {'N': 185606,  'Dist': {  'MostEffective': 58, 'Frustrated': 7,  'Detached': 14, 'LeastEffective': 21} },    // REGION: South-Eastern Asia
    'EUROS_18TO20_Avg':          {'N': 198070,  'Dist': {  'MostEffective': 44, 'Frustrated': 12, 'Detached': 11, 'LeastEffective': 33} },    // REGION: Southern Europe
    'OCEANANZ_18TO20_Avg':       {'N': 79595,   'Dist': {  'MostEffective': 46, 'Frustrated': 12, 'Detached': 14, 'LeastEffective': 29} },    // REGION: Australia and New Zealand
    'ASIA_18TO20_Avg':           {'N': 1451974, 'Dist': {  'MostEffective': 51, 'Frustrated': 9,  'Detached': 13, 'LeastEffective': 28} },    // REGION: Asia
    'ASIAC_18TO20_Avg':          {'N': 7749,    'Dist': {  'MostEffective': 58, 'Frustrated': 6,  'Detached': 16, 'LeastEffective': 20} },    // REGION: Central Asia
    'ASIAW_18TO20_Avg':          {'N': 146752,  'Dist': {  'MostEffective': 55, 'Frustrated': 10, 'Detached': 12, 'LeastEffective': 22} },    // REGION: Western Asia
    'EURO_18TO20_Avg':           {'N': 1078946, 'Dist': {  'MostEffective': 43, 'Frustrated': 10, 'Detached': 16, 'LeastEffective': 31} },    // REGION: Europe
    'EUROE_18TO20_Avg':          {'N': 326151,  'Dist': {  'MostEffective': 44, 'Frustrated': 7,  'Detached': 19, 'LeastEffective': 29} },    // REGION: Eastern Europe
    'EURON_18TO20_Avg':          {'N': 339888,  'Dist': {  'MostEffective': 43, 'Frustrated': 11, 'Detached': 15, 'LeastEffective': 31} },    // REGION: Northern Europe
    'EUROW_18TO20_Avg':          {'N': 229789,  'Dist': {  'MostEffective': 41, 'Frustrated': 12, 'Detached': 16, 'LeastEffective': 32} },    // REGION: Western Europe
    'AFRICSSAH_18TO20_Avg':      {'N': 41480,   'Dist': {  'MostEffective': 53, 'Frustrated': 9,  'Detached': 12, 'LeastEffective': 26} },    // REGION: Sub-Saharan Africa
    'LATC_18TO20_Avg':           {'N': 234291,  'Dist': {  'MostEffective': 58, 'Frustrated': 11, 'Detached': 11, 'LeastEffective': 21} },    // REGION: Latin America and the Caribbean
    'MIDEGCC_18TO20_Avg':        {'N': 80546,   'Dist': {  'MostEffective': 58, 'Frustrated': 9,  'Detached': 12, 'LeastEffective': 21} },    // REGION: Gulf Cooperation Council (GCC)
    'EUROBALT_18TO20_Avg':       {'N': 7404,    'Dist': {  'MostEffective': 40, 'Frustrated': 5,  'Detached': 26, 'LeastEffective': 29} },    // REGION: Baltic
    'EUROBRIT_18TO20_Avg':       {'N': 244235,  'Dist': {  'MostEffective': 43, 'Frustrated': 11, 'Detached': 14, 'LeastEffective': 32} },    // REGION: British and Irish Isles
    'EUROSCAN_18TO20_Avg':       {'N': 93890,   'Dist': {  'MostEffective': 42, 'Frustrated': 12, 'Detached': 16, 'LeastEffective': 30} },    // REGION: Scandinavia
    'MIDE_18TO20_Avg':           {'N': 84185,   'Dist': {  'MostEffective': 57, 'Frustrated': 10, 'Detached': 12, 'LeastEffective': 21} },    // REGION: Middle East
    'MIDENA_18TO20_Avg':         {'N': 126059,  'Dist': {  'MostEffective': 56, 'Frustrated': 10, 'Detached': 12, 'LeastEffective': 22} },    // REGION: Middle East/North Africa
    'MIDEA_18TO20_Avg':          {'N': 184870,  'Dist': {  'MostEffective': 55, 'Frustrated': 10, 'Detached': 12, 'LeastEffective': 24} },    // REGION: Middle East/Africa
    'ASIAPAC_18TO20_Avg':        {'N': 1527293, 'Dist': {  'MostEffective': 50, 'Frustrated': 9,  'Detached': 13, 'LeastEffective': 28} },    // REGION: Asia/Pacific
    'ARG_18TO20_Avg':            {'N': 20388,   'Dist': {  'MostEffective': 56, 'Frustrated': 12, 'Detached': 8,  'LeastEffective': 23} },    // COUNTRY: Argentina
    'AUS_18TO20_Avg':            {'N': 75420,   'Dist': {  'MostEffective': 46, 'Frustrated': 12, 'Detached': 13, 'LeastEffective': 30} },    // COUNTRY: Australia
    'AUT_18TO20_Avg':            {'N': 4293,    'Dist': {  'MostEffective': 50, 'Frustrated': 10, 'Detached': 17, 'LeastEffective': 23} },    // COUNTRY: Austria
    'BEL_18TO20_Avg':            {'N': 14534,   'Dist': {  'MostEffective': 43, 'Frustrated': 13, 'Detached': 14, 'LeastEffective': 31} },    // COUNTRY: Belgium
    'BRA_18TO20_Avg':            {'N': 97292,   'Dist': {  'MostEffective': 57, 'Frustrated': 13, 'Detached': 8,  'LeastEffective': 22} },    // COUNTRY: Brazil
    'BGR_18TO20_Avg':            {'N': 6462,    'Dist': {  'MostEffective': 47, 'Frustrated': 6,  'Detached': 21, 'LeastEffective': 27} },    // COUNTRY: Bulgaria
    'CAN_18TO20_Avg':            {'N': 62339,   'Dist': {  'MostEffective': 51, 'Frustrated': 11, 'Detached': 13, 'LeastEffective': 26} },    // COUNTRY: Canada
    'CHL_18TO20_Avg':            {'N': 7119,    'Dist': {  'MostEffective': 62, 'Frustrated': 13, 'Detached': 7,  'LeastEffective': 19} },    // COUNTRY: Chile
    'CHN_18TO20_Avg':            {'N': 232751,  'Dist': {  'MostEffective': 58, 'Frustrated': 7,  'Detached': 12, 'LeastEffective': 23} },    // COUNTRY: China
    'TWN_18TO20_Avg':            {'N': 6634,    'Dist': {  'MostEffective': 55, 'Frustrated': 8,  'Detached': 14, 'LeastEffective': 23} },    // COUNTRY: Taiwan (Province of China)
    'CZE_18TO20_Avg':            {'N': 17143,   'Dist': {  'MostEffective': 41, 'Frustrated': 5,  'Detached': 24, 'LeastEffective': 30} },    // COUNTRY: Czech Republic (Czechia)
    'DNK_18TO20_Avg':            {'N': 9784,    'Dist': {  'MostEffective': 42, 'Frustrated': 14, 'Detached': 16, 'LeastEffective': 28} },    // COUNTRY: Denmark
    'FIN_18TO20_Avg':            {'N': 32188,   'Dist': {  'MostEffective': 47, 'Frustrated': 12, 'Detached': 16, 'LeastEffective': 26} },    // COUNTRY: Finland
    'FRA_18TO20_Avg':            {'N': 109290,  'Dist': {  'MostEffective': 40, 'Frustrated': 13, 'Detached': 13, 'LeastEffective': 34} },    // COUNTRY: France
    'DEU_18TO20_Avg':            {'N': 64207,   'Dist': {  'MostEffective': 42, 'Frustrated': 11, 'Detached': 17, 'LeastEffective': 30} },    // COUNTRY: Germany
    'GHA_18TO20_Avg':            {'N': 4157,    'Dist': {  'MostEffective': 51, 'Frustrated': 6,  'Detached': 20, 'LeastEffective': 22} },    // COUNTRY: Ghana
    'GRC_18TO20_Avg':            {'N': 5607,    'Dist': {  'MostEffective': 47, 'Frustrated': 15, 'Detached': 10, 'LeastEffective': 28} },    // COUNTRY: Greece
    'HKG_18TO20_Avg':            {'N': 9263,    'Dist': {  'MostEffective': 43, 'Frustrated': 7,  'Detached': 16, 'LeastEffective': 35} },    // COUNTRY: Hong Kong Special Administrative Region of China
    'HUN_18TO20_Avg':            {'N': 6437,    'Dist': {  'MostEffective': 41, 'Frustrated': 12, 'Detached': 14, 'LeastEffective': 32} },    // COUNTRY: Hungary
    'IND_18TO20_Avg':            {'N': 72742,   'Dist': {  'MostEffective': 64, 'Frustrated': 8,  'Detached': 11, 'LeastEffective': 17} },    // COUNTRY: India
    'IDN_18TO20_Avg':            {'N': 42948,   'Dist': {  'MostEffective': 71, 'Frustrated': 6,  'Detached': 12, 'LeastEffective': 12} },    // COUNTRY: Indonesia
    'IRL_18TO20_Avg':            {'N': 11590,   'Dist': {  'MostEffective': 43, 'Frustrated': 9,  'Detached': 14, 'LeastEffective': 33} },    // COUNTRY: Ireland
    'ISR_18TO20_Avg':            {'N': 16440,   'Dist': {  'MostEffective': 52, 'Frustrated': 13, 'Detached': 12, 'LeastEffective': 23} },    // COUNTRY: Israel
    'ITA_18TO20_Avg':            {'N': 14977,   'Dist': {  'MostEffective': 42, 'Frustrated': 12, 'Detached': 10, 'LeastEffective': 35} },    // COUNTRY: Italy
    'JPN_18TO20_Avg':            {'N': 735114,  'Dist': {  'MostEffective': 27, 'Frustrated': 11, 'Detached': 13, 'LeastEffective': 49} },    // COUNTRY: Japan
    'KAZ_18TO20_Avg':            {'N': 7504,    'Dist': {  'MostEffective': 58, 'Frustrated': 6,  'Detached': 17, 'LeastEffective': 19} },    // COUNTRY: Kazakhstan
    'KOR_18TO20_Avg':            {'N': 47381,   'Dist': {  'MostEffective': 34, 'Frustrated': 13, 'Detached': 18, 'LeastEffective': 36} },    // COUNTRY: Korea
    'LTU_18TO20_Avg':            {'N': 3550,    'Dist': {  'MostEffective': 44, 'Frustrated': 4,  'Detached': 27, 'LeastEffective': 25} },    // COUNTRY: Lithuania
    'MYS_18TO20_Avg':            {'N': 44609,   'Dist': {  'MostEffective': 51, 'Frustrated': 7,  'Detached': 16, 'LeastEffective': 26} },    // COUNTRY: Malaysia
    'MUS_18TO20_Avg':            {'N': 13120,   'Dist': {  'MostEffective': 55, 'Frustrated': 7,  'Detached': 11, 'LeastEffective': 26} },    // COUNTRY: Mauritius
    'MEX_18TO20_Avg':            {'N': 68190,   'Dist': {  'MostEffective': 60, 'Frustrated': 9,  'Detached': 12, 'LeastEffective': 20} },    // COUNTRY: Mexico
    'NLD_18TO20_Avg':            {'N': 15691,   'Dist': {  'MostEffective': 40, 'Frustrated': 12, 'Detached': 15, 'LeastEffective': 33} },    // COUNTRY: Netherlands
    'NZL_18TO20_Avg':            {'N': 10138,   'Dist': {  'MostEffective': 41, 'Frustrated': 12, 'Detached': 15, 'LeastEffective': 31} },    // COUNTRY: New Zealand
    'NOR_18TO20_Avg':            {'N': 13963,   'Dist': {  'MostEffective': 53, 'Frustrated': 10, 'Detached': 14, 'LeastEffective': 23} },    // COUNTRY: Norway
    'PER_18TO20_Avg':            {'N': 11035,   'Dist': {  'MostEffective': 65, 'Frustrated': 9,  'Detached': 8,  'LeastEffective': 18} },    // COUNTRY: Peru
    'PHL_18TO20_Avg':            {'N': 17870,   'Dist': {  'MostEffective': 68, 'Frustrated': 6,  'Detached': 12, 'LeastEffective': 15} },    // COUNTRY: Philippines
    'POL_18TO20_Avg':            {'N': 57809,   'Dist': {  'MostEffective': 39, 'Frustrated': 7,  'Detached': 20, 'LeastEffective': 35} },    // COUNTRY: Poland
    'PRT_18TO20_Avg':            {'N': 26630,   'Dist': {  'MostEffective': 42, 'Frustrated': 11, 'Detached': 12, 'LeastEffective': 34} },    // COUNTRY: Portugal
    'QAT_18TO20_Avg':            {'N': 4349,    'Dist': {  'MostEffective': 66, 'Frustrated': 8,  'Detached': 13, 'LeastEffective': 13} },    // COUNTRY: Qatar
    'ROU_18TO20_Avg':            {'N': 38489,   'Dist': {  'MostEffective': 53, 'Frustrated': 7,  'Detached': 15, 'LeastEffective': 25} },    // COUNTRY: Romania
    'RUS_18TO20_Avg':            {'N': 136344,  'Dist': {  'MostEffective': 54, 'Frustrated': 9,  'Detached': 16, 'LeastEffective': 21} },    // COUNTRY: Russian Federation
    'SAU_18TO20_Avg':            {'N': 37440,   'Dist': {  'MostEffective': 55, 'Frustrated': 10, 'Detached': 12, 'LeastEffective': 23} },    // COUNTRY: Saudi Arabia
    'SRB_18TO20_Avg':            {'N': 4670,    'Dist': {  'MostEffective': 52, 'Frustrated': 8,  'Detached': 13, 'LeastEffective': 26} },    // COUNTRY: Serbia
    'SGP_18TO20_Avg':            {'N': 12269,   'Dist': {  'MostEffective': 50, 'Frustrated': 7,  'Detached': 15, 'LeastEffective': 28} },    // COUNTRY: Singapore
    'SVK_18TO20_Avg':            {'N': 8538, '   Dist': {  'MostEffective': 41, 'Frustrated': 8,  'Detached': 22, 'LeastEffective': 29} },    // COUNTRY: Slovakia
    'VNM_18TO20_Avg':            {'N': 22345,   'Dist': {  'MostEffective': 67, 'Frustrated': 7,  'Detached': 11, 'LeastEffective': 16} },    // COUNTRY: Vietnam
    'ZAF_18TO20_Avg':            {'N': 14271,   'Dist': {  'MostEffective': 53, 'Frustrated': 10, 'Detached': 11, 'LeastEffective': 26} },    // COUNTRY: South Africa
    'ESP_18TO20_Avg':            {'N': 126477,  'Dist': {  'MostEffective': 46, 'Frustrated': 14, 'Detached': 10, 'LeastEffective': 30} },    // COUNTRY: Spain
    'SWE_18TO20_Avg':            {'N': 36123,   'Dist': {  'MostEffective': 44, 'Frustrated': 11, 'Detached': 15, 'LeastEffective': 30} },    // COUNTRY: Sweden
    'CHE_18TO20_Avg':            {'N': 15352,   'Dist': {  'MostEffective': 47, 'Frustrated': 12, 'Detached': 16, 'LeastEffective': 25} },    // COUNTRY: Switzerland
    'THA_18TO20_Avg':            {'N': 38910,   'Dist': {  'MostEffective': 53, 'Frustrated': 10, 'Detached': 16, 'LeastEffective': 21} },    // COUNTRY: Thailand
    'ARE_18TO20_Avg':            {'N': 23221,   'Dist': {  'MostEffective': 64, 'Frustrated': 7,  'Detached': 12, 'LeastEffective': 17} },    // COUNTRY: United Arab Emirates
    'TUR_18TO20_Avg':            {'N': 37810,   'Dist': {  'MostEffective': 52, 'Frustrated': 13, 'Detached': 10, 'LeastEffective': 24} },    // COUNTRY: Turkey
    'UKR_18TO20_Avg':            {'N': 48553,   'Dist': {  'MostEffective': 53, 'Frustrated': 9,  'Detached': 19, 'LeastEffective': 20} },    // COUNTRY: Ukraine
    'EGY_18TO20_Avg':            {'N': 19880,   'Dist': {  'MostEffective': 50, 'Frustrated': 11, 'Detached': 12, 'LeastEffective': 28} },    // COUNTRY: Egypt
    'GBR_18TO20_Avg':            {'N': 231891,  'Dist': {  'MostEffective': 43, 'Frustrated': 11, 'Detached': 14, 'LeastEffective': 32} },    // COUNTRY: United Kingdom
    'USA_18TO20_Avg':            {'N': 506490,  'Dist': {  'MostEffective': 51, 'Frustrated': 11, 'Detached': 12, 'LeastEffective': 25} },    // COUNTRY: United States of America
    'HP_18TO20_Avg':             {'N': 229957,  'Dist': {  'MostEffective': 56, 'Frustrated': 10, 'Detached': 12, 'LeastEffective': 22} }     // TOTAL: High Performing   
  }
  /*	static var DistributionLookup = [
      	//2017-2019 norms
        ['AllCompany_18TO20_Avg',          4442345, 46, 10, 14, 30], // TOTAL: General Industry
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
        ['HP_18TO20_Avg',                     402911, 55, 11, 12, 23], // TOTAL: High Performing
        ['Mercado_Regional_2022',               9999, 40, 40, 10, 10], // Test
        ['ARE_18TO20_Avg',                      9999, 40, 40, 10, 10], // Test1
      //  ['AUS_18TO20_P90',                      9999, 40, 40, 10, 10], // Test2
        ['FIN_18TO20_P75',                      9999, 40, 40, 10, 10]  // Test3
	];*/

	/*static function GetByNormId (norm_id) {
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
	}*/
}