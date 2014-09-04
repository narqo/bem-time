/** @module Datetime */
modules.define('Datetime', ['i-bem__dom'], function(provide, bemDom) {

/**
 * @export
 * @class Datetime
 * @bem
 */
provide(bemDom.decl(this.name, /** @lends Datetime.prototype */{
    onSetMod : {
        'js' : {
            'inited' : function() {
                // `datetime` must contains ISO 8601 formatted timestamp
                this._val = this._parseStrVal(this.domElem.attr('datetime'));
            }
        }
    },

    /**
     * @returns {Date}
     */
    getVal : function() {
        return this._val;
    },

    /**
     * @param {Date|String} val Date object or ISO 8601 formatted timestamp
     * @returns {Datetime} this
     */
    setVal : function(val) {
        if(typeof val === 'string') {
            val = this._parseStrVal(val);
        }

        // check, if two Date objects are equal by value
        if(!(this._val - val)) {
            this._val = val;
            this.emit('change');
        }

        return this;
    },

    /**
     * Sets the content of the block
     * @param {String} content
     * @returns {Datetime} this
     */
    setContent : function(content) {
        this.domElem.text(content);
        return this;
    },

    _parseStrVal : function(val) {
        val = new Date(Date.parse(val));
        return (val && !isNaN(val))? val : null;
    }
}, /** @lends Datetime */{
    live : true
}));

});
