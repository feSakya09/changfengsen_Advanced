//入口
const { src, dest, parallel, series, watch } = require('gulp')

const del = require('del')
const browserSync = require('browser-sync')

const bs = browserSync.create()

const loadPlugins = require('gulp-load-plugins')
const { use } = require('browser-sync')

const plugins = loadPlugins()

const clean = () => {
    return del(['dist', 'temp'])
}

const style = () => {
    return src('src/assets/styles/*.scss', {base: 'src'})
        .pipe(plugins.sass())
        .pipe(dest('temp'))
        .pipe(bs.reload({stream: true}))
}

const script = () => {
    return src('src/assets/scripts/*.js', {base: 'src'})
        .pipe({presets: ['@babel/preset-env']})
        .pipe(dest('temp'))
        .pipe(bs.reload({stream: true}))

}

const page = () => {
    return src('src/*.html', {base: 'src'})
        .pipe(plugins.swig())
        .pipe(dest('temp'))
        .pipe(bs.reload({stream: true}))

}

const image = () => {
    return src('src/assets/images/**', {base: 'src'})
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const font = () => {
    return src('src/assets/fonts/**', {base: 'src'})
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const other = () => {
    return src('public/**', {base: 'public'})
        .pipe(dest('dist'))
}

const useref = () => {
    return src('temp/*.html')
        .pipe(plugins.useref({
            searchPath: ['temp', '.']
        }))
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        .pipe(plugins.if(/\.html$/, plugins.htmlmin({
            collapseWhitespace: true,
            minifyCss: true,
            minifyJs: true
        })))
        .pipe(dest('dist'))
}

const serve = () => {
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/*.html', page)
    // watch('src/assets/images/**', image)
    // watch('src/assets/fonts/**', font)
    // watch('public/**', other)
    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'
    ], bs.reload)
    bs.init({
        notify: false,
        // port: 2020,
        // open: false,g
        server: {
            baseDir: ['temp', 'src', 'public'],
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}

const compile = parallel(style, script, page, image, font)
const build = series(
    clean,  
    parallel(
        series(
            compile, 
            useref
        ), 
        image, 
        font, 
        other
    )
)
const develop = series(compile, serve)
module.exports = {
    clean,
    build,
    develop
}