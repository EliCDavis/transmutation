
const webpack = require('webpack');
const middlware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const express = require('express');
const app = express();
var path    = require("path");


app.use(require("webpack-hot-middleware")(compiler));


app.use(middlware(compiler, {
    reload: true,
    publicPath: webpackConfig.output.publicPath
}));


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
  });

app.listen(3000, () => console.log('Example app listening on port 3000!'))