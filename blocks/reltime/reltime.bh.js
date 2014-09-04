module.exports = function(bh) {
    bh.match('Reltime', function(ctx, json) {
        var mix = { block : 'Reltime', js : ctx.js() || true },
            mixBlock = ctx.mix();

        if(mixBlock) {
            mix = [mix].concat(mixBlock);
        }

        return {
            block : 'Datetime',
            mix : mix,
            title : json.title,
            val : json.val
        };
    });
};
