var app = angular.module('greenfield', ['ui.router']);

//These are the routes that are necessary for the project MVP.

app.config(function($stateProvider, $urlRouterProvider) {
  //If an unknown route is entered, it redirects to the home page.
  $urlRouterProvider.otherwise('/home');
  //Routes to the home page 
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: './views/homeView.html'
    })
    //Routes to the guest session view
    .state('guestSession', {
      url: '/guestSession',
      templateUrl: './views/guestSession.html'
    })
    //Routes to the host menu
    .state('hostMenu', {
      url: '/hostMenu',
      templateUrl: './views/hostMenu.html'
    })
    //Routes to the hosts current session
    .state('hostSession', {
      url: '/hostSession',
      templateUrl: './views/hostSession.html'
    });
});

