var budgetController = (function(){

    var x = 20 ; 

    var add = function(a){
        return a + x;
    }

    return {
        publicTest : function(){
            return add(12);
        }
    }

})();


var UIController = (function(){

// some code

})();

var controller = (function(budgetCtrl, UICtrl){


return {
    anotherPublicTest : function(){
       console.log(budgetCtrl.publicTest());
    }
}

})(budgetController,UIController);









