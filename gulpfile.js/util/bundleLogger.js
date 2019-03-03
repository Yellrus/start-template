const log = require('fancy-log'),
    colors = require('ansi-colors'),
    PluginError = require('plugin-error'),
    prettifyTime = require('./prettifyTime');

module.exports = (err, stats) => {
    if (err) {
        throw new PluginError('webpack', err);
    }

    let statColor = stats.compilation.warnings.length < 1 ? 'green' : 'yellow';

    if (stats.compilation.errors.length > 0) {
        statColor = 'red';
        log(colors[statColor](stats));
    } else {
        const compileTime = prettifyTime(stats.endTime - stats.startTime);

        log(colors[statColor](stats));
        log(
            'Compiled with',
            colors.cyan('webpack'),
            'in',
            colors.magenta(compileTime),
        );
    }
};
