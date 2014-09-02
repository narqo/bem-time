modules.define('reltime',
    ['i-bem__dom', 'tick', 'datetime'],
    function(provide, bemDom, tick, _) {

var TICK_INTERVAL = 6000,
    lastTickTime = 0,
    instances = [],
    boundToTick = false,
    bindToTick = function() {
        boundToTick = true;
        tick
            .on('tick', update)
            .start();
    },
    update = function() {
        var curTime = +new Date(),
            tickTime = Math.floor(curTime / TICK_INTERVAL);
        if(tickTime > lastTickTime) {
            var instance, i = 0;
            while(instance = instances[i++]) {
                instance._tick(curTime);
            }
            lastTickTime = tickTime;
        }
    };

provide(bemDom.decl(this.name, {
    onSetMod : {
        'js' : {
            'inited' : function() {
                this._datetime = this.findBlockOn('datetime');

                boundToTick || (bindToTick());

                this._instanceIndex = instances.push(this) - 1;
            },

            '' : function() {
                // удаляем из общего массива instances
                instances.splice(this._instanceIndex, 1);
                // понижаем _instanceIndex всем тем кто был добавлен в instances после нас
                var i = this._instanceIndex, instance;
                while(instance = instances[i++]) --instance._instanceIndex;
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

    _tick : function(curTime) {
        // TODO: format + update content
        this.domElem.text(this.getVal());
        this.emit('tick');
    }
}));

});
