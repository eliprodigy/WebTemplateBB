/*global Backbone */
var App = App || {};

(function () {

    'use strict';

    App = {
        PreviousView: null,
        Router: null,
        CurrentLoggedInUserModel: null,
        Views: {},
        Models: {},
        Collections: {},
        ViewEvents: {},
        Initialize: function () {
            var context = this;
            App.Config.initialize();
            console.log("App- Router");
            App.Router = new App.Router();
            return context;
        }
    };
})();

