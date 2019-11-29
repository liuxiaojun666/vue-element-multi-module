const gulp = require('gulp')
const through = require('through2')

function defaultTask() {
    return gulp.src(['.babelrc']).pipe(through.obj(function (file, encode, cb) {
        let result = file.contents.toString()
        let bableConf = JSON.parse(result)

        bableConf.plugins[2][1].styleLibraryName = `~src/${process.argv[3]}/assets/element-ui-theme/theme`

        result = JSON.stringify(bableConf, null, '\t')
        file.contents = new Buffer(result)
        this.push(file)
        cb()
    })).pipe(gulp.dest('./'))
}
exports.default = defaultTask

const options = {}
function packScript (cb) {
    const projectName = options.name

    gulp.src(['package.json']).pipe(through.obj(function (file, encode, cb) {
        let result = file.contents.toString()
        let pack = JSON.parse(result)

        pack.scripts['dev:' + projectName] = `gulp --option ${projectName} && webpack-dev-server --inline --progress --config build/webpack.dev.conf.js`
        pack.scripts['et:' + projectName] = `et -c src/${projectName}/assets/element-ui-theme/element-variables.scss -o src/${projectName}/assets/element-ui-theme/theme`
        pack.scripts['build:' + projectName] = `gulp --option ${projectName} && node build/build.js name=${projectName}`
        pack.scripts['build:' + projectName + ':zip'] = `gulp --option ${projectName} && node build/build.js name=${projectName} zip`
        pack.scripts['build'] += ` && npm run build:${projectName}`

        result = JSON.stringify(pack, null, '\t')
        file.contents = new Buffer(result)
        this.push(file)
        cb()
    })).pipe(gulp.dest('./'))
    cb()
}

function projectStatic (cb) {
    const projectName = options.name
    gulp.src('static/static-$template/**').pipe(gulp.dest('./static/static-' + projectName))
    cb()
}

function addProxy (cb) {

    gulp.src(['config/moduleConfig.json']).pipe(through.obj(function (file, encode, cb) {
        let result = file.contents.toString()
        let obj = JSON.parse(result)

        obj.push(options)

        result = JSON.stringify(obj, null, '\t')
        file.contents = new Buffer(result)
        this.push(file)
        cb()
    })).pipe(gulp.dest('./config/'))
    cb()
}

function projectSrc (cb) {
    const projectName = options.name
    gulp.src('src/$template/**').pipe(gulp.dest('./src/' + projectName))
    cb()
}

function getOptions (cb) {
    for (let index = 0; index < process.argv.length; index++) {
        if (index <= 3) continue
        if ((index % 2) !== 0) continue
        options[process.argv[index - 1].substr(2)] = process.argv[index]
    }
    cb()
}

exports.newProject = gulp.series(getOptions, packScript, projectStatic, addProxy, projectSrc)
