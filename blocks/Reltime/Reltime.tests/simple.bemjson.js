({ block : 'page',
    title : 'Reltime simple test',
    head : [
        { elem : 'css', url : '_simple.css' }
    ],
    content : [
        [{ block : 'Reltime', val : '2014-09-14T12:00:00+0400' },
        { block : 'Reltime', val : '2014-09-14T12:00:00+0400' },
        { block : 'Reltime', val : '2014-09-14T12:00:00+0400' },
        { block : 'Reltime', val : '2014-09-14T12:00:00+0400' },
        { block : 'Reltime', val : '2014-09-14T12:00:00+0400' },
        { block : 'Reltime', val : '2014-09-14T12:00:00+0400' },
        { block : 'Reltime', val : '2014-09-14T12:00:00+0400' },
        { block : 'Reltime', val : '2014-09-14T16:40:00+0400' },
        { block : 'Reltime', val : '2014-09-14T16:45:00+0400' }].map(function(i) { return ['<br/>', i] }),
        { elem : 'js', url : '_simple.js' }
    ]
})
