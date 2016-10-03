var webpack = require('webpack');
var path = require('path');
var webpackConfig = require('./webpack/client.js');

module.exports = function (config) {
	config.set({
		browsers: [ /*'PhantomJS', */'Chrome'/*, 'Firefox'*/ ],
		//singleRun: true,
		frameworks: [ 'mocha' ],
		files: [
			'node_modules/babel-polyfill/browser.js',
			//'./node_modules/phantomjs-polyfill/bind-polyfill.js',
			{ pattern: 'tests/!(server)/**/*-test.js', included: true }
		],
		preprocessors: {
			'tests/**/*-test.js': [ 'webpack', 'sourcemap' ],
			'src/**/*.js': [ 'webpack', 'sourcemap' ]
		},
		reporters: [ 'mocha', 'coverage' ],
		coverageReporter: {
			dir: 'build/reports/coverage',
			reporters: [
				{ type: 'html', subdir: 'report-html' },
				{ type: 'lcov', subdir: 'report-lcov' },
				{ type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
			]
		},
		webpack: webpackConfig,
		webpackMiddleware: {
			noInfo: true
		}
	});
};
