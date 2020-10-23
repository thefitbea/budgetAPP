//FIRST MODULE: BUDGET MODULE
var budgetController = (function(){
  var x=26;
  var add=function(a){
    return x+a;
  }
  return{
    publicMethod1: function(b){
      return add(b);
    }
  }
})();

//UI MODULE
var UiController = (function(){
  //code here
})();

//APP MODULE
var AppController= (function(budgetCtrl,UiCtrl){
  var z=budgetController.publicMethod1(10);

  return{
    publicMethod2: function(){
      return console.log(z);
    }
  }
})(budgetController,UiController);
