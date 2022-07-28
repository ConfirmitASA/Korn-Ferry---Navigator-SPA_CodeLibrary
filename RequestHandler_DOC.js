/*
Example query object: 

var query = {

  Filters: [
    'Gender.410', 'Gender.420',
    'Age.651', 
    'Tenure.701'
  ],
  
  Comparators: {
    Benchmarks: [ ... ],
    Historicals: [ ... ]
  },
  
  DataRequest: [
    
    // Items and Dimensions
    { Type: 'ItemsAndDimensions.Overall'},
    
    // Comments
    { Type: 'Comment', Ids: ['Comm1'] },
    
    // ENPS
    { Type: 'ENPS.Overall' },
    { Type: 'ENPS.BreakBy', BreakBy: ['Age', 'Gender'] },
    
    // Effectiveness
    { Type: 'EffectivenessProfile.Overall'  },
    { Type: 'EffectivenessProfile.BreakBy', BreakBy: ['Gender'] },
    
    // Response Rate
    { Item: 'ResponseRate.Overall' }
  
  ]
}
*/