var gulp = require('gulp');
var s3 = require('gulp-s3-upload')({
    accessKeyId: process.env.S3KEY,
    secretAccessKey: process.env.S3SECRET
});

gulp.task("upload", function() {
    gulp.src("./apidoc/**")
        .pipe(s3({
            Bucket: 'apidoc-test-nichee', //  Required
            ACL:    'public-read'       //  Needs to be user-defined
        }, {
            // S3 Constructor Options, ie:
            maxRetries: 5
        }))
    ;
});
