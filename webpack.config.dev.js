import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    // debug: true,
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        path.resolve(__dirname, 'src/index'),
        // path.resolve(__dirname, 'assets/app/main.ts')
    ],
    devServer: { noInfo:true},
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'src'),
        // publicPath: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        // Browse too http://localhost:3000/ during development,
        // ./src directory is being served
        // new BrowserSyncPlugin({
        //   host: 'localhost',
        //   port: 5000,
        //   proxy: 'http://localhost:3000/'
        // }),
        // Create HTML file that includes reference to bundled JS.
        new HtmlWebpackPlugin({
            template: 'views/index.hbs',
            "inject": true
        }),
        new webpack.ProvidePlugin({
             $: "jquery",
             jQuery: "jquery"
         }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            // {
            //     test: /\.html$/,
            //     use: [{ loader: 'html-loader' }]
            // },
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
            { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
            {test: /\.scss$/, use:[
                        { loader:'style-loader'},
                        {loader:'css-loader', options:{modules:true}},
                        {loader: "sass-loader"}
                        ]
            },
            {
              test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              use: 'url-loader?limit=10000',
            },
            {
              test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
              use: 'file-loader',
            },
            // {
            //     test: /\.ts$/,
            //     use: [
            //         {loader: 'awesome-typescript-loader', options: {
            //             transpileOnly: true
            //         }},
            //         {loader: 'angular2-template-loader'},
            //         {loader: 'angular-router-loader'}
            //     ]
            // }
            // { test: /bootstrap-sass\/assets\/javascripts\//, use: {loader: 'imports-loader?jQuery=jquery'} },
        ]
    }
}
