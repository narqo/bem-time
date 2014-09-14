(function() {

/**
 * @exports
 * @param {String} format
 * @param {Number|Date} datetime
 * @returns {String}
 */
function fmttime(format, datetime) {
    typeof datetime === 'number' && (datetime = new Date(datetime));

    var time = datetime.getTime(),
        res;

    if(format === '%v') {
        res = getVagueTime(time);
        if(res) {
            return res;
        }
        // TODO: default format?
        format = '%d.%m.%Y, %H:%M';
    }

    var ms = datetime.getMilliseconds(),
        sec = datetime.getSeconds(),
        min = datetime.getMinutes(),
        hour = datetime.getHours(),
        date = datetime.getDate(),
        month = datetime.getMonth(),
        year = datetime.getFullYear();

    return format.replace(/%([%AaBbCdHILMmSsYy])/g, function(_, c) {
        switch(c) {

        case '%':
            // literal %. The full conversion specification must be %%
            return '%';
        case 'A':
            // TODO: full weekday name, e.g. Friday (locale dependent)
            break;
        case 'a':
            // TODO: abbreviated weekday name, e.g. Fri (locale dependent)
            break;
        case 'B':
            // TODO: full month name, e.g. October (locale dependent)
            break;
        case 'b':
            // TODO: abbreviated month name, e.g. Oct (locale dependent)
            break;
        case 'C':
            // first 2 digits of year as a decimal number (range [00,99])
            return String(year).slice(0, 2);
        case 'd':
            // day of the month as a decimal number (range [01,31])
            return pad(date, 2);
        case 'H':
            // hour as a decimal number, 24 hour clock (range [00-23])
            return pad(hour, 2);
        case 'I':
            // TODO: hour as a decimal number, 12 hour clock (range [01,12])
            break;
        case 'L':
            // millisecond of the second (000..999)
            return pad(ms, 3);
        case 'M':
            // minute as a decimal number (range [00,59])
            return pad(min, 2);
        case 'm':
            // month as a decimal number (range [01,12])
            return pad(month + 1, 2);
        case 'S':
            // second as a decimal number (range [00,60])
            return pad(sec, 2);
        case 's':
            // seconds since 1970
            return String(time);
        case 'Y':
            // year as a 4 digit decimal number
            return year;
        case 'y':
            // last 2 digits of year as a decimal number (range [00,99])
            return pad(year % 100, 2);

        }
    });
}

var SECONDS = 1000,
    MINUTES = 60,
    HOURS = 60,
    DAYS = 24,
    WEEKS = 7,
    MONTHS = 30,
    YEARS = 12;

function getVagueTime(date) {
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

function pad(num, len) {
    num = String(num);
    return (Array(len).join('0') + num).slice(-len);
}

modules.define('fmtTime', function(provide) {
    provide(fmttime);
});

}());
