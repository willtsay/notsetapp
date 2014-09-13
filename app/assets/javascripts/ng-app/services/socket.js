angular.module('notSetApp')
  .factory('socket', function($rootScope) {
    var socket=io.connect()
    return {
      on: function(eventName, callback){
        
      }
    }
  })