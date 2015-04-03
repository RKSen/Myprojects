var product = Alloy.Collections.product;
var category = Alloy.Collections.category;
$.winAddProduct.addEventListener('open', function() {
	//alert($.winAddProduct.isForAddProduct);
	if (!$.winAddProduct.isForAddProduct) {
		//alert($.winAddProduct.rowData);
		$.AddProductScrollView.bottom = '15%';
		$.productDel.visible = true;
		
		$.DateTF.value = $.winAddProduct.rowData.ProductDate;
		$.ProductTF.value = $.winAddProduct.rowData.ProductName;
		$.ProductCodeTF.value = $.winAddProduct.rowData.ProductCode;
		$.ProductCatrgoryTF.id = $.winAddProduct.rowData.CategoryID;
		
		category.fetch({
			query : {
				statement : 'SELECT CategoryName FROM Category WHERE CategoryID = ?',
				params : [$.winAddProduct.rowData.CategoryID]
			}
		}); 
		var categoryName = category.at(0).get("CategoryName");
		$.ProductCatrgoryTF.title = categoryName;
	} else {
		$.productDel.visible = false;
	}	
});

function openDatePicker(){
	$.DateTF.blur();
	var translucentView = Ti.UI.createView({
		backgroundColor : '#000',
		opacity : 0.5
	});
	$.winAddProduct.add(translucentView);
	var picker = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_DATE,
		backgroundColor : '#fff',
		width : '87%',
		borderRadius : 10
		//borderColor : ''
	});
	$.winAddProduct.add(picker);
	var okBtn = Ti.UI.createButton({
		bottom:'5%',	
		backgroundColor:'#ffffff',
		borderRadius:10,
		color:'#800000',
		width:'30%',
		title : 'Ok',
	});
	$.winAddProduct.add(okBtn);
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
		$.DateTF.value = " "+fdate;
		$.winAddProduct.remove(translucentView);
		$.winAddProduct.remove(picker);
		$.winAddProduct.remove(okBtn);
	});
}
function onClickCancelBtn(){
	$.DateTF.value = "";
	$.ProductTF.value = "";
	$.ProductCodeTF.value = "";
	$.ProductCatrgoryTF.value = "";
}
function onClickAddBtn(){
	if($.DateTF.value == null || $.DateTF.value.trim().length == 0){
		alert('Please select Date.');
		return;
	}
	if($.ProductTF.value == null || $.ProductTF.value.trim().length == 0){
		alert('Please enter Product Name.');
		return;
	}
	if($.ProductCodeTF.value == null || $.ProductCodeTF.value.trim().length == 0){
		alert('Please enter Product Code.');
		return;
	}
	if($.ProductCatrgoryTF.title == null || $.ProductCatrgoryTF.title.trim().length == 0){
		alert('Please enter Product Category.');
		return;
	}
	
	var productDict = {
		ProductName	    : $.ProductTF.value,
        ProductCode		: $.ProductCodeTF.value,
        StoredLocation	: "",
        ProductImage	: "",
        CategoryID		: $.ProductCatrgoryTF.id,
        ProductDate		: $.DateTF.value,
        IsActive		: true
	};

	if (!$.winAddProduct.isForAddProduct) {
		productDict.ProductID = $.winAddProduct.rowData.ProductID;
	}

	var model = Alloy.createModel('Product', productDict);
	model.save();
	$.winAddProduct.close();
	product.fetch();
}
function onBackBTNClick(){
	Alloy.Globals.navgroup.closeWindow($.winAddProduct);
}

function productDelListener(){
	alert('Delete Product');
}
function selectCategoryListener(){
	category.fetch();
	$.catPicker.visible = true;
}
function categorySelListener(e){
	$.catPicker.visible = false;
	$.ProductCatrgoryTF.title = e.row.model.CategoryName;
	$.ProductCatrgoryTF.id = e.row.model.CategoryID;
}
