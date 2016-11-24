const gulp= require('gulp');

const imageOptim= require('gulp-image-optimization');
const imageResize= require('gulp-image-resize');
const rename= require('gulp-rename');

// TODO: Add tasks for building CSS


const FILE_DIR= './src/img';         // The source
const BUILD_DIR= './src/img-min';    // The destination

// Options to pass to gulp-image-optimization
const optimizationOptions= {
	optimizationLevel: 5,
	progressive: true,
};


// All the images to optimize
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


/**
 * Optimizes all the images
 */
function buildImages(images) {

	return _ => 
		images.forEach(
			image => 
				image.resize.forEach(
					size => 
						gulp
							.src(`${FILE_DIR}/${image.name}.jpg`)
							.pipe(imageResize({ width: size }))
							.pipe(rename(`${image.name}.min.${size}.jpg`))
							.pipe(imageOptim(optimizationOptions))
							.pipe(gulp.dest(BUILD_DIR))
				)
		);
}

gulp.task('build:images', buildImages(imageList));
gulp.task('default', ['build:images']);
