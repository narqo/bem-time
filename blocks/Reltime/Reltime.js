modules.define('Reltime',
    ['i-bem__dom', 'tick', 'next-tick', 'Datetime', 'fmtTime'],
    function(provide, bemDom, tick, nextTick, Datetime, fmtTime) {

var TICK_INTERVAL = 6000,
    instances = [],
    boundToTick = false,
    lastTime = 0,
    bindToTick = function() {
        boundToTick = true;
        tick.on('tick', update).start();
    },
    unbindFromTick = function() {
        tick.un('tick', update).stop();
        boundToTick = false;
        lastTime = 0;
    },
    update = function() {
        var now = Date.now();
        if(now - lastTime - TICK_INTERVAL >= 0) {
            lastTime = now;
            scheduleUpdate(function() {
                var instance, i = 0;
                while(instance = instances[i++]) {
                    instance._onTick(lastTime);
                }
            });
        }
    },
    scheduleUpdate = requestAnimationFrame ||
        mozRequestAnimationFrame ||
        webkitRequestAnimationFrame ||
        oRequestAnimationFrame ||
        nextTick;

provide(bemDom.decl(this.name, {
    onSetMod : {
        'js' : {
            'inited' : function() {
                this._datetime = this.findBlockOn('Datetime');
                boundToTick || bindToTick();
                instances.push(this);
            },

            '' : function() {
                var idx = instances.indexOf(this);
                idx === -1 || instances.splice(idx, 1);
                instances.length || unbindFromTick();
            }
        }
    },

    getVal : function() {
        return this._datetime.getVal();
    },

    setVal : function(val) {
        this._datetime.setVal(val);
        return this;
    },

    setContent : function(content) {
        this._datetime.setContent(content);
        return this;
    },

    _onTick : function(timestamp) {
        this.setContent(fmtTime('%v', this.getVal()));
        this.emit('tick');
    }
}));

});
