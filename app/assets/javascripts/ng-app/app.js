angular
  .module('notSetApp', [
      'ngAnimate',
      'ui.router',
      'templates'
  ]).config(function ($stateProvider, $urlRouterProvider, $locationProvider){
    $stateProvider
      .state('notSet', {
        url: '/',
        templateUrl: 'notSet.html',
        controller: 'notSetCtrl'
      })
    $urlRouterProvider.otherwise('/')
    $locationProvider.html5Mode(true)
  })