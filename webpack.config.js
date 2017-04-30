var FileChanger = require("webpack-file-changer");
var fs = require("fs");
var path = require("path");

//TODO: fix this so can run dev server and do a build at the same time
//will need to copy files into a dist directory rather than modifing index.html
//in ./public on each run.

getPlugins = function() {
	var optionsDev = {
		change: [{
			file: path.join(__dirname, '/public/index.html'),
			parameters: {'bundle\.(.+)\.js': 'bundle.js'}
		}]		
	}
	var optionsBuild = {
		change: [{
			file: './index.html',
			parameters: {
				'bundle(\..+)?\.js': 'bundle.[renderedHash:0].js'
			},
			// delete all but most recent bundle
			before: function(stats, change) {
				var dir = './public/';
				var files = fs.readdirSync(dir)
					.filter(function (name) { return /bundle(\..+)?\.js/.test(name) } )
					.sort(function(a, b) {
						return fs.statSync(path.join(dir, b)).mtime.getTime() -
							fs.statSync(path.join(dir, a)).mtime.getTime();
					})
					.forEach(function(name, i) {
						if (i > 0) fs.unlinkSync(path.join(dir, name))
					})
				return true;
			}
		}]
	};
	var options = process.env.WEBPACK_ENV === 'build' ? optionsBuild : optionsDev;
	return [ new FileChanger(options) ]
};
module.exports = {
	entry: ["whatwg-fetch", "jspolyfill-array.prototype.find", "./src/index.js"],
	plugins: getPlugins(),
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, "./public"),
		filename: process.env.WEBPACK_ENV === 'build' ? 'bundle.[chunkhash].js' : 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader?presets=es2015&retainLines=true"
		}]
	}
}