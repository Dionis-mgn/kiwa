// const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		bundle: './main.js'
	},
	resolve: {
		modulesDirectories: [
			'.',
			'./node_modules'
		]
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: 'style!css!postcss'
			},
			{
				test: /\.(png|jpg|jpeg)$/,
				exclude: /node_modules/,
				loader: 'file'
			}
		]
	},
	postcss: () => {
		return [autoprefixer];
	},
	plugins: [
		new CopyPlugin([
			{ from: './index.html' },
			{ from: './status.php' }
		]
		)
	]
};
