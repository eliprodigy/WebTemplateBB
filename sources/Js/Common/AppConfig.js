/*global Backbone */
var App = App || {};

(function () {

    'use strict';

    App.Config = {
        initialize: function () {
            //$.support.cors = true;
            //$.mobile.allowCrossDomainPages = true;

            Parse.initialize("47XajlPzBCArJHPb0LKQA42sbTE5Fn9lKnCeTUrN", "rWfuUvSymHFglY8S09VaO3I6h2ihR4LnexBth6Y9");
            Parse.User.logOut();//clear parse 

            /*remove case-insensitive from jQuery contains*/
            $.expr[":"].contains = $.expr.createPseudo(function (arg) {
                return function (elem) {
                    return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
                };
            });


            /*Validation - put dirty code in model*/
            Backbone.Validation.configure({
                forceUpdate: true
            });

        }
    };
})();