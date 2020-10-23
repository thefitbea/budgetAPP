//FIRST MODULE: BUDGET MODULE
var budgetController = (function(){
  //code here
})();



//UI MODULE
var UiController = (function(){
  //code here
})();



//APP MODULE
var AppController= (function(budgetCtrl,UiCtrl){
  //code here
  var ctrlAddItem = function(){
    //TO do list 4 later
    //1. Get filled in data
    //2. Add item to budget UiController
    //3. Add item to UI
    //4. Calculate the budget
    //5. Display budget on UI
    console.log("Working Fine Bro!");
  }
  document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);
  document.addEventListener("keypress",function(event){
    //console.log(event);
    if(event.keycode===13 || event.which===13){
      //alert("hi");
      ctrlAddItem();
    }
  });
})(budgetController,UiController);
