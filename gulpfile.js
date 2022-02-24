//Initilize modules 
const {src, dist, watch, series, dest} = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
 
//use dart-sass for @use
//sass.compiler = require('dart-sass');

//Sass Task
function scssTask(){
    return src('app/scss/style.scss', {sourcemaps:true}) //shows whre exactly  style is coming from instead of the mincss
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist', {sourcemaps: '.'}));
}

//Javascript Task
function jsTask(){
    return src('app/js/script.js', {sourcemaps:true})
    .pipe(babel({presets: ['@babel/preset-env']}))
    .pipe(terser())
    .pipe(dest('dist', {sourcemaps: '.'}));
}


//BrowserSync
function browserSyncServer(cb){
    browsersync.init({
        server:{
            baseDir: '.',
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
            },
        },
    })
    cb();
}
function browserSyncReload(cb){
    browsersync.reload();
    cb();
}

//watch Task
function watchTask(){
    watch('*.html', browserSyncReload);
    watch(
        ['app/scss/**/*.scss', 'app/**/*.js'],
        series(scssTask, jsTask, browserSyncReload)
    );
}

//default gulp task
exports.default = series(scssTask, jsTask,browserSyncServer,watchTask);

//build task 
exports.build = series(scssTask, jsTask);