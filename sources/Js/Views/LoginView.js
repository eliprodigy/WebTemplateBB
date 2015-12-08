App.Views.LoginView =
    Backbone.View.extend({
        template: null,
        model: null,
        subViews: {},
        subViewsRegions: {
            sidePanelView: ".mainPanel"
        },
        events: {
            'click div.btnsContainer.login': 'handleLogin',
            'click span.menu': "toggelPanel",
        },

        toggelPanel: function (e) {
            e.preventDefault();
            this.$el.find(".mainPanel").panel("toggle");
        },
        handleLogin: function (e) {
            if (this.model.isValid(true)) {
                this.model.authenticateUser(function (results) {
                    App.Router.goTo('dashboard');
                }, function (results) {
                });
            }
            e.preventDefault();
        },
        initialize: function (defaults) {
            console.log('Inside initialize LoginView');
            this.options = defaults;

            _.bindAll(this, 'render', "destroyView");

            this.template = _.template($(App.TemplateManager.GetTemplate('LoginTemplate')).html());

            Backbone.Validation.bind(this);

        },
        render: function () {
            this.$el.empty().append(this.template(this.model.toJSON()));
            this.stickit();
            this.delegateEvents();
            return this;
        },
        destroyView: function () {
            console.log("Login destroy View ");


            /*handle model part */
            if (this.model != null) {
                //model stop listening to events
                Backbone.stopListening(this.model);
                this.model.destroy();
                //clear stored values
                var clearedModel = this.model.clear({ silent: true });
                //set defaults values
                this.model.set(clearedModel.defaults, { silent: true });
                Backbone.Validation.unbind(this);
            }

            // COMPLETELY UNBIND THE VIEW
            this.undelegateEvents();
            this.$el.removeData().unbind();
            this.$el.empty();
            this.stopListening();
        },
        bindings: {
            '[name=username]': {
                observe: 'username',
                setOptions: {
                    validate: true
                }
            },
            '[name=password]': {
                observe: 'password',
                setOptions: {
                    validate: false
                }
            }
        }
    });
