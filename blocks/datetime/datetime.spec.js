modules.define('spec',
    ['Datetime', 'i-bem__dom', 'jquery', 'BEMHTML', 'sinon'],
    function(provide, Datetime, bemDom, $, BEMHTML, sinon) {

describe('select', function() {
    var datetime,
        datetimeVal = '2015-12-31T23:59:59-02:00';

    beforeEach(function() {
        datetime = bemDom.init(
                $(BEMHTML.apply({ block : 'Datetime', val : datetimeVal })))
            .appendTo('body')
            .bem('Datetime');
    });

    afterEach(function() {
        bemDom.destruct(datetime.domElem);
    });

    describe('value', function() {
        it('should return initial value', function() {
            datetime.getVal().should.be.equal(datetimeVal);
        });

        it('should update value with ISO 8601 string', function() {
            var dateString = '2014-09-02';
            datetime
                .setVal(dateString)
                .getVal()
                    .should.be.equal(dateString);
        });

        it('should update value with Date object', function() {
            var dateObj = new Date(2012, 8, 2),
                dateString = '2012-09-01T20:00:00.000Z';
            datetime
                .setVal(dateObj)
                .getVal()
                    .should.be.equal(dateString);
        });

        it('should emit "change" event on value change', function() {
            var spy = sinon.spy();
            datetime
                .on('change', spy)
                .setVal('2014-09-02');
            spy.should.have.been.called;
        });

        it('should not emit "change" event if value have not changed', function() {
            var spy = sinon.spy();
            datetime
                .on('change', spy)
                .setVal(datetimeVal);
            spy.should.not.have.been.called;
        });
    });
});

provide();

});
