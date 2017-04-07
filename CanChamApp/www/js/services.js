angular.module('starter.services', [])


.service('UserService', function() { 

//for the purpose of this example I will store user data on ionic local storage but you should save it on a database

  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  /*var setEmailUser = function(username, password) {
    window.localStorage.setItem("username", JSON.stringify(username));
    window.localStorage.setItem("password", JSON.stringify(password));
  };

  var getEmailUser = function() {
    if(JSON.parse(window.localStorage.getItem("username")) !== undefined && JSON.parse(window.localStorage.getItem("password")) !== undefined) {
          return true;
      } else {
          return false;
      }
  };*/

  return {
    getUser: getUser,
    setUser: setUser
    //getEmailUser: getEmailUser,
    //getEmailUser: getEmailUser
  };
})

.factory('Events', function($q) {
         
         var incrementDate = function (date, amount) {
         var tmpDate = new Date(date);
         tmpDate.setDate(tmpDate.getDate() + amount)
         return tmpDate;
         };
         
         //create fake events, but make it dynamic so they are in the next week
         var fakeEvents = [];
         fakeEvents.push(
                         {
                         "title":"CanCham Day",
                         "description":"CanCham Day es el evento anual más importante de la Cámara de Comercio del Canadá en México. Durante el mismo, se tratan diferentes temáticas sobre la inversión canadiense en nuestro país y viceversa.",
                         "date":incrementDate(new Date(), 1)
                         }
                         );
         fakeEvents.push(
                         {
                         "title":"Meetup on Beer",
                         "description":"We'll talk about Ionic, not Beer.",
                         "date":incrementDate(new Date(), 2)
                         }
                         );
         fakeEvents.push(
                         {
                         "title":"Ray's Birthday Bash",
                         "description":"Celebrate the awesomeness of Ray",
                         "date":incrementDate(new Date(), 4)
                         }
                         );
         fakeEvents.push(
                         {
                         "title":"Code Review",
                         "description":"Let's tear apart Ray's code.",
                         "date":incrementDate(new Date(), 5)
                         }   
                         );
         
         var getEvents = function() {
         var deferred = $q.defer();
         deferred.resolve(fakeEvents);
         return deferred.promise;
         }
         
         return {
         get:getEvents
         };
         
});
