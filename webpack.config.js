const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// console.log('ce', path.join(__dirname, 'src'));
const fs = require('fs');

function getEntries(){
  const entries = {
    'index.bundle.js': [path.resolve(__dirname, 'src/index.js')],
  }
  const entriesDir = path.resolve(__dirname, 'src/js/entries');
  // const files = [];
  fs.readdir(entriesDir, (err, files)=>{
    files.forEach(file=>{
      console.log(file);
      entries[file] = [path.resolve(entriesDir, 'file')];
    })
  });
  return entries;
}

module.exports = {
  // context: path.resolve(__dirname, 'src'),
  // context: __dirname,
  entry: {
    'index.bundle.js': [path.resolve(__dirname, 'src/index.js')],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'bla'
      template: 'public/index.html'
      // files:{
      //   css: 'src/css/main.css'
      // }
    }),
    new MiniCssExtractPlugin()
  ],
  resolve:{
    alias:{
      s: path.resolve(__dirname, 'src')
    },
    fallback: {
        "fs": false,
        "path": false
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options:{
          sources: false,
          // scriptingEnabled: true,
        // },
        },
      },
      // {
      //   test: /\.css$/i,
      //   loader: "css-loader",
      //   options: {
      //     import: true,
      //   },
      //   // generator: {
      //   //   filename: '[name][ext]'
      //   // }
      // },
    ],
  },
  devServer: {
    hot: true,
    static:{
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    // historyApiFallback: {
    //   rewrite: [
    //     {
    //       from: /^\/.+$/, to: '/public/pages/main.html'
    //     }
    //   ]
    // },
    // contentBase: path.join(__dirname, 'src'),
    // compress: true,
    port: 5000,
    // liveReload: true,
    
    // watchContentBase: true,
    // publicPath: '/assets/',
  },
};
