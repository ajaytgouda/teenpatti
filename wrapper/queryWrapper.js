module.exports = function(mysql) {

    this.pool = mysql.createPool({
        connectionLimit: 1000, //important
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'teenpatti',
        debug: false
    });

    this.dbHandler = function(query, callback) {
        var responseData = {};
        responseData['isSuccess'] = 0;
        responseData['message'] = "";
        responseData['response'] = null;
        this.pool.getConnection(function(err, connection) {
            if (err) {
                responseData['isSuccess'] = 0;
                responseData['message'] = err.message;
                callback(responseData)
            } else {
                //console.log('connected as id ' + connection.threadId);
                connection.query(query, function(err, rows) {
                    connection.release();
                    if (err) {
                        responseData['isSuccess'] = 0;
                        responseData['message'] = err.message;
                        callback(responseData)
                    } else {
                        responseData['isSuccess'] = 1;
                        responseData['message'] = "Success";
                        responseData['response'] = rows;
                        callback(responseData)
                    }
                });
                connection.on('error', function(err) {
                    responseData['isSuccess'] = 0;
                    responseData['message'] = err.message;
                    callback(responseData)
                });
            }
        });
    };

    this.query = function(query, callback) {
        this.dbHandler(query, function(responseData) {
            callback(responseData);
        });
    };

    this.insert = function(table, insertData, callback) {
        var keys = Object.keys(insertData);
        var keyValue = "";
        var insertItem = "";
        for (var i = 0; i < keys.length; i++) {
            keyValue = keyValue + keys[i] + ",";
            if (typeof insertData[keys[i]] === 'string') {
                insertItem = insertItem + "'" + insertData[keys[i]] + "'" + ",";
            } else {
                insertItem = insertItem + insertData[keys[i]] + ",";
            }

        }
        if (keyValue.charAt(keyValue.length - 1) == ',') {
            keyValue = keyValue.substr(0, keyValue.length - 1);
        }
        if (insertItem.charAt(insertItem.length - 1) == ',') {
            insertItem = insertItem.substr(0, insertItem.length - 1);
        }
        this.dbHandler("INSERT INTO " + table + " (" + keyValue + ") VALUES (" + insertItem + ")", function(responseData) {
            callback(responseData);
        });
    };

    this.updateQuery = function(table, updateData, whereData, callback) {
        var keys = Object.keys(updateData);
        var updateString = "";
        for (var i = 0; i < keys.length; i++) {
            if (typeof updateData[keys[i]] === 'string') {
                updateString = updateString + keys[i] + "='" + updateData[keys[i]] + "',";
            } else {
                updateString = updateString + keys[i] + "=" + updateData[keys[i]] + ",";
            }
        }
        if (updateString.charAt(updateString.length - 1) == ',') {
            updateString = updateString.substr(0, updateString.length - 1);
        }

        var keys = Object.keys(whereData);
        var whereString = "";
        for (var i = 0; i < keys.length; i++) {
            if (typeof whereData[keys[i]] === 'string') {
                whereString = whereString + keys[i] + "='" + whereData[keys[i]] + "' AND ";
            } else {
                whereString = whereString + keys[i] + "=" + whereData[keys[i]] + " AND ";
            }
        }
        var checkValue = whereString.substr((whereString.length - 5), whereString.length)
        if (checkValue == ' AND ') {
            whereString = whereString.substr(0, whereString.length - 5);
        }
        this.dbHandler("UPDATE " + table + " SET " + updateString + " WHERE " + whereString, function(responseData) {
            callback(responseData);
        });
    };

}