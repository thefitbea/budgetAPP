//FIRST MODULE: BUDGET MODULE
var budgetController = (function(){
  //code here
  //we will create a custom datatype ie objects and that too via using constructors

  var Expense=function(id,description,value){
    this.id=id;
    this.description-description;
    this.value=value;
  };//tested ok

  //will modify later, methods will be done using protoype property
  var Income=function(id,description,value){
    this.id=id;
    this.description-description;
    this.value=value;
  };


  //a datatstructure to keep track of all the objects as budget module keeps track of the budget too
  var data={
    allItems:{
      exp:[],
      inc:[]
    },//also an object_LOL_nested object
    totals:{
      exp:0,
      inc:0
    }
  }


})();



//UI MODULE
var UiController = (function(){
  //code here
  var DOMstrings= {
    inputType:".add__type",
    inputDescription:".add__description",
    inputValue:".add__value",
    inputBtn:".add__btn"
  };
  return{
    getInput: function(){//we need to return 3 values at same time so using an object to return 3
      return{
         type:document.querySelector(DOMstrings.inputType).value,//if first is selected we get value as inc else exp
         description:document.querySelector(DOMstrings.inputDescription).value,
         value:document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstrings: function(){
      return DOMstrings;
    }
  };
})();



//GLOBAL APP CONTROLLER MODULE
var AppController= (function(budgetCtrl,UiCtrl){
  //code here
  var setupEventlisteners=function(){
    var DOM=UiCtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress",function(event){
      //console.log(event);
      if(event.keycode===13 || event.which===13){
        //alert("hi");
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function(){
    //TO do list 4 later

    //1. Get filled in data
    var input=UiCtrl.getInput();
  //  console.log(input);

    //2. Add item to budget UiController

    //3. Add item to UI

    //4. Calculate the budget

    //5. Display budget on UI

    //console.log("Working Fine Bro!");
  };

  return{
    init:function(){
      //console.log("Test Ok");
      setupEventlisteners();
    }
  };

})(budgetController,UiController);

AppController.init();
