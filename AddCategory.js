var category = Alloy.Collections.category;
function openDatePicker(){
	$.DateTF.blur();
	var translucentView = Ti.UI.createView({
		backgroundColor : '#000',
		opacity : 0.5
	});
	$.winAddcategory.add(translucentView);
	var picker = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_DATE,
		backgroundColor : '#fff',
		width : '87%',
		borderRadius : 10
		//borderColor : ''
	});
	$.winAddcategory.add(picker);
	var okBtn = Ti.UI.createButton({
		bottom:'5%',	
		backgroundColor:'#ffffff',
		borderRadius:10,
		color:'#800000',
		width:'30%',
		title : 'Ok',
	});
	$.winAddcategory.add(okBtn);
	var fdate;
	okBtn.addEventListener('click', function(e){
		var dateValue = picker.value.toDateString();
		//alert(dateValue);
		var dateNew = dateValue.split(" ",5);
		var dateSplitted = dateValue.substring(0,11);
		var DateNewSplit = dateSplitted.split(" ",2);
		var month=DateNewSplit[1];
 		var year=dateNew[3];
 		var day=dateNew[2];
 		fdate = month+'-'+day+'-'+year;
		$.DateTF.value = ""+fdate;
		$.winAddcategory.remove(translucentView);
		$.winAddcategory.remove(picker);
		$.winAddcategory.remove(okBtn);
	});
}
function onClickCancelBtn(){
	$.DateTF.value = "";
	$.CategoryTF.value = "";
	$.DescriptionTF.value = "";
}
function onClickAddBtn(){
	if($.DateTF.value == null || $.DateTF.value.trim().length == 0){
		alert('Please select Date.');
		return;
	}
	if($.CategoryTF.value == null || $.CategoryTF.value.trim().length == 0){
		alert('Please enter category Name.');
		return;
	}
	if($.DescriptionTA.value == null || $.DescriptionTA.value.trim().length == 0){
		alert('Please enter Description.');
		return;
	}
	
	/*var TBLRow = Ti.UI.createTableViewRow({
		height : '40dp',
		layout : 'horizontal'
	});
	var LBLDate = Ti.UI.createLabel({
		left: '5dp',
		width : '100dp',
		height : '30dp',
		color : '#000',
		text : '2014-1-22'
	});
	TBLRow.add(LBLDate);
	var LBLCategory = Ti.UI.createLabel({
		left: '5dp',
		width : '100dp',
		height : '30dp',
		color : '#000',
		text : 'Category'
	});
	TBLRow.add(LBLCategory);
	var LBLDescription = Ti.UI.createLabel({
		left: '5dp',
		width : '100dp',
		height : '30dp',
		color : '#000',
		text : 'DEscription jffdb jbcj jfb'
	});
	TBLRow.add(LBLDescription);
	*/
	
	var categoryDataDict = {
		CategoryName : $.CategoryTF.value,
		CategoryDate : $.DateTF.value,
		CategoryDescription : $.DescriptionTA.value
	};

	if (!$.winAddcategory.isForAddCategory) {
		categoryDataDict.CategoryID = $.winAddcategory.rowData.CategoryID;
	}

	var model = Alloy.createModel('Category', categoryDataDict);
	model.save();
	$.winAddcategory.close();
	category.fetch();
}
function onBackBTNClick(){
	Alloy.Globals.navgroup.closeWindow($.winAddcategory);
}
function categoryDelListener() {

	var sql = "DELETE FROM Category WHERE CategoryID=" + $.winAddcategory.rowData.CategoryID;
	var db = Ti.Database.open("InventoryDB");
	db.execute(sql);
	db.close();
	$.winAddcategory.close();
	category.fetch();
}


$.winAddcategory.addEventListener('open', function() {
	if (!$.winAddcategory.isForAddCategory) {
		$.AddCategoryView.bottom = '15%';
		$.categoryDel.visible = true;
		$.CategoryTF.value = $.winAddcategory.rowData.CategoryName;
		$.DateTF.value = $.winAddcategory.rowData.CategoryDate;
		$.DescriptionTA.value = $.winAddcategory.rowData.CategoryDescription;
		
	} else {
		$.categoryDel.visible = false;
	}
});

