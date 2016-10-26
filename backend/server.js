var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    dotenv          = require('dotenv'),
    bodyParser      = require('body-parser'),
    request         = require('request');

  var app = express();

  var username = "OiJpHsTjbvJndQ";
  var password = "OEUI53WE4fVuiK4n_XuIiFDgq00";
  var redirect_uri = 'http://127.0.0.1:8080/frontend/app.html';
  var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");  
  var url = "https://www.reddit.com/api/v1/access_token";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
  res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
});

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler());
};

app.post('/gettoken',(req, res)=>{
  query_string = req.body;
  code = query_string.code;
   var params = 'grant_type=authorization_code&code='+code+'&redirect_uri='+redirect_uri;
	request.post({
    url:url,
    body:params,
    headers:{
      "Authorization": auth,
      "Content-Type":"application/x-www-form-urlencoded",
    },
  },(err,response,body)=>{
    if(err){
    res.send(err);
    } else{
    res.send(body);
    }
  });
});

app.post('/getIdentity',(req,res)=>{
  token = req.body;
  access_token = token.access_token;
  request.get({
    url: "https://oauth.reddit.com/api/v1/me",
    headers:{
      "Authorization": "bearer "+access_token,
      "User-Agent":"webapp:com.example.redditapitest:v0.0.1 (by /u/foolcoolmc)",
    },
  },(err,response,body)=>{
    if(err){
    res.send(err);
  } else{
    res.send(body);
  };
  });
});

var port = process.env.PORT || 3002;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
