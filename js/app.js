(function(){
  var gem = { name: 'Azurite', price: 2.95 };
  var app = angular.module('Helios', []);
  /*app.controller('StoreController',function(){
    this.product=gem;
  });*/
  app.controller('StoreController', function(){
    this.products=gems;
  });
  
  app.controller('TabController',function(){
  	this.tab=1;
    this.setTab=function(a){
      this.tab=a;
    };
    this.isSet=function(a){
     	return this.tab===a; 
    };
  });
  
	app.controller('listOfRequirements', function() {
    this.review = {};

    this.addReview = function(product) {
      product.reviews.push(this.review);

      this.review = {};
    };
  });
  

  var gems = [
    { name: 'Azurite', price: 2.95 },
    { name: 'Bloodstone', price: 5.95 },
    { name: 'Zircon', price: 3.95 },
  ];
})();