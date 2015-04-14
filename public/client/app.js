angular.module('greenfield', ['ngRoute']);

//These are the routes that are necessary for the project MVP.

angular.module('greenfield')
  .config(function($routeProvider) {
    $routeProvider
    	//Routes to the home page 
      .when('/home', {
        templateUrl: './views/homeView.html',
      })
      //Routes to the guest session view
      .when('/guest', {
        templateUrl: './views/guestMainView.html',
      })
      //Routes to the host menu
      .when('/hostMenu', {
        templateUrl: './views/hostMenu.html',
      })
      //Routes to the hosts current session
      .when('/hostSession', {
        templateUrl: './views/hostMainView.html',
      })
      //If an unknown route is entered, it redirects to the home page.
      .otherwise({
        redirectTo: '/homeView.html'
      });
  });

