import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import HardSourceWebpackPlugin from "hard-source-webpack-plugin"; 
import dotenv from "dotenv";
import fs from "fs";


const basePath =`${path.join(__dirname)}/.env`;
const envPath = `${basePath}.dev`;

// Check if the file exists, otherwise fall back to the production .env
const finalPath = fs.existsSync(envPath) ? envPath : basePath;

const ENV = dotenv.config({path: finalPath }).parsed;

const ENV_KEYS = Object.keys(ENV).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(ENV[next]);
	return prev;
}, {});

export default {
	resolve: {
		extensions: ["*", ".js", ".jsx", ".json"]
	},
	devtool: "cheap-module-eval-source-map", 
	entry: [
		"./src/webpack-public-path",
		"react-hot-loader/patch",
		"webpack-hot-middleware/client?reload=true",
		path.resolve(__dirname, "src/index.js")
	],
	target: "web",
	mode: "development",
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
		filename: "[name].bundle.js"
	},
	plugins: [
		new HardSourceWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin(ENV_KEYS),
		new HtmlWebpackPlugin({ 
			template: "src/index.ejs",
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			inject: true
		})
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.eot(\?v=\d+.\d+.\d+)?$/,
				use: ["file-loader"]
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							mimetype: "application/font-woff"
						}
					}
				]
			},
			{
				test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							mimetype: "application/octet-stream"
						}
					}
				]
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							mimetype: "image/svg+xml"
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|ico)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]"
						}
					}
				]
			},
			{
				test: /(\.css|\.scss|\.sass)$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							modules: false,
							minimize: true
						}
					}, {
						loader: "postcss-loader",
						options: {
							plugins: () => [
								require("autoprefixer")
							],
							sourceMap: true,
							ident: "postcss",
						}
					}, {
						loader: "sass-loader",
						options: {
							includePaths: [path.resolve(__dirname, "src", "scss")],
							sourceMap: true
						}
					}
				]
			}
		]
	}
};
