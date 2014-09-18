angular
  .module('notSetApp', [
      'ngAnimate',
      'ui.router',
      'templates', 'socket.io'
  ]).config(function ($stateProvider, $urlRouterProvider, $locationProvider, socketProvider){
    socketProvider.setConnectionUrl(getServer())
    $stateProvider
      .state('notSet', {
        url: '/',
        templateUrl: 'notSet.html',
        controller: 'notSetCtrl'
      })
      .state('multi', {
        url: '/multi',
        templateUrl: 'notSetMulti.html',
        controller: 'multiSetCtrl'
      })
    $urlRouterProvider.otherwise('/')
    $locationProvider.html5Mode(true)
  })

getServer = function(){
  if (window.location.host == "notset.herokuapp.com"){
    return "http://quiet-journey-3472.herokuapp.com/"
  } else {
    return "http://localhost:8080"
  }
}