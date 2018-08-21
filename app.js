var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var fs = require('fs');
var multer = require('multer');
// dt.format('m/d/Y H:M:S');

var upload = multer({
    dest: __dirname + '/files/Images/'
});
var port = process.env.PORT || 9698;
var onlineUsers = [];

var bronzeTables=[];
var silverTables=[];
var goldTables=[];

var table = new (require('./models/tableModel.js'))();
table['tableId']="BRONZE_1";
table['tableName']="BRONZE";
table['minBetCost']=5;
table['maxTableCost']=1000;
table['tableOfflineFor']=Date.now();
bronzeTables.push(table);
var table2 = new (require('./models/tableModel.js'))();
table2['tableId']="BRONZE_2";
table2['tableName']="BRONZE";
table2['minBetCost']=5;
table2['maxTableCost']=1000;
table2['tableOfflineFor']=Date.now();
bronzeTables.push(table2);
var table3 = new (require('./models/tableModel.js'))();
table3['tableId']="SILVER_1";
table3['tableName']="SILVER";
table3['minBetCost']=10;
table3['maxTableCost']=5000;
table3['tableOfflineFor']=Date.now();
silverTables.push(table3);
var table4 = new (require('./models/tableModel.js'))();
table4['tableId']="SILVER_2";
table4['tableName']="SILVER";
table4['minBetCost']=10;
table4['maxTableCost']=5000;
table4['tableOfflineFor']=Date.now();
silverTables.push(table4);
var table5 = new (require('./models/tableModel.js'))();
table5['tableId']="GOLD_1";
table5['tableName']="GOLD";
table5['minBetCost']=15;
table5['maxTableCost']=10000;
table5['tableOfflineFor']=Date.now();
goldTables.push(table5);
var table6 = new (require('./models/tableModel.js'))();
table6['tableId']="GOLD_2";
table6['tableName']="GOLD";
table6['minBetCost']=15;
table6['maxTableCost']=10000;
table6['tableOfflineFor']=Date.now();
goldTables.push(table6);




var query = new(require('./wrapper/queryWrapper.js'))(mysql);
var userController = new(require('./controller/userFunction.js'))(query);
var commonFunction = new(require('./controller/commonFunction.js'))();
require('./config')(app);

//require('./controllers/menuController')(app,query);
//require('./controllers/tableController')(app,query);

// query.query("INSERT INTO `credit_debit` (`user_id`, `type`, `amount`, `comment`, `table_id`, `time`) VALUES ("+table.playerNo.id+", '1', "+twiceValue+", 'CHAL', "+table.tableId+", "+Date.now()+")",function(resultData){
//     return table;
// })

app.get('/', function(req, res) {
    res.render('index');
});

// Finds the item in online users array by value
var findItemCounter = function(byQuery, value) {
    var isPresent = undefined;
    for (var i = 0; i < onlineUsers.length; i++) {
        if (onlineUsers[i][byQuery] == value) {
            isPresent = i;
            break;
        }
    }
    return isPresent;
}
//  Service call with google map

var resetTable =function(tableType,tableNo){
    switch(tableType){
        case "BRONZE":
            bronzeTables[tableNo]['tableActive']=false;
            bronzeTables[tableNo]['tableActive']=false;
            bronzeTables[tableNo]['minBetCost']=5;
            bronzeTables[tableNo]['maxTableCost']=1000;
            bronzeTables[tableNo]['tableOfflineFor']=Date.now();
            if(bronzeTables[tableNo]['firstUser']!=undefined){
                bronzeTables[tableNo]['firstUser']['cardStatus']="";
                bronzeTables[tableNo]['firstUser']['status']="ONLINE";
                bronzeTables[tableNo]['firstUser']['cards']=[];
            }
            if(bronzeTables[tableNo]['secondUser']!=undefined){
                bronzeTables[tableNo]['secondUser']['cardStatus']="";
                bronzeTables[tableNo]['secondUser']['status']="ONLINE";
                bronzeTables[tableNo]['secondUser']['cards']=[];
            }
            if(bronzeTables[tableNo]['thirdUser']!=undefined){
                bronzeTables[tableNo]['thirdUser']['cardStatus']="";
                bronzeTables[tableNo]['thirdUser']['status']="ONLINE";
                bronzeTables[tableNo]['thirdUser']['cards']=[];
            }
            if(bronzeTables[tableNo]['fourthUser']!=undefined){
                bronzeTables[tableNo]['fourthUser']['cardStatus']="";
                bronzeTables[tableNo]['fourthUser']['status']="ONLINE";
                bronzeTables[tableNo]['fourthUser']['cards']=[];
            }
            if(bronzeTables[tableNo]['fifthUser']!=undefined){
                bronzeTables[tableNo]['fifthUser']['cardStatus']="";
                bronzeTables[tableNo]['fifthUser']['status']="ONLINE";
                bronzeTables[tableNo]['fifthUser']['cards']=[];
            }
        break;
        case "SILVER":
            silverTables[tableNo]['tableActive']=false;
            silverTables[tableNo]['tableActive']=false;
            silverTables[tableNo]['minBetCost']=10;
            silverTables[tableNo]['maxTableCost']=5000;
            silverTables[tableNo]['tableOfflineFor']=Date.now();
            if(silverTables[tableNo]['firstUser']!=undefined){
                silverTables[tableNo]['firstUser']['cardStatus']="";
                silverTables[tableNo]['firstUser']['status']="ONLINE";
                silverTables[tableNo]['firstUser']['cards']=[];
            }
            if(silverTables[tableNo]['secondUser']!=undefined){
                silverTables[tableNo]['secondUser']['cardStatus']="";
                silverTables[tableNo]['secondUser']['status']="ONLINE";
                silverTables[tableNo]['secondUser']['cards']=[];
            }
            if(silverTables[tableNo]['thirdUser']!=undefined){
                silverTables[tableNo]['thirdUser']['cardStatus']="";
                silverTables[tableNo]['thirdUser']['status']="ONLINE";
                silverTables[tableNo]['thirdUser']['cards']=[];
            }
            if(silverTables[tableNo]['fourthUser']!=undefined){
                silverTables[tableNo]['fourthUser']['cardStatus']="";
                silverTables[tableNo]['fourthUser']['status']="ONLINE";
                silverTables[tableNo]['fourthUser']['cards']=[];
            }
            if(silverTables[tableNo]['fifthUser']!=undefined){
                silverTables[tableNo]['fifthUser']['cardStatus']="";
                silverTables[tableNo]['fifthUser']['status']="ONLINE";
                silverTables[tableNo]['fifthUser']['cards']=[];
            }
        break;
        case "GOLD":
            goldTables[tableNo]['tableActive']=false;
            goldTables[tableNo]['tableActive']=false;
            goldTables[tableNo]['minBetCost']=15;
            goldTables[tableNo]['maxTableCost']=10000;
            goldTables[tableNo]['tableOfflineFor']=Date.now();
            if(goldTables[tableNo]['firstUser']!=undefined){
                goldTables[tableNo]['firstUser']['cardStatus']="";
                goldTables[tableNo]['firstUser']['status']="ONLINE";
                goldTables[tableNo]['firstUser']['cards']=[];
            }
            if(goldTables[tableNo]['secondUser']!=undefined){
                goldTables[tableNo]['secondUser']['cardStatus']="";
                goldTables[tableNo]['secondUser']['status']="ONLINE";
                goldTables[tableNo]['secondUser']['cards']=[];
            }
            if(goldTables[tableNo]['thirdUser']!=undefined){
                goldTables[tableNo]['thirdUser']['cardStatus']="";
                goldTables[tableNo]['thirdUser']['status']="ONLINE";
                goldTables[tableNo]['thirdUser']['cards']=[];
            }
            if(goldTables[tableNo]['fourthUser']!=undefined){
                goldTables[tableNo]['fourthUser']['cardStatus']="";
                goldTables[tableNo]['fourthUser']['status']="ONLINE";
                goldTables[tableNo]['fourthUser']['cards']=[];
            }
            if(goldTables[tableNo]['fifthUser']!=undefined){
                goldTables[tableNo]['fifthUser']['cardStatus']="";
                goldTables[tableNo]['fifthUser']['status']="ONLINE";
                goldTables[tableNo]['fifthUser']['cards']=[];
            }
        break;
    }
}

var sentToZeroCommonCode=function(table,tableIndex,tableType){
    var winnerCard=commonFunction.removeUsersFromTable(io,table);
    if(winnerCard!=undefined && winnerCard.hasOwnProperty("id") && winnerCard.id!=undefined){
        commonFunction.sendToastToPlayers(io,table,table[winnerCard.id]['name']+" wins the game by "+winnerCard.typeName );
        table[winnerCard.id]['points']=table[winnerCard.id]['points']+table['currentTableCost'];
        query.query("INSERT INTO `credit_debit` (`user_id`, `type`, `amount`, `comment`, `table_id`, `time`) VALUES ("+table[winnerCard.id]['id']+", '0', "+table['currentTableCost']+", 'WINNING AMOUNT', '"+table.tableId+"', "+Date.now()+")",function(resultData){
            console.log("Entry of winner done");
        })
        table['currentTableCost']=0;
    }
    commonFunction.informTableMember(io,table,true,function(returnData){
        resetTable(tableType,tableIndex);
    })
}

var disconnectCommon=function(value,callBack){
    var returnItem={};
    returnItem['item']=onlineUsers[value]['id'];
    if(onlineUsers[value].hasOwnProperty('table')){
        if(onlineUsers[value]['table']['TABLETYPE']=="BRONZE"){
            if(bronzeTables[onlineUsers[value]['table']['tableNo']].userTurn.userId==onlineUsers[value]['table']['seat']){
                commonFunction.clietSideTableMapper(io,bronzeTables[onlineUsers[value]['table']['tableNo']],
                onlineUsers[value]['table']['seat'],false);
                commonFunction.nextTurnHandler(io,bronzeTables[onlineUsers[value]['table']['tableNo']],function(sentTo){
                    if(sentTo=="0"){
                        sentToZeroCommonCode(bronzeTables[onlineUsers[value]['table']['tableNo']],onlineUsers[value]['table']['tableNo'],"BRONZE");
                    }else{
                        bronzeTables[onlineUsers[value]['table']['tableNo']]['tableActive']=true;
                        bronzeTables[onlineUsers[value]['table']['tableNo']].userTurn['userId']=sentTo;
                        bronzeTables[onlineUsers[value]['table']['tableNo']].userTurn['lastTime']=Date.now();
                        console.log("AJ. On chall: "+JSON.stringify(bronzeTables[onlineUsers[value]['table']['tableNo']]))
                    }
                });
            }
            returnItem['costLeft']=bronzeTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['points'];
            bronzeTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]=undefined;
            commonFunction.informTableMember(io,bronzeTables[onlineUsers[value]['table']['tableNo']],false,function(dataValue){
                console.log("AJ."+onlineUsers[value]['name']+" left Bronnze table: "+JSON.stringify(dataValue));
            })
            
        }else if(onlineUsers[value]['table']['TABLETYPE']=="SILVER"){
            if(silverTables[onlineUsers[value]['table']['tableNo']].userTurn.userId==onlineUsers[value]['table']['seat']){
                commonFunction.clietSideTableMapper(io,silverTables[onlineUsers[value]['table']['tableNo']],
                onlineUsers[value]['table']['seat'],false);
                commonFunction.nextTurnHandler(io,silverTables[onlineUsers[value]['table']['tableNo']],function(sentTo){
                    if(sentTo=="0"){
                        sentToZeroCommonCode(silverTables[onlineUsers[value]['table']['tableNo']],onlineUsers[value]['table']['tableNo'],"SILVER");
                    }else{
                        silverTables[onlineUsers[value]['table']['tableNo']]['tableActive']=true;
                        silverTables[onlineUsers[value]['table']['tableNo']].userTurn['userId']=sentTo;
                        silverTables[onlineUsers[value]['table']['tableNo']].userTurn['lastTime']=Date.now();
                        console.log("AJ. On chall: "+JSON.stringify(silverTables[onlineUsers[value]['table']['tableNo']]))
                    }
                });
            }
            returnItem['costLeft']=silverTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['points'];
            silverTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]=undefined;
            commonFunction.informTableMember(io,silverTables[onlineUsers[value]['table']['tableNo']],false,function(dataValue){
                console.log("AJ. "+onlineUsers[value]['name']+" left Silver Table: "+JSON.stringify(dataValue));
            })
        }else if(onlineUsers[value]['table']['TABLETYPE']=="GOLD"){
            if(goldTables[onlineUsers[value]['table']['tableNo']].userTurn.userId==onlineUsers[value]['table']['seat']){
                commonFunction.clietSideTableMapper(io,goldTables[onlineUsers[value]['table']['tableNo']],
                onlineUsers[value]['table']['seat'],false);
                commonFunction.nextTurnHandler(io,goldTables[onlineUsers[value]['table']['tableNo']],function(sentTo){
                    if(sentTo=="0"){
                        sentToZeroCommonCode(goldTables[onlineUsers[value]['table']['tableNo']],onlineUsers[value]['table']['tableNo'],"GOLD");
                    }else{
                        goldTables[onlineUsers[value]['table']['tableNo']]['tableActive']=true;
                        goldTables[onlineUsers[value]['table']['tableNo']].userTurn['userId']=sentTo;
                        goldTables[onlineUsers[value]['table']['tableNo']].userTurn['lastTime']=Date.now();
                        console.log("AJ. On chall: "+JSON.stringify(goldTables[onlineUsers[value]['table']['tableNo']]))
                    }
                });
            }
            returnItem['costLeft']=goldTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['points'];
            goldTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]=undefined;
            commonFunction.informTableMember(io,goldTables[onlineUsers[value]['table']['tableNo']],false,function(dataValue){
                console.log("AJ. "+onlineUsers[value]['name']+" left Gold Table: "+JSON.stringify(dataValue));
            })
            
        }
        callBack(returnItem);
    }
}

// Handles all the socket input and output requests
io.on('connection', function(socket) {

    // To be sent to app, so that it returns the user ID of logged in user
    socket.emit('connect', socket.id);

    socket.on('joinBronze',function(data) {
        console.log("User: "+JSON.stringify(JSON.parse(data)));
        var userItem=JSON.parse(data);
        query.query("SELECT points FROM user WHERE id="+userItem.id,function(queryValue){
            if(queryValue.isSuccess==1){
                userItem.points=queryValue.response[0]['points'];
                if(userItem.points>5){
                    var counterOfUser=findItemCounter("id",userItem.id);
                    if(counterOfUser==undefined){
                        userItem['socketId']=socket.id;
                        var isSlotAvail=commonFunction.findAvailableSlot(bronzeTables);
                        if(isSlotAvail!=undefined){
                            bronzeTables[isSlotAvail['tableNo']][isSlotAvail['seat']]=userItem;
                            bronzeTables[isSlotAvail['tableNo']]['tableOfflineFor']=Date.now();
                            if(bronzeTables[isSlotAvail['tableNo']]['tableActive']){
                                bronzeTables[isSlotAvail['tableNo']][isSlotAvail['seat']]['status']="WAITING"
                            }else{
                                bronzeTables[isSlotAvail['tableNo']][isSlotAvail['seat']]['status']="ONLINE"
                            }
                            bronzeTables[isSlotAvail['tableNo']][isSlotAvail['seat']]['cards']=[];
                            bronzeTables[isSlotAvail['tableNo']][isSlotAvail['seat']]['cardStatus']=null;
                            userItem['table']=isSlotAvail;
                            userItem['table']['TABLETYPE']="BRONZE";
                            onlineUsers.push(userItem);
                            console.log("OnlineUser: "+JSON.stringify(onlineUsers));
                            commonFunction.informTableMember(io,bronzeTables[isSlotAvail['tableNo']],false,function(dataValue){
                                console.log("AJ1: "+userItem.name+" joined Bronze table. "+JSON.stringify(dataValue));
                            })
                        }else{
                            socket.emit("EXIT_GAME","Tables are full at the moment");
                        }
                    }else{
                        onlineUsers[counterOfUser]['socketId']=socket.id;
                        bronzeTables[onlineUsers[counterOfUser]['table']['tableNo']][onlineUsers[counterOfUser]['table']['seat']]['socketId']=socket.id;
                        if(bronzeTables[onlineUsers[counterOfUser]['table']['tableNo']]['tableActive']){
                            bronzeTables[onlineUsers[counterOfUser]['table']['tableNo']][onlineUsers[counterOfUser]['table']['seat']]['status']="WAITING";
                        }else{
                        bronzeTables[onlineUsers[counterOfUser]['table']['tableNo']][onlineUsers[counterOfUser]['table']['seat']]['status']="ONLINE";
                        }
                        commonFunction.informTableMember(io,bronzeTables[onlineUsers[counterOfUser]['table']['tableNo']],false,function(dataValue){
                            console.log("AJ1: "+userItem.name+" rejoined Bronze table. "+JSON.stringify(dataValue));
                        })
                    }
                    socket.emit("live","");
                }else{
                    socket.emit("EXIT_GAME","Insufficient Balance at the momment");
                }
            }
        })
    })

    socket.on('joinSilver',function(data) {
        console.log("User: "+data);
        var userItem=JSON.parse(data);
        query.query("SELECT points FROM user WHERE id="+userItem.id,function(queryValue){
            if(queryValue.isSuccess==1){
                userItem.points=queryValue.response[0]['points'];
                if(userItem.points>10){
                    var counterOfUser=findItemCounter("id",userItem.id);
                    if(counterOfUser==undefined){
                        userItem['socketId']=socket.id;
                        var isSlotAvail=commonFunction.findAvailableSlot(silverTables);
                        if(isSlotAvail!=undefined){
                            silverTables[isSlotAvail['tableNo']][isSlotAvail['seat']]=userItem;
                            silverTables[isSlotAvail['tableNo']]['tableOfflineFor']=Date.now();
                            if(silverTables[isSlotAvail['tableNo']]['tableActive']){
                                silverTables[isSlotAvail['tableNo']][isSlotAvail['seat']]['status']="WAITING"
                            }else{
                                silverTables[isSlotAvail['tableNo']][isSlotAvail['seat']]['status']="ONLINE"
                            }
                            silverTables[isSlotAvail['tableNo']][isSlotAvail['seat']]['cards']=[];
                            silverTables[isSlotAvail['tableNo']][isSlotAvail['seat']]['cardStatus']=null;
                            userItem['table']=isSlotAvail;
                            userItem['table']['TABLETYPE']="SILVER";
                            onlineUsers.push(userItem);
                            commonFunction.informTableMember(io,silverTables[isSlotAvail['tableNo']],false,function(dataValue){
                                console.log("AJ1: "+userItem.name+" joined Silver table. "+JSON.stringify(dataValue));
                            })
                        }else{
                            socket.emit("EXIT_GAME","Tables are full at the moment");
                        }
                    }else{
                        onlineUsers[counterOfUser]['socketId']=socket.id;
                        silverTables[onlineUsers[counterOfUser]['table']['tableNo']][onlineUsers[counterOfUser]['table']['seat']]['socketId']=socket.id;
                        if(silverTables[onlineUsers[counterOfUser]['table']['tableNo']]['tableActive']){
                            silverTables[onlineUsers[counterOfUser]['table']['tableNo']][onlineUsers[counterOfUser]['table']['seat']]['status']="WAITING";
                        }else{
                        silverTables[onlineUsers[counterOfUser]['table']['tableNo']][onlineUsers[counterOfUser]['table']['seat']]['status']="ONLINE";
                        }
                        commonFunction.informTableMember(io,silverTables[onlineUsers[counterOfUser]['table']['tableNo']],false,function(dataValue){
                            console.log("AJ1: "+userItem.name+" rejoined Silver table. "+JSON.stringify(dataValue));
                        })
                    }
                    socket.emit("live","");
                }else{
                    socket.emit("EXIT_GAME","Insufficient Balance at the mpoment");
                }
            }
        });
    })

    socket.on('joinGold',function(data) {
        console.log("User: "+data);
        var userItem=JSON.parse(data);
        query.query("SELECT points FROM user WHERE id="+userItem.id,function(queryValue){
            if(queryValue.isSuccess==1){
                userItem.points=queryValue.response[0]['points'];
                if(userItem.points>300){
                    var counterOfUser=findItemCounter("id",userItem.id);
                    if(counterOfUser==undefined){
                        userItem['socketId']=socket.id;
                        var isSlotAvail=commonFunction.findAvailableSlot(goldTables);
                        if(isSlotAvail!=undefined){
                            goldTables[isSlotAvail['tableNo']][isSlotAvail['seat']]=userItem;
                            goldTables[isSlotAvail['tableNo']]['tableOfflineFor']=Date.now();
                            if(goldTables[isSlotAvail['tableNo']]['tableActive']){
                                goldTables[isSlotAvail['tableNo']][isSlotAvail['seat']]['status']="WAITING"
                            }else{
                                goldTables[isSlotAvail['tableNo']][isSlotAvail['seat']]['status']="ONLINE"
                            }
                            goldTables[isSlotAvail['tableNo']][isSlotAvail['seat']]['cards']=[];
                            goldTables[isSlotAvail['tableNo']][isSlotAvail['seat']]['cardStatus']=null;
                            userItem['table']=isSlotAvail;
                            userItem['table']['TABLETYPE']="GOLD";
                            onlineUsers.push(userItem);
                            commonFunction.informTableMember(io,goldTables[isSlotAvail['tableNo']],false,function(dataValue){
                                console.log("AJ1: "+userItem.name+" joined Gold table. "+JSON.stringify(dataValue));
                            })
                        }else{
                            socket.emit("EXIT_GAME","Tables are full at the moment");
                        }
                    }else{
                        onlineUsers[counterOfUser]['socketId']=socket.id;
                        goldTables[onlineUsers[counterOfUser]['table']['tableNo']][onlineUsers[counterOfUser]['table']['seat']]['socketId']=socket.id;
                        if(goldTables[onlineUsers[counterOfUser]['table']['tableNo']]['tableActive']){
                            goldTables[onlineUsers[counterOfUser]['table']['tableNo']][onlineUsers[counterOfUser]['table']['seat']]['status']="WAITING";
                        }else{
                        goldTables[onlineUsers[counterOfUser]['table']['tableNo']][onlineUsers[counterOfUser]['table']['seat']]['status']="ONLINE";
                        }
                        commonFunction.informTableMember(io,goldTables[onlineUsers[counterOfUser]['table']['tableNo']],false,function(dataValue){
                            console.log("AJ1: "+userItem.name+" rejoined Gold table. "+JSON.stringify(dataValue));
                        })
                    }
                    socket.emit("live","");
                }else{
                    socket.emit("EXIT_GAME","Insufficient Balance at the mpoment");
                }
            }
        });
    })

    socket.on('cardStatus',function(data){
        var value = findItemCounter("socketId", socket.id);
        console.log("Called: "+value);
        if (value != undefined) {
            if(onlineUsers[value]['table']['TABLETYPE']=="BRONZE"){
                if(bronzeTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['cardStatus']=="BLIND"){
                    bronzeTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['cardStatus']="SEEN";
                    commonFunction.informTableMember(io,bronzeTables[onlineUsers[value]['table']['tableNo']],false,function(resturnData){
                        console.log("CardSEEN: "+JSON.stringify(resturnData));
                    })
                }
            }else if(onlineUsers[value]['table']['TABLETYPE']=="SILVER"){
                if(silverTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['cardStatus']=="BLIND"){
                    silverTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['cardStatus']="SEEN";
                    commonFunction.informTableMember(io,silverTables[onlineUsers[value]['table']['tableNo']],false,function(resturnData){
                        console.log("CardSEEN: "+JSON.stringify(resturnData));
                    })
                }
            }else if(onlineUsers[value]['table']['TABLETYPE']=="GOLD"){
                if(goldTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['cardStatus']=="BLIND"){
                    goldTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['cardStatus']="SEEN";
                    commonFunction.informTableMember(io,goldTables[onlineUsers[value]['table']['tableNo']],false,function(resturnData){
                        console.log("CardSEEN: "+JSON.stringify(resturnData));
                    })
                }
            }
        }
    });

    socket.on('CHAL',function(data){
        var value = findItemCounter("socketId", socket.id);
        console.log("CHALL: "+value);
        if (value != undefined) {
            if(onlineUsers[value]['table']['TABLETYPE']=="BRONZE"){
                
                //code to deduct Money
                bronzeTables[onlineUsers[value]['table']['tableNo']]['minBetCost']=bronzeTables[onlineUsers[value]['table']['tableNo']]['minBetCost']*data;
                commonFunction.clietSideTableMapper(io,bronzeTables[onlineUsers[value]['table']['tableNo']],
                    onlineUsers[value]['table']['seat'],false);
                commonFunction.deductPointFromSingle(bronzeTables[onlineUsers[value]['table']['tableNo']],onlineUsers[value]['table']['seat'],query,function(returnTable){
                    bronzeTables[onlineUsers[value]['table']['tableNo']]=returnTable;
                    commonFunction.sendBalanceToAll(io,bronzeTables[onlineUsers[value]['table']['tableNo']]);
                    commonFunction.nextTurnHandler(io,bronzeTables[onlineUsers[value]['table']['tableNo']],function(sentTo){
                        if(sentTo=="0"){
                            sentToZeroCommonCode(bronzeTables[onlineUsers[value]['table']['tableNo']],onlineUsers[value]['table']['tableNo'],"BRONZE");
                        }else{
                            bronzeTables[onlineUsers[value]['table']['tableNo']]['tableActive']=true;
                            bronzeTables[onlineUsers[value]['table']['tableNo']].userTurn['userId']=sentTo;
                            bronzeTables[onlineUsers[value]['table']['tableNo']].userTurn['lastTime']=Date.now();
                            console.log("AJ. On chall: "+JSON.stringify(bronzeTables[onlineUsers[value]['table']['tableNo']]))
                        }
                    });
                });
            }else if(onlineUsers[value]['table']['TABLETYPE']=="SILVER"){

                //code to deduct Money
                silverTables[onlineUsers[value]['table']['tableNo']]['minBetCost']=silverTables[onlineUsers[value]['table']['tableNo']]['minBetCost']*data;
                commonFunction.clietSideTableMapper(io,silverTables[onlineUsers[value]['table']['tableNo']],
                    onlineUsers[value]['table']['seat'],false);
                commonFunction.deductPointFromSingle(silverTables[onlineUsers[value]['table']['tableNo']],onlineUsers[value]['table']['seat'],query,function(returnTable){
                    silverTables[onlineUsers[value]['table']['tableNo']]=returnTable;
                    commonFunction.sendBalanceToAll(io,silverTables[onlineUsers[value]['table']['tableNo']]);
                    commonFunction.nextTurnHandler(io,silverTables[onlineUsers[value]['table']['tableNo']],function(sentTo){
                        if(sentTo=="0"){
                            sentToZeroCommonCode(silverTables[onlineUsers[value]['table']['tableNo']],onlineUsers[value]['table']['tableNo'],"SILVER");
                        }else{
                            silverTables[onlineUsers[value]['table']['tableNo']]['tableActive']=true;
                            silverTables[onlineUsers[value]['table']['tableNo']].userTurn['userId']=sentTo;
                            silverTables[onlineUsers[value]['table']['tableNo']].userTurn['lastTime']=Date.now();
                        }
                    });
                })
            }else if(onlineUsers[value]['table']['TABLETYPE']=="GOLD"){

                //code to deduct Money
                goldTables[onlineUsers[value]['table']['tableNo']]['minBetCost']=goldTables[onlineUsers[value]['table']['tableNo']]['minBetCost']*data;
                commonFunction.clietSideTableMapper(io,goldTables[onlineUsers[value]['table']['tableNo']],
                    onlineUsers[value]['table']['seat'],false);
                commonFunction.deductPointFromSingle(goldTables[onlineUsers[value]['table']['tableNo']],onlineUsers[value]['table']['seat'],query,function(returnTable){
                    goldTables[onlineUsers[value]['table']['tableNo']]=returnTable;
                    commonFunction.sendBalanceToAll(io,goldTables[onlineUsers[value]['table']['tableNo']]);
                    commonFunction.nextTurnHandler(io,goldTables[onlineUsers[value]['table']['tableNo']],function(sentTo){
                        if(sentTo=="0"){
                            sentToZeroCommonCode(goldTables[onlineUsers[value]['table']['tableNo']],onlineUsers[value]['table']['tableNo'],"GOLD");
                        }else{
                            goldTables[onlineUsers[value]['table']['tableNo']]['tableActive']=true;
                            goldTables[onlineUsers[value]['table']['tableNo']].userTurn['userId']=sentTo;
                            goldTables[onlineUsers[value]['table']['tableNo']].userTurn['lastTime']=Date.now();
                        }
                    });
                })
            }
        }
    });

    socket.on('PACK',function(data){
        var value = findItemCounter("socketId", socket.id);
        console.log("PACK: "+value);
        if (value != undefined) {
            if(onlineUsers[value]['table']['TABLETYPE']=="BRONZE"){
                
                //code to deduct Money

                commonFunction.clietSideTableMapper(io,bronzeTables[onlineUsers[value]['table']['tableNo']],
                    onlineUsers[value]['table']['seat'],false);
                bronzeTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['cardStatus']="PACKED";
                commonFunction.informTableMember(io,bronzeTables[onlineUsers[value]['table']['tableNo']],false,function(dataValue){
                    commonFunction.nextTurnHandler(io,bronzeTables[onlineUsers[value]['table']['tableNo']],function(sentTo){
                        if(sentTo=="0"){
                            sentToZeroCommonCode(bronzeTables[onlineUsers[value]['table']['tableNo']],onlineUsers[value]['table']['tableNo'],"BRONZE");
                        }else{
                            bronzeTables[onlineUsers[value]['table']['tableNo']]['tableActive']=true;
                            bronzeTables[onlineUsers[value]['table']['tableNo']].userTurn['userId']=sentTo;
                            bronzeTables[onlineUsers[value]['table']['tableNo']].userTurn['lastTime']=Date.now();
                        }
                    });
                })
            }else if(onlineUsers[value]['table']['TABLETYPE']=="SILVER"){

                //code to deduct Money

                commonFunction.clietSideTableMapper(io,silverTables[onlineUsers[value]['table']['tableNo']],
                    onlineUsers[value]['table']['seat'],false);
                silverTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['cardStatus']="PACKED";
                commonFunction.informTableMember(io,silverTables[onlineUsers[value]['table']['tableNo']],false,function(dataValue){
                    commonFunction.nextTurnHandler(io,silverTables[onlineUsers[value]['table']['tableNo']],function(sentTo){
                        if(sentTo=="0"){
                            sentToZeroCommonCode(silverTables[onlineUsers[value]['table']['tableNo']],onlineUsers[value]['table']['tableNo'],"SILVER");
                        }else{
                            silverTables[onlineUsers[value]['table']['tableNo']]['tableActive']=true;
                            silverTables[onlineUsers[value]['table']['tableNo']].userTurn['userId']=sentTo;
                            silverTables[onlineUsers[value]['table']['tableNo']].userTurn['lastTime']=Date.now();
                        }
                    });
                });
            }else if(onlineUsers[value]['table']['TABLETYPE']=="GOLD"){

                //code to deduct Money

                commonFunction.clietSideTableMapper(io,goldTables[onlineUsers[value]['table']['tableNo']],
                    onlineUsers[value]['table']['seat'],false);
                goldTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['cardStatus']="PACKED";
                commonFunction.informTableMember(io,goldTables[onlineUsers[value]['table']['tableNo']],false,function(dataValue){
                    commonFunction.nextTurnHandler(io,goldTables[onlineUsers[value]['table']['tableNo']],function(sentTo){
                        if(sentTo=="0"){
                            sentToZeroCommonCode(goldTables[onlineUsers[value]['table']['tableNo']],onlineUsers[value]['table']['tableNo'],"GOLD");
                        }else{
                            goldTables[onlineUsers[value]['table']['tableNo']]['tableActive']=true;
                            goldTables[onlineUsers[value]['table']['tableNo']].userTurn['userId']=sentTo;
                            goldTables[onlineUsers[value]['table']['tableNo']].userTurn['lastTime']=Date.now();
                        }
                    });
                })
            }
        }
    });

    socket.on('live', function(data) {
        
        var value = findItemCounter("socketId", socket.id);
        if (value != undefined) {
            //console.log("Alive: "+onlineUsers[value]["name"]);
            onlineUsers[value]["time"] = Date.now();
            socket.emit('live', socket.id);
        } else {
            //console.log("Disconnect: "+socket.id);
            socket.disconnect(true)
        }
    })

    socket.on('SHOW',function(data){
        var value = findItemCounter("socketId", socket.id);
        console.log("SHOW: "+value);
        if (value != undefined) {
            if(onlineUsers[value]['table']['TABLETYPE']=="BRONZE"){
                
                if(commonFunction.showActivePlayers(bronzeTables[onlineUsers[value]['table']['tableNo']])==2){
                    commonFunction.clietSideTableMapper(io,bronzeTables[onlineUsers[value]['table']['tableNo']],
                        onlineUsers[value]['table']['seat'],false);
                        sentToZeroCommonCode(bronzeTables[onlineUsers[value]['table']['tableNo']],onlineUsers[value]['table']['tableNo'],"BRONZE");
                }else{
                    console.log("AJ. Not valid show: "+commonFunction.showActivePlayers(bronzeTables[onlineUsers[value]['table']['tableNo']]));
                }
            }else if(onlineUsers[value]['table']['TABLETYPE']=="SILVER"){

                if(commonFunction.showActivePlayers(silverTables[onlineUsers[value]['table']['tableNo']])==2){
                    commonFunction.clietSideTableMapper(io,silverTables[onlineUsers[value]['table']['tableNo']],
                        onlineUsers[value]['table']['seat'],false);
                        sentToZeroCommonCode(silverTables[onlineUsers[value]['table']['tableNo']],onlineUsers[value]['table']['tableNo'],"SILVER");
                }else{
                    console.log("AJ. Not valid show: "+commonFunction.showActivePlayers(silverTables[onlineUsers[value]['table']['tableNo']]));
                }
            }else if(onlineUsers[value]['table']['TABLETYPE']=="GOLD"){

                if(commonFunction.showActivePlayers(goldTables[onlineUsers[value]['table']['tableNo']])==2){
                    commonFunction.clietSideTableMapper(io,goldTables[onlineUsers[value]['table']['tableNo']],
                        onlineUsers[value]['table']['seat'],false);
                        sentToZeroCommonCode(goldTables[onlineUsers[value]['table']['tableNo']],onlineUsers[value]['table']['tableNo'],"GOLD");
                }else{
                    console.log("AJ. Not valid show: "+commonFunction.showActivePlayers(goldTables[onlineUsers[value]['table']['tableNo']]));
                }
            }
        }
    });

    socket.on('TIP', function(data){
        var value = findItemCounter("socketId", socket.id);
        console.log("Tip on: "+value);
        if (value != undefined) {
            if(onlineUsers[value]['table']['TABLETYPE']=="BRONZE"){
                //var table=bronzeTables[onlineUsers[value]['table']['tableNo']];
                if(bronzeTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]!=undefined  && bronzeTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['status']=="ONLINE"
                && bronzeTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['cardStatus']!="PACKED"){
                    bronzeTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['points']=bronzeTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['points']-10;
                    console.log("Tip given 10 points at bronze Table");
                    var costData={};
                    costData['yourBet']=bronzeTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['points'];
                    io.to(socket.id).emit("COST",JSON.stringify(costData));
                }
            }else if(onlineUsers[value]['table']['TABLETYPE']=="SILVER"){
                if(silverTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]!=undefined  && silverTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['status']=="ONLINE"
                && silverTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['cardStatus']!="PACKED"){
                    silverTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['points']=silverTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['points']-10;
                    console.log("Tip given 10 points at silver Table");
                    var costData={};
                    costData['yourBet']=silverTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['points'];
                    io.to(socket.id).emit("COST",JSON.stringify(costData));
                }
            }else if(onlineUsers[value]['table']['TABLETYPE']=="GOLD"){
                if(goldTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]!=undefined  && goldTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['status']=="ONLINE"
                && goldTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['cardStatus']!="PACKED"){
                    goldTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['points']=goldTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['points']-10;
                    console.log("Tip given 10 points at gold Table");
                    var costData={};
                    costData['yourBet']=silverTables[onlineUsers[value]['table']['tableNo']][onlineUsers[value]['table']['seat']]['points'];
                    io.to(socket.id).emit("COST",JSON.stringify(costData));
                }
            }
        }
    })

    // On disconnect removes the user from online list
    socket.on('disconnect', function() {
        // Find the user by socket ID
        var value = findItemCounter("socketId", socket.id);
        // check if user entry is present
        if (value != undefined) {
            disconnectCommon(value,function(itemData){
                if(itemData.hasOwnProperty('item')&&itemData.hasOwnProperty('costLeft')){
                    query.query("UPDATE `user` SET `points`="+itemData.costLeft+" WHERE `id`="+itemData.item,function(resultData){
                    
                    })
                    onlineUsers.splice(value, 1);
                    console.log(JSON.stringify(onlineUsers) + "Left User");
                }
            })
        }
    });

});

app.post('/teenpatti/register',function(req,res){
    var jsonData = '';
    req.on('data', function(data) {
        jsonData += data;
    });
    req.on('end', function() {
        var responceData = new (require('./models/responseModel.js'))();
        var jsonString = JSON.parse(jsonData);
        var User=new (require('./models/userModel.js'))();
        User['name']=jsonString['name'];
        User['email']=jsonString['email'];
        User['mobile']=jsonString['mobile'];
        User['profileImage']=jsonString['profileImage'];
        User['password']=jsonString['password'];
        User['points']=10000;
        User['createDate']=Date.now();
        userController.findUserByEmail(User,function(responce){
            if(responce.isSuccess==1 && responce.message!="Duplicate Data in DB"){
                responceData['isSuccess'] = 0;
                responceData['message'] = "Email Address already Exists";
                res.end(JSON.stringify(responceData));
            }else{
                userController.findUserByMob(User,function(responce){
                    if(responce.isSuccess==1 && responce.message!="Duplicate Data in DB"){
                        responceData['isSuccess'] = 0;
                        responceData['message'] = "Mobile Address already Exists";
                        res.end(JSON.stringify(responceData));
                    }else{
                        query.insert("user",User,function(responseData){
                            res.end(JSON.stringify(responseData));
                        })
                    }
                })
            }
        })
    })
});

app.post('/teenpatti/login',function(req,res){
    var jsonData = '';
    req.on('data', function(data) {
        jsonData += data;
    });
    req.on('end', function() {
        var responceData = {};
        responceData['isSuccess'] = 0;
        responceData['message'] = "";
        responceData['response'] = {};
        var jsonString = JSON.parse(jsonData);
        var User={};
        User['email']=jsonString['email'];
        userController.findUserByEmail(User,function(responce){
            if(responce.isSuccess==1){
                if(responce.response.password==jsonString.password){
                    User['id']=responce.response.id;
                    User['name']=responce.response.name;
                    User['mobile']=responce.response.mobile;
                    User['points']=responce.response.points;
                    User['profileImage']=responce.response.profileImage;
                    responceData['isSuccess'] = 1;
                    responceData['message'] = "Success";
                    responceData['response'] = User;
                    return res.end(JSON.stringify(responceData));
                }else{
                    responceData.isSuccess=0;
                    responceData.message="Invalid Password";
                    responceData.response={};
                    return res.end(JSON.stringify(responceData));
                }
            }else{
                responceData.isSuccess=0;
                responceData.message="No User";
                return res.end(JSON.stringify(responceData));
            }
        }); 
    });
});

app.post('/teenpatti/getPoints',function(req,res){
    var jsonData = '';
    req.on('data', function(data) {
        jsonData += data;
    });
    req.on('end', function() {
        var responceData = {};
        responceData['isSuccess'] = 0;
        responceData['message'] = "";
        responceData['response'] = {};
        var jsonString = JSON.parse(jsonData);
        query.query("SELECT `points` FROM `user` WHERE `id`="+jsonString.id,function(userData){
            if(userData!=null){
                responceData['isSuccess'] = 1;
                responceData['message'] = "Success";
                responceData['response'] = userData['response'][0]['points'];
            }
            res.end(JSON.stringify(responceData));
        })
    });
});

app.post('/teenpatti/login',function(req,res){
    var jsonData = '';
    req.on('data', function(data) {
        jsonData += data;
    });
    req.on('end', function() {
        var responceData = {};
        responceData['isSuccess'] = 0;
        responceData['message'] = "";
        responceData['response'] = {};
        var jsonString = JSON.parse(jsonData);
        var User={};
        User['email']=jsonString['email'];
        userController.findUserByEmail(User,function(responce){
            if(responce.isSuccess==1){
                if(responce.response.password==jsonString.password){
                    User['id']=responce.response.id;
                    User['name']=responce.response.name;
                    User['mobile']=responce.response.mobile;
                    User['points']=responce.response.points;
                    User['profileImage']=responce.response.profileImage;
                    responceData['isSuccess'] = 1;
                    responceData['message'] = "Success";
                    responceData['response'] = User;
                    return res.end(JSON.stringify(responceData));
                }else{
                    responceData.isSuccess=0;
                    responceData.message="Invalid Password";
                    responceData.response={};
                    return res.end(JSON.stringify(responceData));
                }
            }else{
                responceData.isSuccess=0;
                responceData.message="No User";
                return res.end(JSON.stringify(responceData));
            }
        }); 
    });
});

app.post('/teenpatti/upload', upload.single('file'), function(req, res) {
    var responceData = {};
    responceData['isSuccess'] = 0;
    responceData['message'] = "";
    responceData['response'] = {};
    var file = __dirname + "/files/Images/" + req.file.filename + ".jpg";
    fs.rename(req.file.path, file, function(err) {
        if (err) {
            res.json({ isSuccess: 0, message: err.message, response: null });
        } else {
            responceData['isSuccess'] = 1;
            responceData['message'] = "Uploaded";
            responceData['response'] = "/teenpatti/Images?id=" + req.file.filename + ".jpg";
            res.end(JSON.stringify(responceData));
        }
    });
});

setInterval(() => {
    //console.log("Started: ");
    for(var i=0;i<onlineUsers.length;i++){
        if(onlineUsers[i].hasOwnProperty('time')){
            //console.log("User"+i+": "+(Date.now()-onlineUsers[i]['time']));
            if(Date.now()-onlineUsers[i]['time']>3000){
                disconnectCommon(i,function(itemData){
                    if(itemData.hasOwnProperty('item')&&itemData.hasOwnProperty('costLeft')){
                        query.query("UPDATE `user` SET `points`="+itemData.costLeft+" WHERE id="+itemData.item,function(resultData){
                        })
                        onlineUsers.splice(itemData.item, 1);
                        console.log(JSON.stringify(onlineUsers) + "Left User");
                    }
                })
                io.to(onlineUsers[i]['socketId']).emit("EXIT_GAME","You were offline");
                
            }else if(Date.now()-onlineUsers[i]['time']>2000){
                if(onlineUsers[i].hasOwnProperty('table')){
                    if(onlineUsers[i]['table']['TABLETYPE']=="BRONZE"){
                        bronzeTables[onlineUsers[i]['table']['tableNo']][onlineUsers[i]['table']['seat']]['status']="OFFLINE";
                        commonFunction.informTableMember(io,bronzeTables[onlineUsers[i]['table']['tableNo']],false,function(dataValue){
                            console.log("AJ."+onlineUsers[i]['name']+" Offline Bronnze table: "+JSON.stringify(dataValue));
                        })
                    }else if(onlineUsers[i]['table']['TABLETYPE']=="SILVER"){
                        silverTables[onlineUsers[i]['table']['tableNo']][onlineUsers[i]['table']['seat']]['status']="OFFLINE";
                        commonFunction.informTableMember(io,silverTables[onlineUsers[i]['table']['tableNo']],false,function(dataValue){
                            console.log("AJ. "+onlineUsers[i]['name']+" Offline Silver Table: "+JSON.stringify(dataValue));
                        })
                    }else if(onlineUsers[i]['table']['TABLETYPE']=="GOLD"){
                        goldTables[onlineUsers[i]['table']['tableNo']][onlineUsers[i]['table']['seat']]['status']="OFFLINE";
                        commonFunction.informTableMember(io,goldTables[onlineUsers[i]['table']['tableNo']],false,function(dataValue){
                            console.log("AJ. "+onlineUsers[i]['name']+" Offline Gold Table: "+JSON.stringify(dataValue));
                        })
                    }
                }
            }
        }
    }
    commonFunction.CheckIsTableRunningOrNot(io,bronzeTables[0],function(dataValue){
        //console.log(dataValue);
        if(dataValue.TEXT=="CARDS_GIVEN"){
            bronzeTables[0]=dataValue.TABLE;
            bronzeTables[0]['tableActive']=true;
            bronzeTables[0]['userTurn']['userId']=0;
            bronzeTables[0]['userTurn']['lastTime']=Date.now();
            commonFunction.deductPointFromAll(bronzeTables[0],query,function(returnTable){
                bronzeTables[0]=returnTable;
                commonFunction.informTableMember(io,bronzeTables[0],false,function(returnData){
                    //console.log("CARDS_GIVEN");
                })
            })
        }else if(dataValue.TEXT=="PLAYERS_LEFT"){
            sentToZeroCommonCode(bronzeTables[0],0,"BRONZE");
        }else if(dataValue.TEXT=="FIRST_TURN"){
            commonFunction.turnHandler(io,bronzeTables[0],function(sentTo){
                if(sentTo=="0"){
                    sentToZeroCommonCode(bronzeTables[0],0,"BRONZE");
                }else{
                    bronzeTables[0]['tableActive']=true;
                    bronzeTables[0].userTurn['userId']=sentTo;
                    bronzeTables[0].userTurn['lastTime']=Date.now();
                }
            });
        }else if(dataValue.TEXT=="OTHERS_TURN"){
            bronzeTables[0][bronzeTables[0]['userTurn']['userId']]['cardStatus']="PACKED";
            commonFunction.informTableMember(io,bronzeTables[0],false,function(returnData){
                commonFunction.nextTurnHandler(io,bronzeTables[0],function(sentTo){
                    if(sentTo=="0"){
                        sentToZeroCommonCode(bronzeTables[0],0,"BRONZE");
                    }else{
                        bronzeTables[0]['tableActive']=true;
                        bronzeTables[0].userTurn['userId']=sentTo;
                        bronzeTables[0].userTurn['lastTime']=Date.now();
                    }
                });
            })
        }
    })
    commonFunction.CheckIsTableRunningOrNot(io,bronzeTables[1],function(dataValue){
        //console.log(dataValue);
        if(dataValue.TEXT=="CARDS_GIVEN"){
            bronzeTables[1]=dataValue.TABLE;
            bronzeTables[1]['tableActive']=true;
            bronzeTables[1]['userTurn']['userId']=0;
            bronzeTables[1]['userTurn']['lastTime']=Date.now();
            commonFunction.deductPointFromAll(bronzeTables[1],query,function(returnTable){
                bronzeTables[1]=returnTable;
                commonFunction.informTableMember(io,bronzeTables[1],false,function(returnData){
                    //console.log("CARDS_GIVEN");
                })
            })
        }else if(dataValue.TEXT=="PLAYERS_LEFT"){
            sentToZeroCommonCode(bronzeTables[1],1,"BRONZE");
        }else if(dataValue.TEXT=="FIRST_TURN"){
            commonFunction.turnHandler(io,bronzeTables[1],function(sentTo){
                if(sentTo=="0"){
                    sentToZeroCommonCode(bronzeTables[1],1,"BRONZE");
                }else{
                    bronzeTables[1]['tableActive']=true;
                    bronzeTables[1].userTurn['userId']=sentTo;
                    bronzeTables[1].userTurn['lastTime']=Date.now();
                }
            });
        }else if(dataValue.TEXT=="OTHERS_TURN"){
            bronzeTables[1][bronzeTables[1]['userTurn']['userId']]['cardStatus']="PACKED";
            commonFunction.informTableMember(io,bronzeTables[1],false,function(returnData){
                commonFunction.nextTurnHandler(io,bronzeTables[1],function(sentTo){
                    if(sentTo=="0"){
                        sentToZeroCommonCode(bronzeTables[1],1,"BRONZE");
                    }else{
                        bronzeTables[1]['tableActive']=true;
                        bronzeTables[1].userTurn['userId']=sentTo;
                        bronzeTables[1].userTurn['lastTime']=Date.now();
                    }
                });
            })
        }
    })
    commonFunction.CheckIsTableRunningOrNot(io,silverTables[0],function(dataValue){
        //console.log(dataValue);
        if(dataValue.TEXT=="CARDS_GIVEN"){
            silverTables[0]=dataValue.TABLE;
            silverTables[0]['tableActive']=true;
            silverTables[0]['userTurn']['userId']=0;
            silverTables[0]['userTurn']['lastTime']=Date.now();
            commonFunction.deductPointFromAll(silverTables[0],query,function(returnTable){
                silverTables[0]=returnTable;
                commonFunction.informTableMember(io,silverTables[0],false,function(returnData){
                    //console.log("CARDS_GIVEN");
                })
            })
        }else if(dataValue.TEXT=="PLAYERS_LEFT"){
            sentToZeroCommonCode(silverTables[0],0,"SILVER");
        }else if(dataValue.TEXT=="FIRST_TURN"){
            commonFunction.turnHandler(io,silverTables[0],function(sentTo){
                if(sentTo=="0"){
                    sentToZeroCommonCode(silverTables[0],0,"SILVER");
                }else{
                    silverTables[0]['tableActive']=true;
                    silverTables[0].userTurn['userId']=sentTo;
                    silverTables[0].userTurn['lastTime']=Date.now();
                }
            });
        }else if(dataValue.TEXT=="OTHERS_TURN"){
            silverTables[0][silverTables[0]['userTurn']['userId']]['cardStatus']="PACKED";
            commonFunction.informTableMember(io,silverTables[0],false,function(returnData){
                commonFunction.nextTurnHandler(io,silverTables[0],function(sentTo){
                    if(sentTo=="0"){
                        sentToZeroCommonCode(silverTables[0],0,"SILVER");
                    }else{
                        silverTables[0]['tableActive']=true;
                        silverTables[0].userTurn['userId']=sentTo;
                        silverTables[0].userTurn['lastTime']=Date.now();
                    }
                });
            })
        }
    })
    commonFunction.CheckIsTableRunningOrNot(io,silverTables[1],function(dataValue){
        //console.log(dataValue);
        if(dataValue.TEXT=="CARDS_GIVEN"){
            silverTables[1]=dataValue.TABLE;
            silverTables[1]['tableActive']=true;
            silverTables[1]['userTurn']['userId']=0;
            silverTables[1]['userTurn']['lastTime']=Date.now();
            commonFunction.deductPointFromAll(silverTables[1],query,function(returnTable){
                silverTables[1]=returnTable;
                commonFunction.informTableMember(io,silverTables[1],false,function(returnData){
                    //console.log("CARDS_GIVEN");
                })
            })
        }else if(dataValue.TEXT=="PLAYERS_LEFT"){
            sentToZeroCommonCode(silverTables[1],1,"SILVER");
        }else if(dataValue.TEXT=="FIRST_TURN"){
            commonFunction.turnHandler(io,silverTables[1],function(sentTo){
                if(sentTo=="0"){
                    sentToZeroCommonCode(silverTables[1],1,"SILVER");
                }else{
                    silverTables[1]['tableActive']=true;
                    silverTables[1].userTurn['userId']=sentTo;
                    silverTables[1].userTurn['lastTime']=Date.now();
                }
            });
        }else if(dataValue.TEXT=="OTHERS_TURN"){
            silverTables[1][silverTables[1]['userTurn']['userId']]['cardStatus']="PACKED";
            commonFunction.informTableMember(io,silverTables[1],false,function(returnData){
                commonFunction.nextTurnHandler(io,silverTables[1],function(sentTo){
                    if(sentTo=="0"){
                        sentToZeroCommonCode(silverTables[1],1,"SILVER");
                    }else{
                        silverTables[1]['tableActive']=true;
                        silverTables[1].userTurn['userId']=sentTo;
                        silverTables[1].userTurn['lastTime']=Date.now();
                    }
                });
            })
        }
    })
    commonFunction.CheckIsTableRunningOrNot(io,goldTables[0],function(dataValue){
        //console.log(dataValue);
        if(dataValue.TEXT=="CARDS_GIVEN"){
            goldTables[0]=dataValue.TABLE;
            goldTables[0]['tableActive']=true;
            goldTables[0]['userTurn']['userId']=0;
            goldTables[0]['userTurn']['lastTime']=Date.now();
            commonFunction.deductPointFromAll(goldTables[0],query,function(returnTable){
                goldTables[0]=returnTable;
                commonFunction.informTableMember(io,goldTables[0],false,function(returnData){
                    //console.log("CARDS_GIVEN");
                })
            })
        }else if(dataValue.TEXT=="PLAYERS_LEFT"){
            sentToZeroCommonCode(goldTables[0],0,"GOLD");
        }else if(dataValue.TEXT=="FIRST_TURN"){
            commonFunction.turnHandler(io,goldTables[0],function(sentTo){
                if(sentTo=="0"){
                    sentToZeroCommonCode(goldTables[0],0,"GOLD");
                }else{
                    goldTables[0]['tableActive']=true;
                    goldTables[0].userTurn['userId']=sentTo;
                    goldTables[0].userTurn['lastTime']=Date.now();
                }
            });
        }else if(dataValue.TEXT=="OTHERS_TURN"){
            goldTables[0][goldTables[0]['userTurn']['userId']]['cardStatus']="PACKED";
            commonFunction.informTableMember(io,goldTables[0],false,function(returnData){
                commonFunction.nextTurnHandler(io,goldTables[0],function(sentTo){
                    if(sentTo=="0"){
                        sentToZeroCommonCode(goldTables[0],0,"GOLD");
                    }else{
                        goldTables[0]['tableActive']=true;
                        goldTables[0].userTurn['userId']=sentTo;
                        goldTables[0].userTurn['lastTime']=Date.now();
                    }
                });
            })
        }
    })
    commonFunction.CheckIsTableRunningOrNot(io,goldTables[1],function(dataValue){
        //console.log(dataValue);
        if(dataValue.TEXT=="CARDS_GIVEN"){
            goldTables[1]=dataValue.TABLE;
            goldTables[1]['tableActive']=true;
            goldTables[1]['userTurn']['userId']=0;
            goldTables[1]['userTurn']['lastTime']=Date.now();
            commonFunction.deductPointFromAll(goldTables[1],query,function(returnTable){
                goldTables[1]=returnTable;
                commonFunction.informTableMember(io,goldTables[1],false,function(returnData){
                    //console.log("CARDS_GIVEN");
                })
            })
        }else if(dataValue.TEXT=="PLAYERS_LEFT"){
            sentToZeroCommonCode(goldTables[1],1,"GOLD");
        }else if(dataValue.TEXT=="FIRST_TURN"){
            commonFunction.turnHandler(io,goldTables[1],function(sentTo){
                if(sentTo=="0"){
                    sentToZeroCommonCode(goldTables[1],1,"GOLD");
                }else{
                    goldTables[1]['tableActive']=true;
                    goldTables[1].userTurn['userId']=sentTo;
                    goldTables[1].userTurn['lastTime']=Date.now();
                }
            });
        }else if(dataValue.TEXT=="OTHERS_TURN"){
            goldTables[1][goldTables[1]['userTurn']['userId']]['cardStatus']="PACKED";
            commonFunction.informTableMember(io,goldTables[1],false,function(returnData){
                commonFunction.nextTurnHandler(io,goldTables[1],function(sentTo){
                    if(sentTo=="0"){
                        sentToZeroCommonCode(goldTables[1],1,"GOLD");
                    }else{
                        goldTables[1]['tableActive']=true;
                        goldTables[1].userTurn['userId']=sentTo;
                        goldTables[1].userTurn['lastTime']=Date.now();
                    }
                });
            })
        }
    })
    
}, 1000);

app.get('/teenpatti/Images', function(req, res) {
    res.sendfile(__dirname + '/files/Images/' + req.query.id);
});

http.listen(port, function() {
    console.log('started at port: ' + port);
});

//Notes
//Friends List:  1=Request Friend 2=Pending for friend 3=people you may know 4= friends
