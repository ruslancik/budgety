// BUDGET CONTROLLER
var budgetController = (function(){

var Expense = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
};

var Income = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
}

var calculateTotal = function(type){
var sum = 0;

data.allItems[type].forEach(function(cur){
    sum += cur.value;
})

data.total[type] = sum;

};

var data = {

    allItems : {
        exp: [],
        inc: []
    },

    total : {
        exp: 0,
        inc: 0
    },

    budget : 0,
    percentage : -1
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

    calculateBudget: function(){
        // calculate total income and expenses
        calculateTotal('exp');
        calculateTotal('inc');
        //Calculate the Budget income-expenses
        data.budget = data.total.inc - data.total.exp;
        //calculate the percentage that we spent
        if(data.total.inc > 0){
            data.percentage = Math.round((data.total.exp / data.total.inc) * 100); 
        }else {
            data.percentage = -1;
        }
    },

    getBudget : function(){
        
        return {
            budget: data.budget,
            totalInc : data.total.inc,
            totalExp : data.total.exp,
            percentage: data.percentage
        }
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
        expensesCont: '.expenses__list',
        budgetLabel : '.budget__value',
        incomeLabel : '.budget__income--value',
        expensesLabel : '.budget__expenses--value',
        percentageLabel : '.budget__expenses--percentage'
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
    
    displayBudget : function(obj){

        document.querySelector(DOM.budgetLabel).textContent = obj.budget;
        document.querySelector(DOM.incomeLabel).textContent = obj.totalInc;
        document.querySelector(DOM.expensesLabel).textContent = obj.totalExp;
        document.querySelector(DOM.percentageLabel).textContent = obj.percentage + '%';
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
        budgetCtrl.calculateBudget();

    // 2. Return the budget
        var budget = budgetCtrl.getBudget();

    // 3. Display the budget
        UICtrl.displayBudget(budget);
    }

    return {
        init: function(){
            console.log('Application has started !');
            setUpEventListeners();
        }
    }



})(budgetController,UIController);

controller.init();







