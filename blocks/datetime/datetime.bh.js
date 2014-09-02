module.exports = function(bh) {
    bh.match('datetime', function(ctx, json) {
        ctx
            .tag('time')
            .js(true)
            .attrs({
                datetime : json.val,
                title : json.title
            });
    });
};
