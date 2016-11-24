const gulp= require('gulp');

const imageOptim= require('gulp-image-optimization');
const imageResize= require('gulp-image-resize');
const rename= require('gulp-rename');


const BUILD_DIR= './src/img-min';
const FILE_DIR= './src/img';

const imageList= [
	{
		name: 'main',
		resize: [ 500, 1000 ]
	},
	{
		name: 'proj-1',
		resize: [ 300, 700 ]
	},
	{
		name: 'proj-2',
		resize: [ 300, 700 ]
	},
	{
		name: 'proj-3',
		resize: [ 300, 700 ]
	}
];



function buildImages() {

	imageList.map(
		image => 
			image.resize.map(
				size => gulp
					.src(`${FILE_DIR}/${image.name}.jpg`)
					.pipe(imageResize({ width: size }))
					.pipe(rename(`${image.name}.min.${size}.jpg`))
					.pipe(imageOptim({
						optimizationLevel: 5,
						progressive: true,
					}))
					.pipe(gulp.dest(BUILD_DIR))
			)
	);
}

gulp.task('build:images', buildImages);

gulp.task('default', ['build:images']);