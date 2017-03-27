var appInsights = require("applicationinsights");
    appInsights.setup().start();

module.exports = function (context, data) {
    
    var client = appInsights.getClient();

    client.trackEvent("fn-event", {customProperty: "azure function nodejs webhook"});

    context.log('Webhook was triggered!');

    // Check if we got first/last properties
    if('first' in data && 'last' in data) {
        context.res = {
            body: { greeting: 'Testing for  ' + data.first + ' ' + data.last + '!'}
        };
    }
    else {
        context.res = {
            status: 400,
            body: { error: 'Please pass first/last properties in the input object'}
        };
    }

    context.done();
}


// sample url
// https://fn-jds.azurewebsites.net/api/fnWebhookJS?code=wVoiaLlQxYGN6rnzVSJa7Nv/ypTS5wlGY4yn/VmW7oJyDwAEOlYaNA==
