var Table =function(){
    this.tableId=0;
    this.tableName=null;
    this.minBetCost=0;
    this.tableActive=false;
    this.tableOfflineFor=0;
    this.currentTableCost=0;
    this.maxTableCost=0;
    this.userTurn={};
    this.userTurn['userId']=0;
    this.userTurn['lastTime']=null;
    this.firstUser=undefined;
    this.secondUser=undefined;
    this.thirdUser=undefined;
    this.fourthUser=undefined;
    this.fifthUser=undefined;
}
module.exports=Table;