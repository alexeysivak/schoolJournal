const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

function getOptimizationSettings() {
	const settings = {
		minimizer: [],
	};

	if (isProd) {
		settings.minimizer = [new TerserWebpackPlugin(), new CssMinimizerPlugin()];
	}

	return settings;
}

module.exports = {
	entry: ['@babel/polyfill', './src/js/main.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.[contenthash].js',
	},

	resolve: {
		extensions: ['.js', '.json'],
	},

	optimization: getOptimizationSettings(),

	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			minify: {
				collapseWhitespace: isProd,
			},
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'main.[contenthash].css',
		}),
	],

	devServer: {
		port: 4200,
	},

	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'less-loader',
				],
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
};
