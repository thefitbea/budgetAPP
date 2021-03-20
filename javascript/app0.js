//FIRST MODULE: BUDGET MODULE
var BudgetController = (function(){

  var Expense = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //Data structures

  var data = {

    allitems: {
      exp:[],
      inc:[]
    }

    totals:{
      exp:0,
      inc:0
    }

  }

return{
  addItem: function(){
    var newItem,ID;

    //creating new ID
    //we want ID = last ID + 1
   //ID = 0;
    ID = data.allitems[type][data.allitems.length - 1].id + 1;

    //creating new item based on type being "inc" or "exp"
    if(type === exp){
       newItem = new Expense(type,des,val);
    }
    else if(type === inc){
       newItem = new Income(type,des,val);
    }

    //pushing it into the data structure
    data.allitems[type].push(newItem);

    //returning the new element
    return newItem;

  }
};


})();



//UI MODULE
var UiController = (function(){
  //code here

  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn"
  };

  return {
    getInput: function(){
      return {
         type: document.querySelector(DOMstrings.inputType).value,// will be either inc for income or exp for expenses
         description: document.querySelector(DOMstrings.inputDescription).value,
         value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstrings: function(){
      return DOMstrings;
    }
  };

})();

//GLOBAL APP MODULE, TO CONTROL ALL
var AppController= (function(budgetCtrl,UiCtrl){

  var setupEventListeners = function(){

    var DOM = UiCtrl.getDOMstrings();

    document.querySelector(DOM.inputButton).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event){

      if(event.keyCode === 13 || event.which === 13){
        //console.log("Enter is pressed!");
        ctrlAddItem();
      }

    });

  };


  var ctrlAddItem = function() {
    var input,newItem;
    //1. Get filled in data
    input = UiCtrl.getInput();

    //2. Add item to budget UiController
    newItem = budgetCtrl.addItem(input.type,input.description,input.value);
    
    //3. Add item to UI

    //4. Calculate the budget

    //5. Display budget on UI

  }

  return{
    init: function(){
      console.log("App has started.");
      setupEventListeners();
    }
  }


})(BudgetController,UiController);

AppController.init();//
