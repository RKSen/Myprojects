exports.definition = {
	config: {
		 columns : {
            "ClientID"			  : "INTEGER PRIMARY KEY AUTOINCREMENT",
            "ClientName"   		  : "TEXT",
            "ClientMobile"		  : "NUMBER",
            "ClientEmail"		  : "TEXT",
            "CompanyName"		  : "TEXT",
            "ClientType"		  : "TEXT",
            "City"				  : "TEXT",
            "Country"			  : "TEXT",
            "Street" 			  : "TEXT",
            "StdCode"			  : "NUMBER",
            "PhoneNumber" 		  : "NUMBER", 
            "IsActive"			  : "BOOL"	
        },
		adapter: {
			type: "sql",
			db_file: "/dbs/InventoryDB.sqlite",
			collection_name: "ClientDetail",
			idAttribute : "ClientID"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};
