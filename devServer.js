var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

var posts = require('./data/posts');
var comments = require('./data/comments');

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/api/posts', function (req, res) {
  res.json(posts);
});

app.get('/api/posts/:id', function (req, res) {
  const aPost = posts.find(post => post.id === req.params.id);
  if (!aPost) res.send(404).end();
  else res.json(aPost);
});

app.get('/api/comments', function (req, res) {
  res.json(comments);
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});



app.listen(7770, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:7770');
});
