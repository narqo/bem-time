module.exports = function(bh) {
    bh.match('test', function(ctx, json) {
        var datetime = new Date(ctx.content());
        ctx.content(bh.lib.fmtTime('Дата из BEMJSON: %d-%m-%Y', datetime), true);
    });
};
