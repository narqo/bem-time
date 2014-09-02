/**
 * @module iso8601
 * @see http://www.w3.org/TR/1998/NOTE-datetime-19980827
 */
modules.define('iso8601', function(provide) {

//             1 YYYY                2 MM       3 DD           4 HH    5 mm       6 ss        7 msec        8 Z 9 ±    10 tzHH    11 tzmm
var ISO_RE = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/,
    keys = [1, 4, 5, 6, 7, 10, 11],
    undef;

function deserialize(isoDate) {
    var minutesOffset = 0,
        timestamp,
        struct;

    if((struct = ISO_RE.exec(isoDate))) {
        // avoid NaN timestamps caused by “undefined” values being passed to Date.UTC
        for(var i = 0, k; (k = keys[i]); ++i) {
            struct[k] = +struct[k] || 0;
        }

        // allow undefined days and months
        struct[2] = (+struct[2] || 1) - 1;
        struct[3] = +struct[3] || 1;

        if(struct[8] !== 'Z' && struct[9] !== undef) {
            minutesOffset = struct[10] * 60 + struct[11];

            if(struct[9] === '+') {
                minutesOffset = 0 - minutesOffset;
            }
        }

        timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4],
            struct[5] + minutesOffset,
            struct[6], struct[7]
        );
    } else {
        throw 'not a valid ISO 8601 string';
    }

    return new Date(timestamp);
}

var serialize = typeof Date.prototype.toISOString === 'function'?
    Date.prototype.toISOString.bind(Date)
    :
    function(dateObj) {
        return dateObj.getUTCFullYear() +
            '-' + pad(dateObj.getUTCMonth() + 1) +
            '-' + pad(dateObj.getUTCDate()) +
            'T' + pad(dateObj.getUTCHours()) +
            ':' + pad(dateObj.getUTCMinutes()) +
            ':' + pad(dateObj.getUTCSeconds()) +
            '.' + (dateObj.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
            'Z';
    };

function pad(n) {
    return ('0' + n).slice(-2);
}

provide(/** @exports */{
    /**
     * Serialise `Date` object into ISO 8601 string
     * @param {Date} date
     * @returns {String}
     */
    serialize : serialize,
    /**
     * Deserialise ISO 8601 string into `Date` object
     * @type {Function}
     * @param {String} isoDate
     * @returns {Date}
     */
    deserialize : deserialize
});

});
