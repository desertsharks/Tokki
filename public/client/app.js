angular.module('tokki', ['ui.router']);

angular.module('tokki')
  .config(function($stateProvider, $urlRouterProvider) {

  // Routes to the home page.  Default to '/home'
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: './views/homeView.html',
      controller: 'LoginController'
    })
    // Routes to the guest session view
    .state('guestSession', {
      url: '/guestSession/:guestId',
      templateUrl: './views/guestSession.html',
      controller: 'GuestController'
    })
    // Routes to the host menu
    .state('hostMenu', {
      url: '/hostMenu',
      templateUrl: './views/hostMenu.html',
      controller: 'LoginController'
    })
    // Routes to the hosts current session
    .state('hostSession', {
      url: '/hostSession',
      templateUrl: './views/hostSession.html',
      controller: 'HostController'
    });

  $urlRouterProvider.otherwise('/home');
});
