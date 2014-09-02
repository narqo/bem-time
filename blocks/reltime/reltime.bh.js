module.exports = function(bh) {

    bh.match('reltime', function(ctx, json) {
        var mix = { block : reltime, js : ctx.js() || true },
            mixBlock = ctx.mix();

        if(mixBlock) {
            mix = [mix].concat(mixBlock);
        }

        return {
            block : 'datetime',
            mix : mix,
            val : json.val
        };
    });

};
