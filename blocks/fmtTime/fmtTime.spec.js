modules.define('spec', ['fmtTime', 'sinon'], function(provide, fmtTime, sinon) {

describe('fmtTime', function() {
    describe('General formats', function() {
        var testTime = new Date('2014-09-10T12:04:45+0400'),
            testCases = {
                '%' : ['%',   'literal %'],
                //'A' : ['',    'full weekday name'],
                //'a' : ['',    'abbreviated weekday name'],
                //'B' : ['',    'full month name'],
                //'b' : ['',    'abbreviated month name'],
                'C' : ['20',  'first 2 digits of year as a decimal number'],
                'd' : ['10',  'day of the month as a decimal number'],
                'H' : ['12',  '24 clock hour as a decimal number'],
                //'I' : ['',    '12 clock hour as a decimal number'],
                //'L' : ['000', 'millisecond of the second'],
                'M' : ['04',  'minute as a decimal number'],
                'm' : ['09',  'month as a decimal number'],
                'S' : ['45',  'second as a decimal number'],
                's' : ['1410336285000', 'seconds since 1970'],
                'Y' : ['2014', 'year as a 4 digit decimal number'],
                'y' : ['14', 'last 2 digits of year as a decimal number']
            };

        Object.keys(testCases).forEach(function(char) {
            var test = testCases[char],
                format = '%' + char,
                testRes = test[0],
                testDesc =test[1];

            describe(format, function() {
                it('should return ' + testDesc, function() {
                    fmtTime(format, testTime).should.be.equal(testRes);
                })
            })
        });
    });

    describe('%v (vague time format)', function() {
        var testTime = new Date('2014-09-14T12:00:00+0400'),
            testCases = {
                '2014-09-14' : {
                    '12:00:05' : 'только что',
                    '12:00:10' : '10 сек. назад',
                    '12:00:20' : '20 сек. назад',
                    '12:00:45' : 'минуту назад',
                    '12:01:00' : 'минуту назад',
                    '12:01:45' : '2 мин. назад',
                    '12:02:00' : '2 мин. назад',
                    '12:05:00' : '5 мин. назад',
                    '12:10:00' : '10 мин. назад',
                    '12:30:00' : '30 мин. назад',
                    '12:45:00' : 'час назад',
                    '12:55:00' : 'час назад',
                    '13:00:00' : 'час назад',
                    '13:25:00' : 'час назад',
                    '13:30:00' : '2 ч. назад',
                    '14:00:00' : '2 ч. назад',
                    '18:00:00' : '6 ч. назад',
                    '23:00:00' : '11 ч. назад',
                    '23:59:00' : '12 ч. назад'
                },
                '2014-09-15' : {
                    '00:00:00' : '12 ч. назад',
                    '06:00:00' : '18 ч. назад',
                    '11:00:00' : '23 ч. назад',
                    '11:59:00' : 'вчера',
                    '12:00:00' : 'вчера',
                    '13:00:00' : 'вчера',
                    '18:00:00' : 'вчера',
                    '23:00:00' : 'вчера',
                    '23:59:00' : 'позавчера'
                },
                '2014-09-16' : {
                    '00:00:00' : 'позавчера',
                    '06:00:00' : 'позавчера',
                    '11:00:00' : 'позавчера',
                    '11:59:00' : '2 дн. назад',
                    '12:00:00' : '2 дн. назад',
                    '18:00:00' : '2 дн. назад',
                    '23:59:00' : '3 дн. назад'
                },
                '2014-09-17' : {
                    '00:00:00' : '3 дн. назад',
                    '12:00:00' : '3 дн. назад'
                },
                '2014-09-20' : {
                    '12:00:00' : '6 дн. назад'
                },
                '2014-09-30' : {
                    '12:00:00' : '16 дн. назад'
                },
                '2014-10-01' : {
                    '12:00:00' : '17 дн. назад'
                },
                '2014-10-10' : {
                    '12:00:00' : '26 дн. назад'
                },
                '2014-10-14' : {
                    '12:00:00' : '14.09.2014, 12:00'
                },
                '2015-01-14' : {
                    '12:00:00' : '14.09.2014, 12:00'
                }
            };

        Object.keys(testCases).forEach(function(date) {
            var dateCase = testCases[date];

            Object.keys(dateCase).forEach(function(time) {
                var datetime = date + 'T' + time,
                    now = new Date(datetime + '+0400').getTime(),
                    clock;

                describe(datetime, function() {
                    before(function() {
                        clock = sinon.useFakeTimers(now);
                    });

                    after(function() {
                        clock.restore();
                    });

                    it('should properly calculate time in vague format', function() {
                        fmtTime('%v', testTime).should.be.equal(dateCase[time]);
                    });
                });
            });
        });
    });
});

provide();

});
