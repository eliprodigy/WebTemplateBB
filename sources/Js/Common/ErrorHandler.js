var App = App || {};

(function () {

    'use strict';

    var errorHandler = {
        getField: function (fieldName) {
            var $field = $('[name=' + fieldName + ']');
            if ($field.length != 0)
                return $field;
            return null;
        },
        getFieldControlGroup: function ($field) {
            return $field.parents('.form-group');
        },
        resetFieldError: function (fieldName) {
            var $controlGroup = this.getFieldControlGroup(this.getField(fieldName));
            var $controlGroupLabel = $controlGroup.find("span.help-block");
            $controlGroupLabel.text("");
        },
        init: function () {
            var context = this;

            _.extend(Backbone.Validation.callbacks, {
                valid: function (view, attr, selector) {
                    var $el = view.$el.find('[name=' + attr + ']'),
                        $group = $el.closest('.form-group');

                    $group.removeClass('has-error');
                    $group.find('.help-block').text('').addClass('hidden');
                },
                invalid: function (view, attr, error, selector) {
                    var $el = view.$el.find('[name=' + attr + ']'),
                        $group = $el.closest('.form-group');

                    $group.addClass('has-error');
                    $group.find('.help-block').text(error).removeClass('hidden');
                }
            });

            $(document).on("focus", "input", function (e) {
                var $target = $(e.currentTarget);
                var fieldName = $target.attr("name");
                if (fieldName == undefined || fieldName == "") return;
                context.resetFieldError(fieldName, this);
            });
            return this;
        }
    };
    App.ErrorHandler = errorHandler.init();
}());