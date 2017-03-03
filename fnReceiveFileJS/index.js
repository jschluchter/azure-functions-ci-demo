module.exports = function (ctx) {
    context.log('Node.js Blob trigger function processed for ', ctx.bindingData.blob + '.' + ctx.bindingData.extension);
    context.done();
};