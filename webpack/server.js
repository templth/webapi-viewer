'use strict';

const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: ['babel-polyfill', './src/server/index.js'],
	target: 'node',
	devtool: 'eval',
	output: {
		path: path.resolve(__dirname, '../dist/server'),
		filename: 'index-dev.js'
	},
	externals: [ nodeExternals({
		whitelist: [
			'react-intl-tel-input/dist/main.css'
		]
	})],
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				BROWSER: JSON.stringify(false),
				PORT: JSON.stringify(3000),
			}
		})
	],
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		loaders: [
			{
        		test: /\.json$/,
        		loader: 'json',
      		},
			{
				test: /\.js$/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'stage-0', 'react']
				},
				exclude: /node_modules/
			},
			{
				test: /\.(css|less|png)$/,
				loader: 'null'
			}
		],
		noParse: [/moment.js/]
	},
	node: {
		__dirname: true,
		__filename: true
	}
};
