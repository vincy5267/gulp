var gulp=require('gulp');

//预处理css
var less=require('gulp-less');
gulp.task('less',function(){
    return gulp.src('app/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('app/less'))
    .pipe(browserSync.reload({
        stream:true
    }))
})

//压缩css
var minifyCss=require('gulp-minify-css');
gulp.task('css',function(){
    return gulp.src('app/less/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'))
})

// js压缩
var uglify=require('gulp-uglify');
gulp.task('js',function(){
    return gulp.src('app/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

//html
// var htmlMin=require('gulp-htmlmin');
// gulp.task('html',function(){
//     gulp.src('app/view/**/*/html')
//     .pipr(htmlMin({
//         collapseWhitespace:true,
//         removeComments:true
//     }))
//     .pipe(gulp.dest('dist/view'))
// })

//压缩图片
var imgMin=require('gulp-imagemin');
var pngquant=require('imagemin-pngquant');
gulp.task('img',function(){
    return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imgMin({
        progressive:true,
        use:[pngquant()]
    }))
    .pipe(gulp.dest('dist/img'))
})

var cache=require('gulp-cache');
gulp.task('img',function(){
    return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imgMin({
        interlaced:true
    })))
    .pipe(gulp.dest('dist/img'))
})

//浏览器自动刷新 
var browserSync=require('browser-sync');
gulp.task('browserSync',function(){
    browserSync({
        server:{
            baseDir:'app'
        }
    })
})

//清理
var del=require("del");
gulp.task('clean',function(cb){
    return del(['dist/**/*'],cb)
})

//监听
gulp.task('watch',['less','css','js','img'],function(){
    gulp.watch('app/less/*.less',['less']);
    gulp.watch('app/less/*.css',['css']);
    gulp.watch('app/js/**/*.js',['js']);
    gulp.watch('app/img/**/*.*',['img']);
})


gulp.task('default',['css','js','img','watch']
    //gulp.start('watch','css','js','img')
)

