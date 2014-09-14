module.exports = require('enb/lib/build-flow').create()
    .name('browser-js')
    .target('target', '?.browser.js')
    .useFileList(['vanilla.js', 'js', 'browser.js'])
    //.justJoinFilesWithComments()
    .builder(function (files) {
        var node = this.node;
        return files.map(function (file) {
            return '/*borschik:include:' + node.relativePath(file.fullname) + '*/';
        }).join('\n');
    })
    .createTech();
