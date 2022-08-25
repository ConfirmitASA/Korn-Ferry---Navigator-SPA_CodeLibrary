class StyleUtil {

  static function GetRtlCss() {
  	return '<style>' +
       '* {direction: rtl}' +
       '.indenter {transform: rotateY(180deg);}' +
       '.logo, .menu {float: right}' +
       '#menuitem-LogOut {left: 20px; right: unset !important}' +
       //'.background-area {left: -400px; top: -200px;}' +
       '.sidebyside {margin-right: 30vw; margin-left: unset !important}' +
       '.rightside {border-right: 1px solid #606967; border-left: unset !important}' +
       '.boxtext_header, .boxtext, .actioncontainer {text-align: right}' +
         
        '.panes-background {background: linear-gradient(to right, #f0f0f0 0px, #f0f0f0 calc(100vw - 440px), #fff calc(100vw - 440px))}' +
        '.hierarchy {left: 20px; right: unset;}' +
        '.right-pane {right: 440px; left: unset;}' +
        '.left-pane {right: 60px;}' +
        '.left-pane-content {overflow: visible; padding-right: 0}' +
        '.collapse-button {left: calc(100vw - 435px);}' +
        '.collapsed-mode-button { right: 1px !important; left: unset !important}' +    
        '.collapsed-mode-right {right: 20px !important; left; unset !important}' +
        '.submenuitem {padding: 15px 0px 0px 30px;}' +
        //'.text-cell {text-align: right !important}' +
        '.enps-trend-arrow {transform: scaleX(-1);}' +
        '.loader {left: 140px; right: unset !important}' +
        '#items-table-opencomments_filter{float: left; margin-top: 20px;}' + 
        '.details-exit{left: 20px; right: unset !important}' +
        '.button-report-ready {float: left}' +
        '.funfact-title {padding-right: unset !important; padding-left: 80px;}' +
        '.action-red {right: unset !important; left: 20px;}' +
		'.filtersummary {background-position: calc(100% - 20px) 20px;}' +
        '.button-report-loaded {right: unset !important; left: 2vw;}' +
        '.content {padding: 1vw 6vw 1vw 40vw;}' +
        '.vs_score, .vs_label { text-align: left };' +
        '.vs_label {font-size: 14px}, .score_label{font-size:16px}' +
        '.amber-arrow {transform: scaleX(-1);}' +
        '.metriclabel_back {left: -8%;}' +
        '.card-details-container {right: 390px; left: unset !important}' +
        '.bolded {font-size: larger}' +
        '.background-area { background: linear-gradient(80deg, rgba(4, 73, 59, 1) 78vw, rgba(0, 0, 0, 0.65) 78vw);}' +
        '.language-selector { margin-left: 20px; margin-right: unset !important}' +
        '#home-footer {margin-left: unset !important; margin-right: 30vw;}' +

         // Menu system
        '.menuitems{width: 100vw;}' +
        '@media screen and (max-width: 1400px) {' +
            '.menu.responsive .menuicon {right: 20px; left: unset !important; text-align: start; }' +
			'.menu.responsive .menuitem {text-align: start !important; }' +
			'#menuitem-LogOut { left: -20px; right: unset !important; position: relative !important;}' +
            '.menu.responsive { padding: 10px 0px 0px 0px; right: -23px; }' +
		'}' +
          
        // Effectiveness Profile Quadrant
        '#arrow-x { transform: scaleX(-1) }' +      
        '.icon-vertical {left: 256px;}' +
        '.axislabely {top: 10px;}' + 
          
        '.trend-indicator-description div:nth-child(1) { left: 200px; }' +
        '.trend-indicator-description div:nth-child(2) { left: 232px; }' +
          
        '.flip-icon {right: unset; left: 0}' +
          
            // hierarchy component rtl
        '.dd-search-input { text-align: start; padding: 10px; }' +
        '.reportal-clearfix { display: flex; flex-direction: row; }' +
        '.dd-header li a { background: none; position: relative; padding: 1px 10px 1px 15px;}' +
        '.dd-header li a:before { content: " "; position: absolute; background: url(/cf_clientutil/images/drilldown/arrow_gray_right.gif) no-repeat 100%; width: 16px; height: 16px; line-height: 16px; transform: rotate(180deg); left: 0px; }' +
        '.dd-item-text { padding: 8px 10px 8px 10px; display: block; text-align: start; }' +
        '.dd-parent-a .dd-expand { border: none; position: unset; }' +
        '.dd-expand-icon { left: -45%; transform: rotate(180deg); }' +
        '.dd-parent-a > .dd-item-text { width: 100%; border-left: 1px solid #ccc;}' +
        '.dd-parent-a { display: flex !important; flex-direction: row; }' +
        '.dd-parent-a:hover { background-color: #efefef; }' +
        '.dd-item-text:hover { background-color: #efefef; }' +
          
       '</style>';
  }


}