$(document).ready(function () {
    $("span.ui-icon-loading").text("Loading");
    App.TemplateManager.Initialize(function () {
        App.Initialize();
    });
});
