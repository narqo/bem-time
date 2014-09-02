modules.define('datetime', ['i-bem__dom', 'iso8601'], function(provide, bemDom, iso8601) {

provide(bemDom.decl(this.name, {
    onSetMod : {
        'js' : {
            'inited' : function() {
                this._val = this.domElem.attr('datetime');
                this._date = this._val? iso8601.deserialize(this._val) : null;
            }
        }
    },

    getVal : function() {
        return this._val;
    },

    setVal : function(val) {
        var dateObj,
            isChanged = false;

        if(typeof val === 'string') {
            if(this._val !== val) {
                dateObj = iso8601.deserialize(val);
                isChanged = true;
            }
        } else {
            if(this._date !== val) {
                dateObj = val;
                val = iso8601.serialize(dateObj);
                isChanged = true;
            }
        }

        if(isChanged) {
            this._val = val;
            this._date = dateObj;
            this.emit('change');
        }

        return this;
    }
}, {
    live : true
}));

});
