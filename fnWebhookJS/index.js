var appInsights = require("applicationinsights");
const uuidV4 = require("uuid/v4");

appInsights.setup().start();


var client = appInsights.getClient();
module.exports = function (context, data) {
    client.trackEvent("fn-event", { customProperty: "azure function nodejs webhook" });

    // Check if we got first/last properties
    if ('first' in data && 'last' in data) {

        context.res = {
            body: { greeting: 'Testing for ' + data.first + ' ' + data.last + '!' }

        };

        context.bindings.demoDocDB = JSON.stringify({
            id: uuidV4(),
            name: data.first,
            employeeId: data.last
        });

    }
    else {

        context.res = {
            status: 400,
            body: { error: 'Please pass first/last properties in the input object' }
        };

    }

    context.done();
}

