var url = require('url'),
   http = require('http'),
   node = require("node-jquery"),
   data = [], 
   userId  = 'seung',
   repos = [];

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var handleRequest = function(request, response) {

  $.ajax('https://api.github.com/repos/seung/try_git/contents/testfile.txt', {
  //$.ajax('https://api.github.com/repos/seung/try_git/git/blobs/0ce0259a52b0df0d31441764ed6f690bff75c91c', {
  //$.ajax('https://api.github.com/repos/seung/try_git/git/blobs/0ce0259a52b0df0d31441764ed6f690bff75c91c', {

    accepts: 'application/vnd.github-blob.raw',
    dataType: 'jsonp',

    success: function(results){
      console.log('decoded data: ');
      var somedata = results.data.content;
      console.log(new Buffer(somedata, 'base64').toString('ascii'));
      console.log('results: ')
      console.log(JSON.stringify(results));
    },

    error: function(data) {
      console.log('error');
    }

  });

  console.log("Serving request type " + request.method + " for url " + request.url);
  console.log('request.method: ' + request.method);

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";
  var statusCode = 200;
  var path = url.parse(request.url).pathname.split('/');

  if(request.method === 'POST') {
    var postData = '';
    request.on('data', function(chunk) {
      postData += chunk;
    });

    request.on('end', function() {
      postData = JSON.parse(postData);
    }); 
                          // pathname = url.parse(request.url).pathname;
  } else if(request.method === 'GET') {
      // //$.ajax('https://api.github.com/users/seung/followers', {
      // //$.ajax('https://api.github.com/users/seung/repos', {
      // //$.ajax('https://api.github.com/repos/seung/try_git/contents', {
      // $.ajax('https://api.github.com/repos/seung/try_git/contents/testfile.txt', {
      // //$.ajax('https://api.github.com/repos/seung/try_git/git/blobs/0ce0259a52b0df0d31441764ed6f690bff75c91c', {
      // //$.ajax('https://api.github.com/repos/seung/try_git/git/blobs/0ce0259a52b0df0d31441764ed6f690bff75c91c', {

      //   //contentType: 'application/json',
      //   accepts: 'application/vnd.github-blob.raw',
      //   dataType: 'jsonp',
      //   //contentType: 'application/vnd.github-blob.raw',
      //   //data: {},
      //   success: function(results){
      //     console.log('decoding data..')
      //     var somedata = results.data.content;
      //     console.log(new Buffer(somedata, 'base64').toString('ascii'));
      //     console.log(JSON.stringify(results));
      //   },
      //   error: function(data) {
      //     console.log('error');
      //   }
      // });
  }
  else {  // request types other than POST
    request.on('end', function() {
      (path[1] !=='classes') ? statusCode = 404 
                             : (request.method==='POST' ? statusCode = 200 : statuscode = 200)
    }); // -> closes request.on('end'...
  }

  response.writeHead(statusCode, headers); 
  response.end(JSON.stringify(data) || []); 
  console.log('data : ' + JSON.stringify(data))
};

exports.handleRequest = handleRequest;
