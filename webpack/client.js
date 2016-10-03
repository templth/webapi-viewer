'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: ['babel-polyfill', './src/client'],
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, '../dist/assets/'),
		filename: 'client.js',
		publicPath: 'http://localhost:8080/assets/'
	},
	resolve: {
		extensions: ['', '.js']
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				BROWSER: JSON.stringify(true)
			}
		}),
		// See https://github.com/cheeriojs/cheerio/issues/836
		new webpack.NormalModuleReplacementPlugin(/^\.\/package$/, function(result) {
        	if(/cheerio/.test(result.context)) {
	            result.request = "./package.json"
        	}
    	})
    	/*
		new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
		*/
	],
	module: {
		noParse: [/moment.js/, /google-libphonenumber/],
		loaders: [
			{
        		test: /\.json$/,
        		loader: 'json',
      		},
			{
				test: /\.js$/,
				loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=stage-0&presets[]=react'],
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				loader: 'style!css!sass'
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader',
			}
		]
	},
	devServer: {
		stats: {
			colors: true,
			hash: false,
			version: false,
			timings: false,
			assets: false,
			chunks: false,
			modules: false,
			reasons: false,
			children: false,
			source: false,
			errors: false,
			errorDetails: false,
			warnings: false,
			publicPath: false
		}
	}
};
