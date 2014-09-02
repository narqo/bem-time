var levels = require('enb/techs/levels'),
    fileProvider = require('enb/techs/file-provider'),
    bemdecl = require('enb/techs/bemdecl-from-bemjson'),
    deps = require('enb/techs/deps'),
    files = require('enb/techs/files'),
    bh = require('enb-bh/techs/bh-server-include'),
    html = require('enb-bh/techs/html-from-bemjson');

module.exports = make;

function make(config) {
    config.nodes('tests/*', function(nodeConfig) {
        addTech = addTech.bind(null, nodeConfig);

        addTech(levels, { levels : getLevels(config) });
        addTech(fileProvider, { target : '?.bemjson.js' });
        addTech(bemdecl);
        addTech(deps);
        addTech(files);
        addTech(bh, { jsAttrName : 'data-bem', jsAttrScheme : 'json', sourceSuffixes : ['bh.js'] });
        addTech(html);

        nodeConfig.addTargets(['?.html']);
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
