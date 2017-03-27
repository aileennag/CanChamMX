angular.module('services', [])

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
});