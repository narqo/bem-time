({ block : 'page',
    title : 'datetime Simple test',
    head : [
        { elem : 'css', url : '_simple.css' }
    ],
    content : [
        { block : 'datetime',
            val : '2010-12-31T23:59:59-02:00',
            content : 'Long, long time ago...'
        },
        { elem : 'js', url : '_simple.js' }
    ]
})
