module.exports = function() {
    
        this.findAvailableSlot = function(tableArray) {
            var returnItem=undefined;
            if(tableArray[0]['firstUser']==undefined){
                returnItem={};
                returnItem['tableNo']=0;
                returnItem['seat']='firstUser';
                return returnItem;
            }else if(tableArray[0]['secondUser']==undefined){
                returnItem={};
                returnItem['tableNo']=0;
                returnItem['seat']='secondUser';
                return returnItem;
            }else if(tableArray[0]['thirdUser']==undefined){
                returnItem={};
                returnItem['tableNo']=0;
                returnItem['seat']='thirdUser';
                return returnItem;
            }else if(tableArray[0]['fourthUser']==undefined){
                returnItem={};
                returnItem['tableNo']=0;
                returnItem['seat']='fourthUser';
                return returnItem;
            }else if(tableArray[0]['fifthUser']==undefined){
                returnItem={};
                returnItem['tableNo']=0;
                returnItem['seat']='fifthUser';
                return returnItem;
            }else if(tableArray[1]['firstUser']==undefined){
                returnItem['tableNo']=1;
                returnItem['seat']='firstUser';
                return returnItem;
            }else if(tableArray[1]['secondUser']==undefined){
                returnItem={};
                returnItem['tableNo']=1;
                returnItem['seat']='secondUser';
                return returnItem;
            }else if(tableArray[1]['thirdUser']==undefined){
                returnItem={};
                returnItem['tableNo']=1;
                returnItem['seat']='thirdUser';
                return returnItem;
            }else if(tableArray[1]['fourthUser']==undefined){
                returnItem={};
                returnItem['tableNo']=1;
                returnItem['seat']='fourthUser';
                return returnItem;
            }else if(tableArray[1]['fifthUser']==undefined){
                returnItem={};
                returnItem['tableNo']=1;
                returnItem['seat']='fifthUser';
                return returnItem;
            }else{
                return returnItem;
            }
        };

        this.informTableMember = function(io,tableItem,isShowCard,callback){
            //For first user
            var playerResult=this.showActivePlayers(tableItem)
            if(tableItem.firstUser!=undefined){
                var dataToSend=[];
                var itemAdding=function(whichItemTag,isSelfShow){
                    var item=null;
                    if(tableItem[whichItemTag]!=undefined){
                        item=tableItem[whichItemTag];
                        if(isSelfShow && tableItem[whichItemTag].cardStatus=="SEEN"){
                            item.cards=tableItem[whichItemTag]['cards'];
                        }
                        item['isShowCard']=isShowCard;
                        item['players']=playerResult;
                        item['minBetCost']=tableItem.minBetCost;
                        item['maxTableCost']=tableItem.maxTableCost;
                        item['currentTableCost']=tableItem.currentTableCost;
                    }else{
                        item=null;
                    }
                    dataToSend.push(item);
                }
                itemAdding('fourthUser',false);
                itemAdding('thirdUser',false);
                itemAdding('fifthUser',false);
                itemAdding('secondUser',false);
                itemAdding('firstUser',true);
                io.to(tableItem.firstUser.socketId).emit('SCREEN_UPDATE',JSON.stringify(dataToSend));
            }
            if(tableItem.secondUser!=undefined){
                var dataToSend=[];
                var itemAdding=function(whichItemTag,isSelfShow){
                    var item=null;
                    if(tableItem[whichItemTag]!=undefined){
                        item=tableItem[whichItemTag];
                        item['isShowCard']=isShowCard;
                        if(isSelfShow && tableItem[whichItemTag].cardStatus=="SEEN"){
                            item.cards=tableItem[whichItemTag]['cards'];
                        }
                        item['players']=playerResult;
                        item['minBetCost']=tableItem.minBetCost;
                        item['maxTableCost']=tableItem.maxTableCost;
                        item['currentTableCost']=tableItem.currentTableCost;
                    }else{
                        item=null;
                    }
                    dataToSend.push(item);
                }
                itemAdding('fifthUser',false);
                itemAdding('fourthUser',false);
                itemAdding('firstUser',false);
                itemAdding('thirdUser',false);
                itemAdding('secondUser',true);
                io.to(tableItem.secondUser.socketId).emit("SCREEN_UPDATE",JSON.stringify(dataToSend));
            }
            if(tableItem.thirdUser!=undefined){
                var dataToSend=[];
                var itemAdding=function(whichItemTag,isSelfShow){
                    var item=null;
                    if(tableItem[whichItemTag]!=undefined){
                        item=tableItem[whichItemTag];
                        item['isShowCard']=isShowCard;
                        if(isSelfShow && tableItem[whichItemTag].cardStatus=="SEEN"){
                            item.cards=tableItem[whichItemTag]['cards'];
                        }
                        item['players']=playerResult;
                        item['minBetCost']=tableItem.minBetCost;
                        item['maxTableCost']=tableItem.maxTableCost;
                        item['currentTableCost']=tableItem.currentTableCost;

                    }else{
                        item=null;
                    }
                    dataToSend.push(item);
                }
                itemAdding('firstUser',false);
                itemAdding('fifthUser',false);
                itemAdding('secondUser',false);
                itemAdding('fourthUser',false);
                itemAdding('thirdUser',true);
                io.to(tableItem.thirdUser.socketId).emit("SCREEN_UPDATE",JSON.stringify(dataToSend));
            }
            if(tableItem.fourthUser!=undefined){
                var dataToSend=[];
                var itemAdding=function(whichItemTag,isSelfShow){
                    var item=null;
                    if(tableItem[whichItemTag]!=undefined){
                        item=tableItem[whichItemTag];
                        item['isShowCard']=isShowCard;
                        if(isSelfShow && tableItem[whichItemTag].cardStatus=="SEEN"){
                            item.cards=tableItem[whichItemTag]['cards'];
                        }
                        item['players']=playerResult;
                        item['minBetCost']=tableItem.minBetCost;
                        item['maxTableCost']=tableItem.maxTableCost;
                        item['currentTableCost']=tableItem.currentTableCost;

                    }else{
                        item=null;
                    }
                    dataToSend.push(item);
                }
                itemAdding('secondUser',false);
                itemAdding('firstUser',false);
                itemAdding('thirdUser',false);
                itemAdding('fifthUser',false);
                itemAdding('fourthUser',true);
                io.to(tableItem.fourthUser.socketId).emit("SCREEN_UPDATE",JSON.stringify(dataToSend));
            }
            if(tableItem.fifthUser!=undefined){
                var dataToSend=[];
                var itemAdding=function(whichItemTag,isSelfShow){
                    var item=null;
                    if(tableItem[whichItemTag]!=undefined){
                        item=tableItem[whichItemTag];
                        item['isShowCard']=isShowCard;
                        if(isSelfShow && tableItem[whichItemTag].cardStatus=="SEEN"){
                            item.cards=tableItem[whichItemTag]['cards'];
                        }
                        item['players']=playerResult;
                        item['minBetCost']=tableItem.minBetCost;
                        item['maxTableCost']=tableItem.maxTableCost;
                        item['currentTableCost']=tableItem.currentTableCost;

                    }else{
                        item=null;
                    }
                    dataToSend.push(item);
                }
                itemAdding('secondUser',false);
                itemAdding('thirdUser',false);
                itemAdding('firstUser',false);
                itemAdding('fourthUser',false);
                itemAdding('fifthUser',true);
                io.to(tableItem.fifthUser.socketId).emit("SCREEN_UPDATE",JSON.stringify(dataToSend));
            }
            callback("");
        }

        this.findUserListOnTableAndTheirCard = function(io,table,callback){
            var userList=[];
            if(table.hasOwnProperty('firstUser')&&table.firstUser!=undefined){
                var user={};
                user['userNo']="firstUser";
                user['user']=table.firstUser;
                userList.push(user);
            }
            if(table.hasOwnProperty('secondUser')&&table.secondUser!=undefined){
                var user={};
                user['userNo']="secondUser";
                user['user']=table.secondUser;
                userList.push(user);
            }
            if(table.hasOwnProperty('thirdUser')&&table.thirdUser!=undefined){
                var user={};
                user['userNo']="thirdUser";
                user['user']=table.thirdUser;
                userList.push(user);
            }
            if(table.hasOwnProperty('fourthUser')&&table.fourthUser!=undefined){
                var user={};
                user['userNo']="fourthUser";
                user['user']=table.fourthUser;
                userList.push(user);
            }
            if(table.hasOwnProperty('fifthUser')&&table.fifthUser!=undefined){
                var user={};
                user['userNo']="fifthUser";
                user['user']=table.fifthUser;
                userList.push(user);
            }
            if(userList.length>1){
                let cardsCount=userList.length*3;
                var cardsArray=this.getShuffeledCardsToPlay(cardsCount);
                index=0
                for(var i=0;i<userList.length;i++){
                        table[userList[i]['userNo']]['cards']=[];
                        table[userList[i]['userNo']]['cards'].push(cardsArray[index++]);
                        table[userList[i]['userNo']]['cards'].push(cardsArray[index++]);
                        table[userList[i]['userNo']]['cards'].push(cardsArray[index++]);
                        table[userList[i]['userNo']]['cardStatus']="BLIND";
                }
                var responseItem={};
                responseItem['TEXT']="CARDS_GIVEN";
                responseItem['TABLE']=table;
                callback(responseItem);
            }else{
                var responseItem={};
                responseItem['TEXT']="No player Online";
                responseItem['TABLE']=table;
                callback(responseItem);
            }
        }

        this.getShuffeledCardsToPlay = function(count) {
            //var cardArray=new (require('../models/catBundle.js'))();
            var cardArrayList = require('../models/deckMaker.js');
            cardArrayList.shuffle();
            var cardArray=cardArrayList.getCards()
            // //console.log("AJ.Coards: "+JSON.stringify(cardArray));
            // var shuffled = cardArray.slice(0), i = cardArray.length, min = i - count, temp, index;
            // while (i-- > min) {
            //     index = Math.floor((i + 1) * Math.random());
            //     temp = shuffled[index];
            //     shuffled[index] = shuffled[i];
            //     shuffled[i] = temp;
            // }
            var finalCards=[];
            for(var i=0;i<count;i++){
                finalCards.push(cardArray[i])
            }
            return finalCards;
        }

        this.isTableEmpty = function(table){
            var userCount=0;
            if(table.firstUser!=undefined){
                userCount=userCount+1;
            }
            if(table.secondUser!=undefined){
                userCount=userCount+1;
            }
            if(table.thirdUser!=undefined){
                userCount=userCount+1;
            }
            if(table.fourthUser!=undefined){
                userCount=userCount+1;
            }
            if(table.fifthUser!=undefined){
                userCount=userCount+1;
            }
            return userCount;
        }

        this.showActivePlayers = function(table){
            var userCount=0;
            if(table.firstUser!=undefined  && table['firstUser']['status']=="ONLINE"
                && table['firstUser']['cardStatus']!="PACKED"){
                    userCount=userCount+1;
            }
            if(table.secondUser!=undefined && table['secondUser']['status']=="ONLINE"
                && table['secondUser']['cardStatus']!="PACKED"){
                    userCount=userCount+1;
            }
            if(table.thirdUser!=undefined && table['thirdUser']['status']=="ONLINE"
                && table['thirdUser']['cardStatus']!="PACKED"){
                    userCount=userCount+1;
            }
            if(table.fourthUser!=undefined && table['fourthUser']['status']=="ONLINE"
                && table['fourthUser']['cardStatus']!="PACKED"){
                    userCount=userCount+1;
            }
            if(table.fifthUser!=undefined && table['fifthUser']['status']=="ONLINE"
                && table['fifthUser']['cardStatus']!="PACKED"){
                    userCount=userCount+1;
            }
            return userCount;
        }

        this.CheckIsTableRunningOrNot= function(io,table,callback){
            if(table['tableActive']){
                if(!this.isTableEmpty(table)>1){
                    var responseItem={};
                    responseItem['TEXT']="PLAYERS_LEFT";
                    responseItem['TABLE']=table;
                    callback(responseItem);
                }else if(Date.now()-table['userTurn']['lastTime']>20000){
                    var responseItem={};
                    responseItem['TEXT']="OTHERS_TURN";
                    responseItem['TABLE']=table;
                    callback(responseItem);
                }
                else if(Date.now()-table['userTurn']['lastTime']>5000 && table['userTurn']['userId']==0){
                    var responseItem={};
                    responseItem['TEXT']="FIRST_TURN";
                    responseItem['TABLE']=table;
                    callback(responseItem);
                }
            }else{
                if(Date.now()-table['tableOfflineFor']>10000){
                    this.findUserListOnTableAndTheirCard(io,table,function(dataValue){
                        callback(dataValue);
                    })
                }else if(Date.now()-table['tableOfflineFor']>7000){
                    this.informTableMember(io,table,false,function(dataValue){
                        var responseItem={};
                        responseItem['TEXT']="RESET_TABLE";
                        responseItem['TABLE']=table;
                        callback(responseItem);
                    })
                }else{
                    var responseItem={};
                    responseItem['TEXT']="GAME NOT READY";
                    responseItem['TABLE']=table;
                    callback(responseItem);
                }
            }
        }
        
        this.clietSideTableMapper = function(io,table,userItem,startTurn){
            console.log("AJ. Timer chnage User: "+userItem+" status: "+startTurn);
            if(userItem=="firstUser"){
                if(table.secondUser!=undefined){
                    if(startTurn){
                        io.to(table.secondUser.socketId).emit("START_OTHER_TURN","3")
                    }else{
                        io.to(table.secondUser.socketId).emit("STOP_OTHER_TURN","3")
                    }
                }
                if(table.thirdUser!=undefined){
                    if(startTurn){
                        io.to(table.thirdUser.socketId).emit("START_OTHER_TURN","1")
                    }else{
                        io.to(table.thirdUser.socketId).emit("STOP_OTHER_TURN","1")
                    }
                }
                if(table.fourthUser!=undefined){
                    if(startTurn){
                        io.to(table.fourthUser.socketId).emit("START_OTHER_TURN","2")
                    }else{
                        io.to(table.fourthUser.socketId).emit("STOP_OTHER_TURN","2")
                    }
                }
                if(table.fifthUser!=undefined){
                    if(startTurn){
                        io.to(table.fifthUser.socketId).emit("START_OTHER_TURN","4")
                    }else{
                        io.to(table.fifthUser.socketId).emit("STOP_OTHER_TURN","4")
                    }
                }
            }else if(userItem=="secondUser"){
                if(table.firstUser!=undefined){
                    if(startTurn){
                        io.to(table.firstUser.socketId).emit("START_OTHER_TURN","4")
                    }else{
                        io.to(table.firstUser.socketId).emit("STOP_OTHER_TURN","4")
                    }
                }if(table.thirdUser!=undefined){
                    if(startTurn){
                        io.to(table.thirdUser.socketId).emit("START_OTHER_TURN","3")
                    }else{
                        io.to(table.thirdUser.socketId).emit("STOP_OTHER_TURN","3")
                    }
                }
                if(table.fourthUser!=undefined){
                    if(startTurn){
                        io.to(table.fourthUser.socketId).emit("START_OTHER_TURN","1")
                    }else{
                        io.to(table.fourthUser.socketId).emit("STOP_OTHER_TURN","1")
                    }
                }if(table.fifthUser!=undefined){
                    if(startTurn){
                        io.to(table.fifthUser.socketId).emit("START_OTHER_TURN","2")
                    }else{
                        io.to(table.fifthUser.socketId).emit("STOP_OTHER_TURN","2")
                    }
                }
            }else if(userItem=="thirdUser"){
                if(table.firstUser!=undefined){
                    if(startTurn){
                        io.to(table.firstUser.socketId).emit("START_OTHER_TURN","2")
                    }else{
                        io.to(table.firstUser.socketId).emit("STOP_OTHER_TURN","2")
                    }
                }
                if(table.secondUser!=undefined){
                    if(startTurn){
                        io.to(table.secondUser.socketId).emit("START_OTHER_TURN","4")
                    }else{
                        io.to(table.secondUser.socketId).emit("STOP_OTHER_TURN","4")
                    }
                }
                if(table.fourthUser!=undefined){
                    if(startTurn){
                        io.to(table.fourthUser.socketId).emit("START_OTHER_TURN","3")
                    }else{
                        io.to(table.fourthUser.socketId).emit("STOP_OTHER_TURN","3")
                    }
                }
                if(table.fifthUser!=undefined){
                    if(startTurn){
                        io.to(table.fifthUser.socketId).emit("START_OTHER_TURN","1")
                    }else{
                        io.to(table.fifthUser.socketId).emit("STOP_OTHER_TURN","1")
                    }
                }
            }else if(userItem=="fourthUser"){
                if(table.firstUser!=undefined){
                    if(startTurn){
                        io.to(table.firstUser.socketId).emit("START_OTHER_TURN","1")
                    }else{
                        io.to(table.firstUser.socketId).emit("STOP_OTHER_TURN","1")
                    }
                }
                if(table.secondUser!=undefined){
                    if(startTurn){
                        io.to(table.secondUser.socketId).emit("START_OTHER_TURN","2")
                    }else{
                        io.to(table.secondUser.socketId).emit("STOP_OTHER_TURN","2")
                    }
                }
                if(table.thirdUser!=undefined){
                    if(startTurn){
                        io.to(table.thirdUser.socketId).emit("START_OTHER_TURN","4")
                    }else{
                        io.to(table.thirdUser.socketId).emit("STOP_OTHER_TURN","4")
                    }
                }if(table.fifthUser!=undefined){
                    if(startTurn){
                        io.to(table.fifthUser.socketId).emit("START_OTHER_TURN","3")
                    }else{
                        io.to(table.fifthUser.socketId).emit("STOP_OTHER_TURN","3")
                    }
                }
            }else if(userItem=="fifthUser"){
                if(table.firstUser!=undefined){
                    if(startTurn){
                        io.to(table.firstUser.socketId).emit("START_OTHER_TURN","3")
                    }else{
                        io.to(table.firstUser.socketId).emit("STOP_OTHER_TURN","3")
                    }
                }
                if(table.secondUser!=undefined){
                    if(startTurn){
                        io.to(table.secondUser.socketId).emit("START_OTHER_TURN","1")
                    }else{
                        io.to(table.secondUser.socketId).emit("STOP_OTHER_TURN","1")
                    }
                }
                if(table.thirdUser!=undefined){
                    if(startTurn){
                        io.to(table.thirdUser.socketId).emit("START_OTHER_TURN","2")
                    }else{
                        io.to(table.thirdUser.socketId).emit("STOP_OTHER_TURN","2")
                    }
                }
                if(table.fourthUser!=undefined){
                    if(startTurn){
                        io.to(table.fourthUser.socketId).emit("START_OTHER_TURN","4")
                    }else{
                        io.to(table.fourthUser.socketId).emit("STOP_OTHER_TURN","4")
                    }
                }
            }
            if(startTurn){
                io.to(table[userItem].socketId).emit("START_SELF_TURN","");
            }else{
                io.to(table[userItem].socketId).emit("STOP_SELF_TURN","");
            }
        }

        this.turnHandler = function(io,table,callback){
            if(table['firstUser']!=undefined && table['firstUser']['status']=="ONLINE"){
                table.userTurn['userId']="firstUser";
                this.clietSideTableMapper(io,table,"firstUser",true);
                callback("firstUser");
            }else if(table['secondUser']!=undefined &&table['secondUser']['status']=="ONLINE"){
                table.userTurn['userId']="secondUser";
                this.clietSideTableMapper(io,table,"secondUser",true);
                callback("secondUser");
            }else if(table['thirdUser']!=undefined &&table['thirdUser']['status']=="ONLINE"){
                table.userTurn['userId']="thirdUser";
                this.clietSideTableMapper(io,table,"thirdUser",true);
                callback("thirdUser");
            }else if(table['fourthUser']!=undefined &&table['fourthUser']['status']=="ONLINE"){
                table.userTurn['userId']="fourthUser";
                this.clietSideTableMapper(io,table,"fourthUser",true);
                callback("fourthUser");
            }else if(table['fifthUser']!=undefined &&table['fifthUser']['status']=="ONLINE"){
                table.userTurn['userId']="fifthUser";
                this.clietSideTableMapper(io,table,"fifthUser",true);
                callback("fifthUser");
            }else{
                callback("0");
            }
        }
        
        this.checkIsTableAtEnd = function(table){
            var pendingPlayer=0;
            if(table['firstUser']!=undefined && table['firstUser']['status']=="ONLINE"
                && table['firstUser']['cardStatus']!="PACKED"){
                    pendingPlayer=pendingPlayer+1;
            }
            if(table['secondUser']!=undefined && table['secondUser']['status']=="ONLINE"
                && table['secondUser']['cardStatus']!="PACKED"){
                    pendingPlayer=pendingPlayer+1;
            }
            if(table['thirdUser']!=undefined && table['thirdUser']['status']=="ONLINE"
                && table['thirdUser']['cardStatus']!="PACKED"){
                    pendingPlayer=pendingPlayer+1;
            }
            if(table['fourthUser']!=undefined && table['fourthUser']['status']=="ONLINE"
                && table['fourthUser']['cardStatus']!="PACKED"){
                    pendingPlayer=pendingPlayer+1;
            }
            if(table['fifthUser']!=undefined && table['fifthUser']['status']=="ONLINE"
                && table['fifthUser']['cardStatus']!="PACKED"){
                    pendingPlayer=pendingPlayer+1;
            }
            if(pendingPlayer>1){
                if(table['maxTableCost']>table['currentTableCost']){
                    return true;
                }else{
                    console.log("1. Conclude Winner")
                    return false;
                }
            }else{
                console.log("2. Conclude Winner")
                return false;
            }
        }

        this.nextTurnHandler = function(io,table,callback){
            
            if(this.checkIsTableAtEnd(table)){
                var arrayOfUser=[];
                console.log("AJ. Current User: "+table.userTurn.userId);
                switch(table.userTurn.userId){
                    case "firstUser":
                        arrayOfUser.push(["secondUser"]);
                        arrayOfUser.push(["thirdUser"]);
                        arrayOfUser.push(["fourthUser"]);
                        arrayOfUser.push(["fifthUser"]);
                        arrayOfUser.push(["firstUser"]);
                    break;
                    case "secondUser":
                        arrayOfUser.push(["thirdUser"]);
                        arrayOfUser.push(["fourthUser"]);
                        arrayOfUser.push(["fifthUser"]);
                        arrayOfUser.push(["firstUser"]);
                        arrayOfUser.push(["secondUser"]);
                    break;
                    case "thirdUser":
                        arrayOfUser.push(["fourthUser"]);
                        arrayOfUser.push(["fifthUser"]);
                        arrayOfUser.push(["firstUser"]);
                        arrayOfUser.push(["secondUser"]);
                        arrayOfUser.push(["thirdUser"]);
                    break;
                    case "fourthUser":
                        arrayOfUser.push(["fifthUser"]);
                        arrayOfUser.push(["firstUser"]);
                        arrayOfUser.push(["secondUser"]);
                        arrayOfUser.push(["thirdUser"]);
                        arrayOfUser.push(["fourthUser"]);
                    break;
                    case "fifthUser":
                        arrayOfUser.push(["firstUser"]);
                        arrayOfUser.push(["secondUser"]);
                        arrayOfUser.push(["thirdUser"]);
                        arrayOfUser.push(["fourthUser"]);
                        arrayOfUser.push(["fifthUser"]);
                    break;
                }
                var isSent=0;
                
                if(table[arrayOfUser[0]]!=undefined && table[arrayOfUser[0]]['status']=="ONLINE" 
                    && table.userTurn['userId']!=arrayOfUser[0] && table[arrayOfUser[0]]['cardStatus']!="PACKED"){
                        isSent=isSent+1;
                    table.userTurn['userId']=arrayOfUser[0]+"";
                    this.clietSideTableMapper(io,table,arrayOfUser[0],true);
                    callback(arrayOfUser[0]+"");
                }else if(table[arrayOfUser[1]]!=undefined &&table[arrayOfUser[1]]['status']=="ONLINE" 
                    && table.userTurn['userId']!=arrayOfUser[1] && table[arrayOfUser[1]]['cardStatus']!="PACKED"){
                        isSent=isSent+1;
                    table.userTurn['userId']=arrayOfUser[1]+"";
                    this.clietSideTableMapper(io,table,arrayOfUser[1],true);
                    callback(arrayOfUser[1]+"");
                }else if(table[arrayOfUser[2]]!=undefined &&table[arrayOfUser[2]]['status']=="ONLINE" 
                    && table.userTurn['userId']!=arrayOfUser[2]  && table[arrayOfUser[2]]['cardStatus']!="PACKED"){
                        isSent=isSent+1;
                    table.userTurn['userId']=arrayOfUser[2]+"";
                    this.clietSideTableMapper(io,table,arrayOfUser[2],true);
                    callback(arrayOfUser[2]+"");
                }else if(table[arrayOfUser[3]]!=undefined &&table[arrayOfUser[3]]['status']=="ONLINE" 
                    && table.userTurn['userId']!=arrayOfUser[3] && table[arrayOfUser[3]]['cardStatus']!="PACKED"){
                        isSent=isSent+1;
                    table.userTurn['userId']=arrayOfUser[3]+"";
                    this.clietSideTableMapper(io,table,arrayOfUser[3],true);
                    callback(arrayOfUser[3]+"");
                }else if(table[arrayOfUser[4]]!=undefined &&table[arrayOfUser[4]]['status']=="ONLINE" 
                    && table.userTurn['userId']!=arrayOfUser[4] && table[arrayOfUser[4]]['cardStatus']!="PACKED"){
                        isSent=isSent+1;
                    table.userTurn['userId']=arrayOfUser[4]+"";
                    this.clietSideTableMapper(io,table,arrayOfUser[4],true);
                    callback(arrayOfUser[4]+"");
                }
                if(isSent==0){
                    console.log("Table: "+JSON.stringify(table));
                    console.log("AJ. No User Left");
                    //this.removeUsersFromTable(io,table);
                    callback("0");
                }else{
                    console.log("AJ. Sent To: "+isSent);
                }
            }else{
                console.log("AJ. Table At end");
                //this.removeUsersFromTable(io,table);
                callback("0");
            }
        }

        this.removeUsersFromTable=function(io,table){
            var userWithOutPackandOnline=0;
            var UsersToResultOut=[];
            if(table.firstUser!=undefined && table.firstUser.status=="ONLINE" && table.firstUser.cardStatus!="PACKED"){
                userWithOutPackandOnline=userWithOutPackandOnline+1;
                let item={};
                item['id']="firstUser"
                item['set']=table.firstUser.cards;
                UsersToResultOut.push(item);
            }
            if(table.secondUser!=undefined && table.secondUser.status=="ONLINE" && table.secondUser.cardStatus!="PACKED"){
                userWithOutPackandOnline=userWithOutPackandOnline+1;
                let item={};
                item['id']="secondUser"
                item['set']=table.secondUser.cards;
                UsersToResultOut.push(item);
            }
            if(table.thirdUser!=undefined && table.thirdUser.status=="ONLINE" && table.thirdUser.cardStatus!="PACKED"){
                userWithOutPackandOnline=userWithOutPackandOnline+1;
                let item={};
                item['id']="thirdUser"
                item['set']=table.thirdUser.cards;
                UsersToResultOut.push(item);
            }
            if(table.fourthUser!=undefined && table.fourthUser.status=="ONLINE" && table.fourthUser.cardStatus!="PACKED"){
                userWithOutPackandOnline=userWithOutPackandOnline+1;
                let item={};
                item['id']="fourthUser"
                item['set']=table.fourthUser.cards;
                UsersToResultOut.push(item);
            }
            if(table.fifthUser!=undefined && table.fifthUser.status=="ONLINE" && table.fifthUser.cardStatus!="PACKED"){
                userWithOutPackandOnline=userWithOutPackandOnline+1;
                let item={};
                item['id']="fifthUser"
                item['set']=table.fifthUser.cards;
                UsersToResultOut.push(item);
            }
            if(userWithOutPackandOnline==0){
                //No players Left
                console.log("No User for WINNER");
            }else if(userWithOutPackandOnline==1){
                //Onely one left and Winner
                var winnerCard ={};
                winnerCard['id']=UsersToResultOut[0]['id'];
                winnerCard['typeName']="Single Player";
                return winnerCard;
                console.log("ONE User for WINNER");
            }else{

                var cardComparer = require('../controller/compareCard.js');
                var winnerCard = cardComparer.getGreatest(UsersToResultOut);
                console.log(JSON.stringify(winnerCard));

                return winnerCard;

                // if(table.firstUser!=undefined){
                //     io.to(table.firstUser.socketId).emit("EXIT_GAME","STOP GAME");
                // }
                // if(table.secondUser!=undefined){
                //     io.to(table.secondUser.socketId).emit("EXIT_GAME","STOP GAME");
                // }
                // if(table.thirdUser!=undefined){
                //     io.to(table.thirdUser.socketId).emit("EXIT_GAME","STOP GAME");
                // }
                // if(table.fourthUser!=undefined){
                //     io.to(table.fourthUser.socketId).emit("EXIT_GAME","STOP GAME");
                // }
                // if(table.fifthUser!=undefined){
                //     io.to(table.fifthUser.socketId).emit("EXIT_GAME","STOP GAME");
                // }

                //check KIND cards
                // for(var i=0;i<UsersToResultOut.length;i++){
                //     if(UsersToResultOut[i].cards.length>0){
                //         if(UsersToResultOut[i].cards[0]['id']==UsersToResultOut[i].cards[1]['id']==UsersToResultOut[i].cards[2]['id']){
                //             quallifier.push(UsersToResultOut[i])
                //         }
                //     }
                // }
                // if(quallifier.length>0){

                // }else{
                    
                // }
                // console.log("AJ. ")

                // var checkUnique=function(usersList){
                //     let quallifier=[];
                //     for(var i=0;i<usersList.length;i++){
                //         if(usersList[i].cards.length>0){
                //             if(usersList[i].cards[0]['id']==usersList[i].cards[1]['id']==usersList[i].cards[2]['id']){
                //                 quallifier.push(usersList[i])
                //             }
                //         }
                //     }
                //     return quallifier;
                // }

                // var checkSequesce=function(usersList){
                //     let quallifier=[];
                //     for(var i=0;i<usersList.length;i++){
                //         if(usersList[i].cards.length>0){
                //             if(usersList[i].cards[0]['id']==usersList[i].cards[1]['id']==usersList[i].cards[2]['id']){
                //                 quallifier.push(usersList[i])
                //             }
                //         }
                //     }
                //     return quallifier;
                // }
            }

        }

        this.sendToastToPlayers = function(io,table,message){
            if(table.firstUser!=undefined ){
                io.to(table.firstUser.socketId).emit("TOAST",message);
            }
            if(table.secondUser!=undefined ){
                io.to(table.secondUser.socketId).emit("TOAST",message);
            }
            if(table.thirdUser!=undefined ){
                io.to(table.thirdUser.socketId).emit("TOAST",message);
            }
            if(table.fourthUser!=undefined ){
                io.to(table.fourthUsersocketId).emit("TOAST",message);
            }
            if(table.fifthUser!=undefined ){
                io.to(table.fifthUser.socketId).emit("TOAST",message);
            }
        }

        this.sendBalanceToAll = function(io,table){
            if(table.firstUser!=undefined ){
                var costData={};
                costData['minBetCost']=table['minBetCost'];
                costData['currentTableCost']=table['currentTableCost'];
                costData['maxTableCost']=table['maxTableCost'];
                costData['yourBet']=table.firstUser['points'];
                io.to(table.firstUser.socketId).emit("COST",JSON.stringify(costData));
            }
            if(table.secondUser!=undefined ){
                var costData={};
                costData['minBetCost']=table['minBetCost'];
                costData['currentTableCost']=table['currentTableCost'];
                costData['maxTableCost']=table['maxTableCost'];
                costData['yourBet']=table.secondUser['points'];
                io.to(table.secondUser.socketId).emit("COST",JSON.stringify(costData));
            }
            if(table.thirdUser!=undefined ){
                var costData={};
                costData['minBetCost']=table['minBetCost'];
                costData['currentTableCost']=table['currentTableCost'];
                costData['maxTableCost']=table['maxTableCost'];
                costData['yourBet']=table.thirdUser['points'];
                io.to(table.thirdUser.socketId).emit("COST",JSON.stringify(costData));
            }
            if(table.fourthUser!=undefined ){
                var costData={};
                costData['minBetCost']=table['minBetCost'];
                costData['currentTableCost']=table['currentTableCost'];
                costData['maxTableCost']=table['maxTableCost'];
                costData['yourBet']=table.fourthUser['points'];
                io.to(table.fourthUsersocketId).emit("COST",JSON.stringify(costData));
            }
            if(table.fifthUser!=undefined ){
                var costData={};
                costData['minBetCost']=table['minBetCost'];
                costData['currentTableCost']=table['currentTableCost'];
                costData['maxTableCost']=table['maxTableCost'];
                costData['yourBet']=table.fifthUser['points'];
                io.to(table.fifthUser.socketId).emit("COST",JSON.stringify(costData));
            }
        }

        this.deductPointFromAll = function(table,query,callback){
            table['currentTableCost']=table['currentTableCost'];
            var count=0;
            var queryAndFunction=function(tableReplicate,playerId,callbackInner){
                tableReplicate[playerId]['points']=tableReplicate[playerId]['points']-tableReplicate['minBetCost'];
                tableReplicate['currentTableCost']=tableReplicate['currentTableCost']+tableReplicate['minBetCost'];
                // query.query("INSERT INTO `credit_debit` (`user_id`, `type`, `amount`, `comment`, `table_id`, `time`) VALUES ("+tableReplicate[playerId].id+", '1', "+tableReplicate['minBetCost']+", 'TABLE ENTRY FEE', '"+tableReplicate.tableId+"', "+Date.now()+")",function(resultData){
                //     callbackInner(tableReplicate);
                // })
                callbackInner(tableReplicate);
            }
            if(table.firstUser!=undefined  && table['firstUser']['status']=="ONLINE"){
                count=count+1;
                queryAndFunction(table,"firstUser",function(data){
                    count=count-1;
                    if(count==0){
                        callback(data);
                    }
                })
                
            }
            if(table.secondUser!=undefined && table['secondUser']['status']=="ONLINE"){
                count=count+1;
                queryAndFunction(table,"secondUser",function(data){
                    count=count-1;
                    if(count==0){
                        callback(data);
                    }
                })
            }
            if(table.thirdUser!=undefined && table['thirdUser']['status']=="ONLINE"){
                count=count+1;
                queryAndFunction(table,"thirdUser",function(data){
                    count=count-1;
                    if(count==0){
                        callback(data);
                    }
                })
            }
            if(table.fourthUser!=undefined && table['fourthUser']['status']=="ONLINE"){
                count=count+1;
                queryAndFunction(table,"fourthUser",function(data){
                    count=count-1;
                    if(count==0){
                        callback(data);
                    }
                })
            }
            if(table.fifthUser!=undefined && table['fifthUser']['status']=="ONLINE"){
                count=count+1;
                queryAndFunction(table,"fifthUser",function(data){
                    count=count-1;
                    if(count==0){
                        callback(data);
                    }
                })
            }
        }

        this.deductPointFromSingle = function(table,playerNo,query,callback){
            table['currentTableCost']=table['currentTableCost'];
            if(table[playerNo]!=undefined  && table[playerNo]['status']=="ONLINE"
                && table[playerNo]['cardStatus']!="PACKED"){
                if(table[playerNo].cardStatus=="SEEN"){
                    var twiceValue=table['minBetCost']+table['minBetCost'];
                    table[playerNo]['points']=table[playerNo]['points']-twiceValue;
                    table['currentTableCost']=table['currentTableCost']+twiceValue;
                    // query.query("INSERT INTO `credit_debit` (`user_id`, `type`, `amount`, `comment`, `table_id`, `time`) VALUES ("+table[playerNo].id+", '1', "+twiceValue+", 'CHAL', '"+table.tableId+"', "+Date.now()+")",function(resultData){
                    //     callback(table);
                    // })
                    callback(table);
                }else{
                    table[playerNo]['points']=table[playerNo]['points']-table['minBetCost'];
                    table['currentTableCost']=table['currentTableCost']+table['minBetCost'];
                    // query.query("INSERT INTO `credit_debit` (`user_id`, `type`, `amount`, `comment`, `table_id`, `time`) VALUES ("+table[playerNo].id+", '1', "+twiceValue+", 'CHAL', '"+table.tableId+"', "+Date.now()+")",function(resultData){
                    //     callback(table);
                    // })
                    callback(table);
                }
            }
            
        }

    } 