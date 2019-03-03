const config = require('../config').html;
const data = require('gulp-data'),
    { src, dest } = require('gulp'),
    handleErrors = require('../util/handleErrors'),
    path = require('path'),
    gulpif = require('gulp-if'),
    render = require('gulp-nunjucks-render'),
    fs = require('fs'),
    glob = require('glob'),
    htmlmin = require('gulp-htmlmin');

function getData(isProd) {
    const jsonData = { isProd },
        files = glob.sync(config.data);

    files.forEach(el => {
        const dataPath = path.resolve(el);

        Object.assign(jsonData, JSON.parse(fs.readFileSync(dataPath, 'utf8')));
    });

    return jsonData;
}

const exclude = path.normalize(`!**/{${config.excludeFolders.join(',')}}/**`),
    htmlSrc = [path.join(config.src, config.glob), exclude];

function html() {
    const isProd = global.env === 'prod';

    return src(htmlSrc)
        .pipe(data(getData(isProd)))
        .on('error', handleErrors)
        .pipe(
            render({
                path: config.src,
                envOptions: {
                    watch: false,
                    autoescape: false,
                },
            }),
        )
        .on('error', handleErrors)
        .pipe(gulpif(isProd, htmlmin(config.compression)))
        .pipe(dest(config.dest));
}

module.exports = html;
