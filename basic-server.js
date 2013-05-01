var http = require("http");
var includeHandler = require('./request-handler');

// var requestListener = function (request, response) {
// };

var port = 8080;
var ip = "127.0.0.1";

// var server = http.createServer(requestListener);
var server = http.createServer(includeHandler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
/* To start this server, run:
     node basic-server.js
 *  on the command line.

 * To connect to the server, load http://127.0.0.1:8080 in your web
 * browser.*/

