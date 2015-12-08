var App = App || {};

(function () {

    'use strict';

    App.TemplateManager = {
        templateArray: [
            'CombinedTemplates'
        ],
        templates: {},
        templatesDic: {},
        Initialize: function (callback) {
            var context = this;
            var loadTemplate = function (index) {
                var name = context.templateArray[index];
                console.log('Loading template: ' + name);
                $.get(name + '.html', function (data) {
                    var sliceName = name.slice(name.lastIndexOf("/") + 1, name.length);
                    console.log('sliceName template: ' + sliceName);
                    context.templates[sliceName] = data;
                    index++;
                    if (index < context.templateArray.length) {
                        loadTemplate(index);
                    } else {
                        context.SetTemplateDic();
                        callback();
                    }
                });
            };
            loadTemplate(0);
        },
        // Get template by name from hash of preloaded templates
        get: function (name) {
            return this.templates[name];
        },
        GetTemplate: function (name) {
            return this.templatesDic[name.toLowerCase()];
        },
        SetTemplateDic: function () {
            var templates = $(this.templates["CombinedTemplates"]);
            for (var i = 0; i < templates.length; i++) {
                var t = templates[i];
                if (t.className == null) continue;
                var className = t.className.toLowerCase();
                this.templatesDic[className] = t;
            }
        }
    };
})();