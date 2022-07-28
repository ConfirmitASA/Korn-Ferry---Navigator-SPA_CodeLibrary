/*
Codelibrary_Script.GlobalObjects
Purpose/Description: 
Last updated by: Sumit 
Last updated on: 14/10/2020
*/
class GlobalObjects {

  static var Log;
  static var Confirmit;
  //static var Report;
  static var Project; // pointer to ds0
  static var HierarchyMap;
  static var TrendCodes; // array
  
  static function GetHierarchyMap ( report, pageContext ) {
    if ( GlobalObjects.HierarchyMap == null )
      GlobalObjects.HierarchyMap = HierarchyUtil.Map(report, 'calc:hier', pageContext);

	return GlobalObjects.HierarchyMap;  
  }
  
  static function Set ( pageContext, confirmit, log ) {
    var report = pageContext.Items['Report'];
	Log = log;
	Confirmit = confirmit;
    Project = report.DataSource.GetProject( 'ds0' );
  }
  
//  static function SetReport ( report ) {
//	Report = report;
//  }
  
  
  static function SetConfirmit ( confirmit ) {
  	Confirmit = confirmit;	
  }
  
  static function SetLogger ( log ) {
  	Log = log;	
  }
}