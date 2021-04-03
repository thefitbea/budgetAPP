//FIRST MODULE: BUDGET MODULE
var BudgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    if(totalIncome > 0){
      this.percentage = Math.round((this.value/totalIncome)*100);
    }
    else{
      this.percentage = -1;
    }
  };//inheritance

  Expense.prototype.getPercentage = function(){
    return this.percentage;
  }
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(current) {
      sum += current.value; //sum = sum + current.value;
    });
    data.totals[type] = sum;
  };

  //Data structures

  var data = {

    allItems: {
      exp: [],
      inc: []
    },

    totals: {
      exp: 0,
      inc: 0
    },

    budget: 0,

    percentage: -1 //property is set to -1 to denote it doesnt exist at this time
  }

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      //creating new ID
      //we want ID = last ID + 1
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //creating new item based on type being "inc" or "exp"
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }

      //pushing it into the data structure
      data.allItems[type].push(newItem);
      // returning the new element
      return newItem;
    },

    deleteItem: function(type, id) {
      //id = 6
      //ids = [1 2 4 6 8] unsorted so we can freely delete
      //index = 3
      var ids, index;
      ids = data.allItems[type].map(function(current) {
        return current.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) { // is -1 if not found in array
        //splice method to remove elements
        data.allItems[type].splice(index, 1); //1 denotes no of elements to remove
      }
    },

    calculateBudget: function() {
      //calculate total income and expenses
      calculateTotal("exp");
      calculateTotal("inc");
      //calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;
      //calculate the percentage of income that we had already spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }

    },

    calculatePercentages: function() {

      data.allItems.exp.forEach(function(curr){
        curr.calcPercentage(data.totals.inc);
      });

    },

    getPercentages: function(){

      var allPerc = data.allItems.exp.map(function(curr){
        return curr.getPercentage();
      });
      return allPerc;

    },

    getBudget: function() { //only used to return things//get used to this
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },


    testing: function() {
      console.log(data); //only for testing purposes not for production build
    }
  };


})();



//UI MODULE
var UiController = (function() {
  //code here

  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercLabel: ".item__percentage"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be either inc for income or exp for expenses
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value) //converts string to decimal no.
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;

      //creating html string using placeholder text

      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //Replace placeholder with actual data

      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description); //becoz newHtml contains new modified string which is about to be modified again
      newHtml = newHtml.replace("%value%", obj.value);

      //Insert html into DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    deleteListItem: function(selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);//weird but thats how it works
      //    https://blog.garstasio.com/you-dont-need-jquery/dom-manipulation/
    },

    clearFields: function() {
      var fields, fieldsArr;
      fields = document.querySelectorAll(DOMstrings.inputDescription + "," + DOMstrings.inputValue);
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function(currentValue, arrayIndex, entireArray) {
        currentValue.value = ""; //resets fields to empty
      });
      fieldsArr[0].focus(); //resets back to first input box of the field for convenience

    },

    displayBudget: function(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "----";
      }
    },

    displayPercentages: function(percentages){

      var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);//returns a list called nodelist, each element is called a node in DOM

      //instead of slice hack lets create a custom forEach method only for nodelists instead of arrays

      var nodeListForEach = function(list, callback){
        for(var i = 0; i < list.length; i++){
          callback(list[i],i);
        }
      };


      nodeListForEach(fields, function(current, index){
        if(percentages[index] > 0) {
          current.textContent = percentages[index] + "%";
        }
        else{
          current.textContent = "----";
        }
      });

    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };

})();

//GLOBAL APP MODULE, TO CONTROL ALL
var AppController = (function(budgetCtrl, UiCtrl) {

  var setupEventListeners = function() {

    var DOM = UiCtrl.getDOMstrings();

    document.querySelector(DOM.inputButton).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {

      if (event.keyCode === 13 || event.which === 13) {
        //console.log("Enter is pressed!");
        ctrlAddItem();
      }

    });

    document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem); //here its DOM not DOMstringss

  };

  var updateBudget = function() {
    //1. Calculate the budget
    budgetCtrl.calculateBudget();
    //2. Return the budget
    var budget = budgetCtrl.getBudget();
    //3. Display the budget on UI
    UiCtrl.displayBudget(budget);
  };

  var updatePercentages = function() {

    //1. calculate percentage
    budgetCtrl.calculatePercentages();

    //2. read percentage from budget UiController
    var percentages = budgetCtrl.getPercentages();

    //3. update UI with new percentage
    UiCtrl.displayPercentages(percentages);

  };


  var ctrlAddItem = function() {
    var input, newItem;
    //1. Get filled in data
    input = UiCtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

      //2. Add item to budget UiController
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      //3. Add item to UI
      UiCtrl.addListItem(newItem, input.type);

      //4. Clear the fields
      UiCtrl.clearFields();

      //5. Calculate and update budget
      updateBudget();

      //6. calc and update percentage
      updatePercentages();
    }

  };

  var ctrlDeleteItem = function(event) {

    var itemID, splitID, type, ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; //DOM traversal
    if (itemID) {
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]); // is a string but we need a no. so use parse int to convert

      //1. delete item from DS
      budgetCtrl.deleteItem(type, ID);
      //2. also delete it from UI
      UiCtrl.deleteListItem(itemID);
      //3. update and show new budget
      updateBudget();//reused code, DRY principle
      //4. calc and update percentage
      updatePercentages();
    }

  };

  return {
    init: function() {
      console.log("App has started.");
      UiCtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0 // just a random obj set to zero
      });
      setupEventListeners();
    }
  }


})(BudgetController, UiController);

AppController.init(); //
