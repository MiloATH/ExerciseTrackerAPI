var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;

app.get('/',function(req,res){
  res.sendFile(process.cwd() + '/views/index.html');
});

app.listen(PORT,function(req,res){
  console.log('listening on port ', PORT);
});