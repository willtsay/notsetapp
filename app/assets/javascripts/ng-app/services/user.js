angular.module('notSetApp')
  .service('User', ['$rootScope', '$resource', User])

function User($rootScope, $resource){
  var service = {
    name: $resource('/name')
  }
  return service
}