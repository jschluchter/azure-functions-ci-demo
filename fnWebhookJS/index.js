var appInsights = require("applicationinsights");


module.exports = function (context, data) {
    
    appInsights.setup("111ad0d5-4a72-44aa-a2d5-0f58e2e4bb5a").start();
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
