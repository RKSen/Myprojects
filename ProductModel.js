exports.definition = {
	config: {
		 columns : {
            "ProductID"		: "INTEGER PRIMARY KEY AUTOINCREMENT",
            "ProductName"   : "TEXT",
            "ProductCode"	: "DATE",
            "StoredLocation": "TEXT",
            "ProductImage"	: "BLOB",
            "CategoryID"	: "TEXT",
            "ProductDate"	: "DATE",
            "IsActive"		: "BOOL"
        },
		adapter: {
			type: "sql",
			db_file: "/dbs/InventoryDB.sqlite",
			collection_name: "Product",
			idAttribute : "ProductID"
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
