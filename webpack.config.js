const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode:'development',
  stats: {
      colors: true
  },
  devtool: 'source-map',
  entry: './src/index.js',          
  output: {                 
    path: path.resolve(__dirname,'dist'),          
    filename: 'js/app.bundle.js', 
  }, 
  plugins:  [
      new CopyWebpackPlugin([ 
            { from: 'src/index.html' },
            { from: 'src/static/icons' , to: 'static/icons'},
            { from: 'src/static/data' , to: 'static/data'}
        ]),
      new MiniCssExtractPlugin({
            filename: "styles/globals.css"
        }),
  ], 
  module: {
    rules: [
      { 
        test:/\.js$/,
        exclude: /node_modules/ ,
        use: [{loader: 'babel-loader'}]
      },
      { test: /\.css/,use: ['style-loader', 'css-loader'] },
      // {
      //   test: /\.css$/,
      //   use: [
      //           MiniCssExtractPlugin.loader,
      //           "css-loader"
      //         ]
      //   }
    ]
  },
  devServer: {
    historyApiFallback:true,
    contentBase: './',
    compress: true,
    port: 3030,
    stats:"minimal",
    // open:true
  },
};