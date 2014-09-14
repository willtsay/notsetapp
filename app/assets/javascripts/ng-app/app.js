angular
  .module('notSetApp', [
      'ngAnimate',
      'ui.router',
      'templates', 'socket.io'
  ]).config(function ($stateProvider, $urlRouterProvider, $locationProvider, socketProvider){
    socketProvider.setConnectionUrl('http://localhost:8080')
    $stateProvider
      .state('notSet', {
        url: '/',
        templateUrl: 'notSet.html',
        controller: 'notSetCtrl'
      })
    $urlRouterProvider.otherwise('/')
    $locationProvider.html5Mode(true)
  })