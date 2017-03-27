var appInsights = require("applicationinsights");
const uuidV4 = require("uuid/v4");
var client = appInsights.getClient();

var inputModel = { first, last, email, phone };
var outputModel = {
    success: true,
    errors: [],
    message: ""
};


module.exports = function (context, data) {

    client.trackEvent("az-hipo-queue", { information: "adding a queue message from an HTTP POST" });

    for (var prop in inputModel) {

        if (!data.hasOwnProperty(prop)) {
            client.trackEvent("az-hipo-queue-error", { information: "missing field " + prop });
            outputModel.errors.push({ message: "missing field " + prop });
            outputModel.success = false;
        }

    }

    if (outputModel.success) {
        context.bindings.outQueue = { id: uuidV4(), payload: data };
    }

    context.done();
    
}