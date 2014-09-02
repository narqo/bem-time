var path = require('path'),
    levels = require('enb/techs/levels'),
    files = require('enb/techs/files'),
    fileProvider = require('enb/techs/file-provider'),
    fileCopy = require('enb/techs/file-copy'),
    bemdecl = require('enb/techs/bemdecl-from-bemjson'),
    deps = require('enb/techs/deps'),
    bh = require('enb-bh/techs/bh-server'),
    html = require('enb-bh/techs/html-from-bemjson'),
    modules = require('enb-modules/techs/prepend-modules'),
    js = require('enb-diverse-js/techs/browser-js');

module.exports = make;

function make(config) {
    config.node('tests/reltime/simple', function(nodeConfig) {
        var src = 'blocks/reltime/reltime.tests/simple.bemjson.js',
            simpleSrc = path.relative(nodeConfig.getNodePath(), config.resolvePath(src)),
            tech = addTech.bind(null, nodeConfig);

        tech(fileProvider, { target : simpleSrc });
        tech(fileCopy, { sourceTarget : simpleSrc, destTarget : '?.bemjson.js' });
    });

    config.nodes('tests/*/*', function(nodeConfig) {
        var tech = addTech.bind(null, nodeConfig);

        tech(levels, { levels : getLevels(config) });
        //tech(fileProvider, { target : '?.bemjson.js' });
        tech(bemdecl);
        tech(deps);
        tech(files);
        tech(bh, { jsAttrName : 'data-bem', jsAttrScheme : 'json', sourceSuffixes : ['bh.js'] });
        tech(html);
        tech(js);
        tech(modules, { source : '?.browser.js', target : '_?.js' });

        nodeConfig.addTargets(['?.html', '_?.js']);
    });
}

function addTech(nodeConfig, tech, opts) {
    nodeConfig.addTech(opts? [tech, opts] : tech);
}

function getLevels(config) {
    return [
        'libs/bem-core/common.blocks',
        'libs/bem-core/desktop.blocks',
        'blocks'
    ].map(config.resolvePath.bind(config));
}
