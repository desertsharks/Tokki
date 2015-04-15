var app = angular.module('greenfield', ['ui.router']);

// These are the routes that are necessary for the project MVP.

angular.module('greenfield')
  .config(function($stateProvider, $urlRouterProvider) {
  // If an unknown route is entered, it redirects to the home page.
  $urlRouterProvider.otherwise('/home');
  // Routes to the home page
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: './views/homeView.html',
      controller: 'HostController'
    })
    // Routes to the guest session view
    .state('guestSession', {
      url: '/guestSession',
      templateUrl: './views/guestSession.html',
      controller: 'GuestController'
    })
    // Routes to the host menu
    .state('hostMenu', {
      url: '/hostMenu',
      templateUrl: './views/hostMenu.html',
      controller: 'HostController'
    })
    // Routes to the hosts current session
    .state('hostSession', {
      url: '/hostSession',
      templateUrl: './views/hostSession.html',
      controller: 'HostController'
    });
});
