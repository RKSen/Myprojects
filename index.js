Alloy.Globals.navgroup = $.winhome;
function openClientWindow(e) {
    var winClient = Alloy.createController('client').getView();
    $.winhome.openWindow(winClient);
}

function openCategoryWindow(e) {
    var winCategory = Alloy.createController('category').getView();
    $.winhome.openWindow(winCategory);
}

function openProductWindow(e) {
    var winProduct = Alloy.createController('product').getView();
    $.winhome.openWindow(winProduct);
}

function openTransactionWindow(e) {
    var winTransaction = Alloy.createController('transaction').getView();
    $.winhome.openWindow(winTransaction);
}

function openSettingsPopup(e){
    var popupWin = Ti.UI.createWindow({
        backgroundColor : 'white',
        opacity            : 0.9,
        fullscreen        : true,
        id                : 'popupWin'
    });

    //View that used to show the msg
    var popupView = Ti.UI.createView({
        width    : '80%',
        height    : '30%',
        backgroundColor : '#800000',
        borderRadius : 10,    
        top:'10%'
    });

    var tableData = [ {title: 'Settings',color:'#ffffff',selectedBackgroundColor:"#808080", leftImage:"/images/settings.png"}, 
                      {title: 'Reports',color:'#ffffff',selectedBackgroundColor:"#808080", leftImage:"/images/reports.png"}, 
                      {title: 'About us',color:'#ffffff',selectedBackgroundColor:"#808080", leftImage:"/images/infoBtn.png"} ];

    var table = Ti.UI.createTableView({
      data: tableData,
      backgroundColor:'#800000'
    });
    //A message label is added to the view
    popupView.add(table       
    );
    popupWin.add(popupView);
    popupWin.add(popupView);
    
    table.addEventListener('click', function(e){
        if(e.index == 0){
            //Settings
            var winSettings = Alloy.createController('settings').getView();
            popupWin.close();
            $.winhome.openWindow(winSettings);
        }else if(e.index == 1){
            //Reports
        }else if(e.index == 2){
            //About us
        }
    });
    //Event to close the popup window
    popupWin.addEventListener('click', function(e){
        if(e.source.id != null){
            popupWin.close();
        }
    });
   popupWin.open();
};
        
    
$.winhome.open();
