import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
export default {
    stats: "errors-only",
    devServer:{
        noInfo: false
    },
    devtool: 'source-map',
    entry: {
        vendor: path.resolve(__dirname, 'src/vendor'),
        main:   path.resolve(__dirname, 'src/index')
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    plugins: [
        // Genereate an external css file with a hash in the filename
        new ExtractTextPlugin('[name].[contenthash].css'),
        // Hash the files using Md5 so that their names change when the content changes.
        new WebpackMd5Hash(),
        // Use CommonsChunkPlugin to cereate a seperate bundle
        // of vendor libraries so that they're cached seperately.
        new webpack.optimize.CommonsChunkPlugin({name:'vendor'}),
        // Create HTML file that includes reference to bundled JS.
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify:{
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            // Properties you define here are available in index.html
            // using htmlWebpackPlugin.option.varname
            // trackJSToken: 'adfdsdsafsadfsa'
        }),
        // Eliminate duplicate packages when generating bundle
            // new webpack.optimize.DedupePlugin(),
        // Minify JS
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
            {test: /\.scss$/, use: ExtractTextPlugin.extract({use: ["sass-loader","css-loader"], fallback: "style-loader"})}
        ]
    }
}
