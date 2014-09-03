modules.define('reltime',
    ['i-bem__dom', 'tick', 'next-tick', 'datetime'],
    function(provide, bemDom, tick, nextTick, _) {

var TICK_INTERVAL = 6000,
    instances = [],
    boundToTick = false,
    tickTime,
    bindToTick = function() {
        boundToTick = true;
        tickTime = Date.now();
        tick.on('tick', update).start();
    },
    unbindFromTick = function() {
        tick.un('tick', update).stop();
        boundToTick = false;
    },
    update = function() {
        var timestamp = Date.now();
        if(!Math.max(0, TICK_INTERVAL - (timestamp - tickTime))) {
            tickTime = timestamp;
            scheduleUpdate(function() {
                var instance, i = 0;
                while(instance = instances[i++]) {
                    instance._onTick(tickTime);
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
                this._datetime = this.findBlockOn('datetime');
                boundToTick || (bindToTick());
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

    _onTick : function(timestamp) {
        // TODO: format + update content
        this.domElem.text(timestamp);
        this.emit('tick');
    }
}));

});
