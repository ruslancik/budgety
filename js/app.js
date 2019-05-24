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

var data = {

    allItems : {
        exp: [],
        inc: []
    },

    total : {
        exp: 0,
        inc: 0
    }
}

return {
    addItem : function(type, desc, val){
        var newItem, ID;

        //create new ID
        if(data.allItems[type].length > 0) {
           
            ID = data.allItems[type][data.allItems[type].length -1].id + 1;
     
        } else {
            ID = 0;
        }

        //create new Item based on 'inc' and 'exp'

        if(type === 'exp'){

            newItem = new Expense(ID, desc,val);

        } else if (type === 'inc'){

            newItem = new Income(ID,desc,val);
        }

        // push the item to the array
        data.allItems[type].push(newItem);
        //return the new item
        return newItem;

    },

    testing: function(){
        console.log(data);
    }
};


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
    
    var input, newItem;

    // 1. Get input data
    input = UICtrl.getInput();
    // 2. Add the item to budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    console.log(newItem);
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







