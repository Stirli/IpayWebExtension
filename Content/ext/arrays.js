$.prototype.indexOf=function(selector){
    for(var i = 1; i <= this.length; i++){
        if($(this[i]).is(selector)){
            return i;
        }
    }
};
NodeList.prototype.indexOf=function(item){
    for(var i = 1; i <= this.length; i++){
        if(this[i-1]==item){
            return i;
        }
    }
};