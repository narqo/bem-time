module.exports = function(bh) {

    bh.match('datetime', function(ctx, json) {
        ctx
            .tag('time')
            .js(true)
            .attr('datetime', json.val);
    });

};
