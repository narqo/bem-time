({ block : 'page',
    title : 'reltime Simple test',
    head : [
        { elem : 'css', url : '_simple.css' }
    ],
    content : [
        { block : 'reltime', val : '2010-12-31T23:59:59-02:00' },
        [{ block : 'reltime', val : '2010-12-31T23:59:59-02:00' },
        { block : 'reltime', val : '2010-12-31T23:59:59-02:00' },
        { block : 'reltime', val : '2010-12-31T23:59:59-02:00' },
        { block : 'reltime', val : '2010-12-31T23:59:59-02:00' },
        { block : 'reltime', val : '2010-12-31T23:59:59-02:00' },
        { block : 'reltime', val : '2010-12-31T23:59:59-02:00' },
        { block : 'reltime', val : '2010-12-31T23:59:59-02:00' },
        { block : 'reltime', val : '2010-12-31T23:59:59-02:00' },
        { block : 'reltime', val : '2010-12-31T23:59:59-02:00' }].map(function(i) { return ['<br/>', i] }),
        { elem : 'js', url : '_simple.js' }
    ]
})
