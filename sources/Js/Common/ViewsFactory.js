var App = App || {};

(function () {

    'use strict';

    var viewFactory = {
        CurrentView: null,
        CurrentName: null,
        Dashboard: function () {
            var view = new App.Views.DashboardView({
                el: $('#dashboardPage'),
            });
            return this.RenderView.call(this, view);
        },
        Login: function () {
            var model = new App.Models.LoginModel();
            var view = new App.Views.LoginView({
                el: $('.content'),
                model: model
            });
            return this.RenderView.call(this, view);
        },
        RenderView: function (view) {
            try {
                this.CurrentView && this.DestroyViewAndSubViews(this.CurrentView);
                this.CurrentView = view.render();
                return this.CurrentView;
            } catch (err) {
                var cn = (view && view.el) ? view.el.className : "";
                console.error('viewFactory -  render error in view class name: ' + cn + '\n' +
                        'error message: ' + err);
            }
        },
        DestroyViewAndSubViews: function (view) {
            for (var subView in view.subViews) {
                var sView = view.subViews[subView];
                sView.destroyView(sView);
                view.subViews[subView] = null;
            }
            view.destroyView.call(this, view);
            view = null;
            this.CurrentView = null;
        }
    };
    App.ViewFactory = viewFactory;
})();
