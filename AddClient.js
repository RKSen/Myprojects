var client = Alloy.Collections.client;

$.addClientWin.addEventListener('open', function() {
	//alert($.addClientWin.isForAddClient);
	if (!$.addClientWin.isForAddClient) {
		//alert('show client');
		//alert($.addClientWin.rowData);
		$.containerView.bottom = '15%';
		$.clientDel.visible = true;
		$.nameField.value = $.addClientWin.rowData.ClientName;
		$.comNameField.value = $.addClientWin.rowData.CompanyName;
		$.numField.value = $.addClientWin.rowData.ClientMobile;
		$.phoneField.value = $.addClientWin.rowData.PhoneNumber;
		$.emailField.value = $.addClientWin.rowData.ClientEmail;
		$.streetField.value = $.addClientWin.rowData.Street;
		$.cityField.value = $.addClientWin.rowData.City;
		$.countryField.value = $.addClientWin.rowData.Country;
	} else {
		$.clientDel.visible = false;
	}
});

function clientDelListener() {

	var sql = "DELETE FROM ClientDetail WHERE ClientID=" + $.addClientWin.rowData.ClientID;
	var db = Ti.Database.open("InventoryDB");
	db.execute(sql);
	db.close();
	$.addClientWin.close();
	client.fetch();
}

function btnSaveListener() {
	if ($.nameField.value == null || $.nameField.value.trim().length == 0) {
		alert('Please enter Client Name.');
		return;
	}
	if ($.comNameField.value == null || $.comNameField.value.trim().length == 0) {
		alert('Please enter Company Name.');
		return;
	}
	if ($.numField.value == null || $.numField.value.trim().length == 0) {
		alert('Please enter Mobile Number.');
		return;
	}
	if ($.numField.value.length != "") {
		if ($.numField.value.length != 12) {
			alert('Please enter valid mobile number.');
			return;
		}
	}
	if (!validateEmail($.emailField.value)) {
		alert('Please enter valid email format.');
		return;
	}
	var clientDataDict = {
		ClientName : $.nameField.value,
		ClientMobile : $.numField.value,
		ClientEmail : $.emailField.value,
		CompanyName : $.comNameField.value,
		ClientType : "",
		City : $.cityField.value,
		Country : $.countryField.value,
		Street : $.streetField.value,
		StdCode : "",
		PhoneNumber : $.phoneField.value,
		IsActive : true
	};

	if (!$.addClientWin.isForAddClient) {
		clientDataDict.ClientID = $.addClientWin.rowData.ClientID;
	}

	var model = Alloy.createModel('ClientDetail', clientDataDict);
	model.save();
	$.addClientWin.close();
	client.fetch();
}

$.numField.addEventListener('change', function() {
	Mask.mask($.numField, Mask.phone);
});

function validateEmail(email) {
	var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([	-.]\w+)*\.\w+([-.]\w+)*$/);
	if (reg.test(email)) {
		return true;
	} else {
		return false;
	}
}

Mask = {
	mask : function(_field, _function) {
		_field.value = _function(_field.value);
	},

	postcode : function(v) {
		v = v.replace(/D/g, "");
		v = v.replace(/^(\d{5})(\d)/, "$1-$2");
		return v.slice(0, 9);
	},

	phone : function(v) {
		v = v.replace(/\D/g, "");
		v = v.replace(/^(\d\d\d)(\d)/g, "$1-$2");
		v = v.replace(/(\d{3})(\d)/, "$1-$2");
		return v.slice(0, 12);
	}
};

function addClientBackListener() {
	Alloy.Globals.navgroup.closeWindow($.addClientWin);
}
