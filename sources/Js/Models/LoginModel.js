App.Models.LoginModel =
     Backbone.Model.extend({
         defaults: {
             username: null,
             password: null,
         },
         authenticateUser: function (successfulCallback, failureCallback) {

             Parse.User.logIn(this.get('username'), this.get('password'), {
                 success: function (user) {
                     $.mobile.loading("hide");
                     successfulCallback();
                 },
                 error: function (user, error) {
                     $.mobile.loading("hide");
                     alert("Error: " + error.code + " " + error.message);
                 }
             });
         },
         initialize: function () {
             var context = this;

         },
         validation: {
             username: {
                 required: true,
                 msg: '* Required Field'
             },
             password: {
                 required: true,
                 minLength: 8,
                 msg: '* Required Field'

             }
         },
         parse: function (response, options) {
             return response;
         }
     });
