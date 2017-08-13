
// 抽取路径
var app = {
    srcPath:'src/',
    buildPath:'build/',
    distPath:'dist/'
};

/*导入依赖包*/
var gulp = require('gulp');
var less = require('gulp-less');            // 编译less
var uglify = require('gulp-uglify');        // 压缩 混淆js
var concat = require('gulp-concat');        // 合并js
var imagemin = require('gulp-imagemin');    // 压缩图片
var rename = require('gulp-rename');        // 重命名
var cleanCss = require('gulp-clean-css');   // 压缩css
var browserSync = require('browser-sync');  // 浏览器同步,测试阶段使用
var htmlmin = require('gulp-htmlmin');      // 压缩html
var reload = browserSync.reload;


/*1.把bower下载的前端框架放到我们项目当中*/
/*也可以在.bowerrc设置bower_components安装路径*/
gulp.task('lib',function () {
    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest(app.buildPath+'lib'))
        .pipe(gulp.dest(app.distPath+'lib'))
        .pipe(reload({
            stream: true
        })) //当内容发生改变时， 重新加载。

    // 按需求添加,如果需要用到框架的css,比如bootstrap那么需要下面的代码
    gulp.src('bower_components/**/*.css')
        .pipe(gulp.dest(app.buildPath+'lib'))
        .pipe(gulp.dest(app.distPath+'lib'))
        .pipe(reload({
            stream: true
        })) //当内容发生改变时， 重新加载。

});



/*2.定义任务 把所有html文件移动另一个位置*/
gulp.task('html',function () {
    /*要操作哪些文件 确定源文件地址*/
    gulp.src(app.srcPath+'**/*.html')  /*src下所有目录下的所有.html文件*/
        .pipe(gulp.dest(app.buildPath)) //gulp.dest 要把文件放到指定的目标位置
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(app.distPath))
        .pipe(reload({
            stream: true
        })) //当内容发生改变时， 重新加载。
});
/*3.执行任务 通过命令行。gulp 任务名称*/
/*定义编译less任务  下载对应的插件 gulp-less
 * 把less文件转成css放到build
 * */
gulp.task('less',function () {
    gulp.src(app.srcPath+'style/index.less')
        .pipe(less())
        .pipe(gulp.dest(app.buildPath+'css/'))
        /*经过压缩，放到dist目录当中*/
        .pipe(cleanCss())
        .pipe(gulp.dest(app.distPath+'css/'))
        .pipe(reload({
            stream: true
        })) //当内容发生改变时， 重新加载。
});

/*合并js*/
gulp.task('js',function () {
    gulp.src(app.srcPath+'js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest(app.buildPath+'js/'))
        .pipe(uglify())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest(app.distPath+'js'))
        .pipe(reload({
            stream: true
        })) //当内容发生改变时， 重新加载。
});

/*压缩图片*/
gulp.task('image',function () {
    gulp.src(app.srcPath+'images/**/*')
        .pipe(gulp.dest(app.buildPath+'images'))
        .pipe(imagemin())
        .pipe(gulp.dest(app.distPath+'images'))
        .pipe(reload({
            stream: true
        })) //当内容发生改变时， 重新加载。
});



/*定义server任务
 * 搭建一个服务器。设置运行的构建目录
 * 同时执行多个任务 [其它任务的名称]
 * */
gulp.task('server',['less','html','js','image','lib'],function () {

    browserSync({
        notify: false,
        port: 2017,
        server: {
            baseDir: ['dist']
        }
    });



    /*监听哪些任务*/
    gulp.watch('bower_components/**/*',['lib']);
    gulp.watch(app.srcPath+'**/*.html',['html']);
    gulp.watch(app.srcPath+'js/**/*.js',['js']);
    gulp.watch(app.srcPath+'images/**/*',['image']);
    gulp.watch(app.srcPath+'style/**/*.less',['less']);

    // //通过浏览器把指定的地址 （http://localhost:9999）打开。
});

/*定义默认任务
 * 直接执行gulp 会调用的任务
 * */
gulp.task('default',['server']);


