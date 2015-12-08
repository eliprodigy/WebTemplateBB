var App = App || {};

(function () {

    'use strict';

    var router = Backbone.Router.extend({
        routes: {
            'dashboard': 'dashboard',
            'login': 'login',
            '*actions': 'defaultAction'
        },
        dashboard: function () {
            App.ViewFactory.Dashboard();
        },
        login: function () {
            App.ViewFactory.Login();
        },
        defaultAction: function (actions) {
            console.log('router defaultAction');

            this.goTo('login');

        },
        goTo: function (requestedPage) {
            this.navigate(requestedPage, {
                trigger: true
            });
        },
        initialize: function (callback) {
            Backbone.history.start();
        }
    });
    App.Router = router;
})();
