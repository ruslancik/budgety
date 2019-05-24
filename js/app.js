// BUDGET CONTROLLER
var budgetController = (function(){

var Expense = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
}

var Income = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
}

var date = {
    
    allItems : {
        exp: [],
        inc: []
    },

    total : {
        exp: 0,
        inc: 0
    }
}



})();


//UI CONTROLLER
var UIController = (function(){

    var DOM = {
        inputType : '.add__type',
        inputDesc : '.add__description',
        inputValue: '.add__value',
        inputBtn : '.add__btn'
    };

return {

    getInput : function(){
        
        return {
            type: document.querySelector(DOM.inputType).value,
            description : document.querySelector(DOM.inputDesc).value,
            value : document.querySelector(DOM.inputValue).value
        }
    },

    getDOM : function(){
        return DOM;
    }
};

})();

//GLOBAL APP CONTROLLER
var controller = (function( budgetCtrl, UICtrl){


    var setUpEventListeners = function(){
        var DOM = UICtrl.getDOM();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });

    }

    var ctrlAddItem = function(){

    // 1. Get input date
    var input = UICtrl.getInput();
    console.log(input);
    // 2. Add the item to budget controller

    // 3. add the item to the UI controller

    // 4. Calculate the budget

    // 5. Display the budget


    }

    return {
        init: function(){
            console.log('Application has started !');
            setUpEventListeners();
        }
    }



})(budgetController,UIController);

controller.init();







