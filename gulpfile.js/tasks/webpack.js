// Task for static webpack builds (default & production),
// see `browserSync.js` for live update builds.

const wp = require('webpack'),
    getWebpackConfig = require('../util/getWebpackConfig'),
    logger = require('../util/bundleLogger');

function webpack(cb) {
    const config = getWebpackConfig(global.env);

    wp(config, (err, stats) => {
        logger(err, stats);
        cb();
    });
}

module.exports = webpack;
