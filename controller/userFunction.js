module.exports = function(query) {

    this.findUserByEmail = function(userData, callbackCall) {
        var responceData = new (require('../models/responseModel.js'))();
        query.query('SELECT * FROM user WHERE email="'+userData.email+'"',function(responseData){
            if(responseData.response.length==0){
                responseData.isSuccess=0;
            }else if(responseData.response.length==1){
                responseData.response=responseData.response[0];
            }else{
                responseData.isSuccess=0;
                responseData.message="Duplicate Data in DB";
            }
            callbackCall(responseData);
        })
    };
    
    this.findUserByMob = function(userData, callbackCall) {
        var responceData = new (require('../models/responseModel.js'))();
        query.query('SELECT * FROM user WHERE mobile="'+userData.mobile+'"',function(responseData){
            if(responseData.response.length==0){
                responseData.isSuccess=0;
            }else if(responseData.response.length==1){
                responseData.response=responseData.response[0];
            }else{
                responseData.isSuccess=0;
                responseData.message="Duplicate Data in DB";
            }
            callbackCall(responseData);
        })
    };

}    