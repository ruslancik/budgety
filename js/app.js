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
        inputBtn : '.add__btn',
        incomeCont : '.income__list',
        expensesCont: '.expenses__list'
    };

return {

    getInput : function(){
        
        return {
            type: document.querySelector(DOM.inputType).value,
            description : document.querySelector(DOM.inputDesc).value,
            value : parseFloat(document.querySelector(DOM.inputValue).value)
        }
    },

    addListItem: function(obj, type){
        var html, newHtml, element;



        //Create new Html String
        if(type === 'inc'){
            element = DOM.incomeCont;
            html ='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else if (type === 'exp'){
            element = DOM.expensesCont;
            html ='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }

        //replace place holder text with actual date
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);

        // Adding Dom manupilation

        document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);



    },

    clearFields : function(){
        var fields;

        fields = document.querySelectorAll(DOM.inputDesc + ', ' + DOM.inputValue);

        var fieldsArr = Array.prototype.slice.call(fields);

        fieldsArr.forEach(function(current, index, array){
            current.value = '';            
        });

        fieldsArr[0].focus();

    },

    getDOM : function(){
        return DOM;
    }
};

})();

// GLOBAL APP CONTROLLER
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

    if(input.description !== '' && !isNaN(input.value) && input.value > 0){

    // 2. Add the item to budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // 3. add the item to the UI controller
    UIitem = UICtrl.addListItem(newItem, input.type);
    // 4. Clear Fields
    UICtrl.clearFields();
    // 5. Update the Budget
    updateBudget();

        }
    }

    var updateBudget = function(){
    
    // 1. Calculate the budgets


    // 2. Return the budget
    
    
    // 3. Display the budget


    }

    return {
        init: function(){
            console.log('Application has started !');
            setUpEventListeners();
        }
    }



})(budgetController,UIController);

controller.init();







