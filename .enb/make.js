var path = require('path'),
    glob = require('glob'),
    fileProvider = require('enb/techs/file-provider'),
    fileCopy = require('enb/techs/file-copy'),
    techs = require('enb-bem-techs'),
    bh = require('enb-bh/techs/bh-server'),
    html = require('enb-bh/techs/html-from-bemjson'),
    modules = require('enb-modules/techs/prepend-modules'),
    borschik = require('enb-borschik/techs/borschik'),
    browserJs = require('enb-diverse-js/techs/browser-js'),
    styl = require('enb-stylus/techs/css-stylus-with-autoprefixer'),

    TESTS_PATH_RE = /(\w+)\.(tests|examples)\/(\w+)\.bemjson\.js$/;

module.exports = function(config) {
    config.includeConfig('enb-bem-specs');

    var examples = config
        .module('enb-bem-specs')
        .createConfigurator('specs');

    examples.configure({
        destPath : 'specs',
        levels : ['blocks'],
        jsSuffixes : ['vanilla.js', 'browser.js', 'js'],
        sourceLevels : getSpecLevels(config)
    });

    //createTestsNodes(config);
};

function createTestsNodes(config) {
    glob('blocks/**/*.tests/*.bemjson.js', function(err, files) {
        if(err) throw err;
        files.forEach(bemjsonNodeFactory(config));
    });

    config.nodes('tests/*/*', function(nodeConfig) {
        var tech = techFactory(nodeConfig);

        tech(techs.bemjsonToBemdecl);
        tech(techs.deps);
        tech(techs.files);

        tech(bh, { jsAttrName : 'data-bem', jsAttrScheme : 'json', sourceSuffixes : ['bh.js'] });
        tech(html);

        tech(browserJs);
        tech(modules, { source : '?.browser.js', target : '?.js' });
        tech(borschik, { sourceTarget : '?.js', destTarget : '_?.js', minify : false });

        nodeConfig.addTargets(['?.html', '_?.js']);
    });
}

function techFactory(nodeConfig) {
    return function(tech, opts) {
        nodeConfig.addTech(opts? [tech, opts] : tech);
    };
}

function bemjsonNodeFactory(config) {
    var levels = getLevels(config);

    return function(src) {
        var nodeName = '';
        src.replace(TESTS_PATH_RE, function(_, bemItem, type, name) {
            nodeName = [type, bemItem, name].join(path.sep);
        });

        levels.push(config.resolvePath(src.replace(BEMJSON_SUFFIX_RE, '.blocks')));

        config.node(nodeName, function(nodeConfig) {
            var tech = techFactory(nodeConfig),
                srcTarget = resolveSrcTarget(config, nodeConfig, src);

            tech(techs.levels, { levels : levels });

            tech(fileProvider, { target : srcTarget });
            tech(fileCopy, { sourceTarget : srcTarget, destTarget : '?.bemjson.js' });
        });
    };
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
        'libs/bem-core/common.blocks',
        'libs/bem-core/desktop.blocks',
        'blocks',
        'libs/bem-pr/spec.blocks'
    ].map(config.resolvePath.bind(config));
}
