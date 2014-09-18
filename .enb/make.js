var path = require('path'),
    levels = require('enb/techs/levels'),
    files = require('enb/techs/files'),
    fileProvider = require('enb/techs/file-provider'),
    fileCopy = require('enb/techs/file-copy'),
    bemdeclFromBemjson = require('enb/techs/bemdecl-from-bemjson'),
    deps = require('enb/techs/deps'),
    bh = require('enb-bh/techs/bh-server'),
    html = require('enb-bh/techs/html-from-bemjson'),
    modules = require('enb-modules/techs/prepend-modules'),
    borschik = require('enb-borschik/techs/borschik'),
    browserJs = require('./techs/browser-js'),

    TESTS_PATH_RE = /(\w+)\.(tests|examples)\/(\w+)\.bemjson\.js$/,
    SPECS_PATH_RE = /(\w+)\.(spec)\.js$/;

module.exports = function(config) {
    createTestsNodes(config);
    createSpecsNodes(config);
}

function createTestsNodes(config) {
    createBemjsonNode(config, 'blocks/Reltime/Reltime.tests/simple.bemjson.js');
    createBemjsonNode(config, 'blocks/fmtTime/fmtTime.tests/simple.bemjson.js');

    config.nodes('tests/*/*', function(nodeConfig) {
        var tech = addTech(nodeConfig);

        tech(levels, { levels : getLevels(config) });
        tech(bemdeclFromBemjson);
        tech(deps);
        tech(files);
        tech(bh, { jsAttrName : 'data-bem', jsAttrScheme : 'json', sourceSuffixes : ['bh.js'] });
        tech(html);
        tech(browserJs);
        tech(modules, { source : '?.browser.js', target : '?.js' });
        tech(borschik, { sourceTarget : '?.js', destTarget : '_?.js', minify : false });

        nodeConfig.addTargets(['?.html', '_?.js']);
    });
}

function createSpecsNodes(config) {
    createSpecNode(config, 'blocks/fmtTime/fmtTime.spec.js');

    config.nodes('specs/*', function(nodeConfig) {
        var tech = addTech(nodeConfig);

        tech(levels, { levels : getSpecLevels(config) });
        tech(fileProvider, { target : '?.bemdecl.js' });
        tech(deps);
        tech(files);
        tech(browserJs);
        tech(modules, { source : '?.browser.js', target : '?.js' });
        tech(borschik, { sourceTarget : '?.js', destTarget : '_?.js', minify : false });

        nodeConfig.addTargets(['_?.js', '_?.spec.js']);
    });
}

function addTech(nodeConfig) {
    return function(tech, opts) {
        nodeConfig.addTech(opts? [tech, opts] : tech);
    };
}

function createBemjsonNode(config, src) {
    var nodeName = '';
    src.replace(TESTS_PATH_RE, function(_, bemItem, type, name) {
        nodeName = [type, bemItem, name].join(path.sep);
    });

    config.node(nodeName, function(nodeConfig) {
        var tech = addTech(nodeConfig),
            srcTarget = resolveSrcTarget(config, nodeConfig, src);

        tech(fileProvider, { target : srcTarget });
        tech(fileCopy, { sourceTarget : srcTarget, destTarget : '?.bemjson.js' });
    });
}

function createSpecNode(config, src) {
    var nodeName = '';
    src.replace(SPECS_PATH_RE, function(_, bemItem, type) {
        // spec -> specs
        type = type + 's';
        nodeName = [type, bemItem].join(path.sep);
    });

    config.node(nodeName, function(nodeConfig) {
        var tech = addTech(nodeConfig),
            srcTarget = resolveSrcTarget(config, nodeConfig, src);

        tech(fileProvider, { target : srcTarget });
        tech(fileCopy, { sourceTarget : srcTarget, destTarget : '_?.spec.js' });
    });
}

function resolveSrcTarget(config, nodeConfig, src) {
    return path.relative(nodeConfig.getNodePath(), config.resolvePath(src));
}

function getLevels(config) {
    return [
        'libs/bem-core/common.blocks',
        'libs/bem-core/desktop.blocks',
        'blocks'
    ].map(config.resolvePath.bind(config));
}

function getSpecLevels(config) {
    return [
        'libs/bem-pr/spec.blocks',
        'libs/bem-core/common.blocks',
        'libs/bem-core/desktop.blocks',
        'blocks'
    ].map(config.resolvePath.bind(config));
}
