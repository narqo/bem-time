(function() {

var SECONDS = 1000,
    MINUTES = 60,
    HOURS = 60,
    DAYS = 24,
    WEEKS = 7,
    MONTHS = 30,
    YEARS = 12;

function vagueTime(date) {
    var delta = Date.now() - date,
        ms = Math.abs(delta),
        sec = Math.ceil(ms / SECONDS);

    if(sec < 10) {
        return 'только что';
    } else if(sec < 45) {
        return sec + ' сек. назад';
    } else if(sec < 90) {
        return 'минуту назад';
    }

    var minute = Math.ceil(sec / MINUTES);
    if(minute < 45) {
        return minute + ' мин. назад';
    } else if(minute < 90) {
        return 'час назад';
    }

    var hour = Math.ceil(minute / HOURS);
    if(hour < 24) {
        return hour + ' ч. назад';
    } else if(hour < 36) {
        return 'вчера';
    } else if(hour < 48) {
        return 'позавчера';
    }

    var day = Math.round(hour / DAYS);
    if(day < 30) {
        return day + ' дн. назад';
    }
}

/*
function pad(num, len) {
    num = String(num);
    len = len - num.length + 1;
    return (Array(len).join('0') + str).slice(-len);
}
*/

/**
 * @param {String} format
 * @param {Number|Date} datetime
 */
function fmttime(format, datetime) {
    typeof datetime === 'number' && (datetime = new Date(datetime));

    var time = datetime.getTime(),
        res;
    format === '%v' && (res = vagueTime(time));
    if(res) {
        return res;
    } else {
        format = '%d %B %Y'
    }

    return format.replace(/%([%BdHmMYyS])/g, function(_, c) {
        switch(c) {

        case '%':
            return '%';

        case 'B':
        case 'd':
        case 'H':
        case 'm':
        case 'M':
        case 'S':
        case 'Y':
        case 'y':
            // TODO

        }
    });
}

modules.define('fmtTime', function(provide) {
    provide(fmttime);
});

}());
