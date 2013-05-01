// REMOVE THIS INFO
var cred = 'client_id=57ef25d3cc1814331eb2&client_secret=215f49aec637bf0e9e8d7a97e911e69d9b008a77';

// var getAllCommitsForRepo = function(username, reponame, path) {
//   console.log('getting data for username, reponame, path : '+username + ' ' + reponame + ' ' + path);
//   var allCommitsUrl = 'https://api.github.com/repos/'+username+'/'+reponame+'/commits?'+cred;
//   //console.log(allCommitsUrl);
//   var commitIndex;
//   $.ajax(allCommitsUrl, {
//     contentType: 'application/json',
//     dataType: 'jsonp',
//     success: function(results){
//       console.log('\n\ngetAllCommitsForRepo',myApp.get('showUser'));
//       myApp.set('shaList',[]);
//       var newList = [];
//       for(commitIndex = 0; commitIndex < results.data.length; commitIndex++) {
//         //console.log('pushing onto myApp.get(shaList): ',({'sha':results.data[commitIndex].sha, 'time':results.data[commitIndex].commit.author.date}))
//         newList = newList.push({'sha':results.data[commitIndex].sha, 'time':results.data[commitIndex].commit.author.date});
//       };
//       myApp.set('shaList', newList);
//       getBlobs(myApp.get('username'), myApp.get('reponame'), myApp.get('showFile'));
//     },
//     error: function(data) {
//       // TODO: following part does not work correctly
//       if (commitIndex === 0) {
//         console.log('getAllCommitsForRepo error');
//       } else {
//         console.log('file has not been created at the time of this commit');
//         var newShaList = myApp.get('shaList');     
//         newShaList('shaList')[commitIndex]['blob'] = "(file does not exist)";
//         myApp.set('shaList',newShaList);
//       };
//     }
//   });
// }

// var getBlobs = function(username, reponame, path) {
//   console.log('getBlobs called with username, reponame, path: ',username, reponame, path)
//   console.log('myApp.get(shaList) length',myApp.get('shaList').length)
//   for(var i = 0; i < myApp.get('shaList').length; i++) {
//     //console.log('getBlobs i, username, reponame, path:',i, username, reponame, path)
//     fetchBlobs(i, username, reponame, path);
//   }
//   blobReady = true;
// }

// var fetchBlobs = function(index, username, reponame, path) { 
//   blobsUrl = 'https://api.github.com/repos/'+username+'/'+reponame+'/contents/'+path+'?ref='+shaList[index]['sha']+'&'+cred;
//   //console.log('fetchBlobs with index = ',index,' sha: ',shaList[index]['sha'])
//   //console.log(blobsUrl);
//   $.ajax(blobsUrl, {
//     //contentType: 'application/json',
//     //dataType: 'jsonp',
//     async: false,
//     success: function(results){
//       if(shaList[index] === undefined) console.log('data length mismatch error');
//       shaList[index]['blob'] = results['content'];
//       //console.log('results[content] = ',results['content']);
//       decodeFile(index, shaList[index]['blob']);
//       //console.log('shaList[index][blob]: ',shaList[index]['blob'])
//     },
//     error: function(data) {
//       console.log('fetchBlobs error');
//     }
//   });
// }

// var decodeFile = function(j, input) {
//   return shaList[j]['blob'] = decode64(input);
// }

var getDiffUrl = function(userName, repoName, baseSha, headSha) {
  if(baseSha === "undefined") {
    baseSha = shaList[shaList.length - 2].sha;
  }
  if(headSha === "undefined") {
    baseSha = shaList[shaList.length - 1].sha;
  }
  //var diffUrl = 'https://api.github.com/repos/'+userName+'/'+repoName+'/compare/'+userName+':'+baseSha+'...'+userName+':'+headSha+'?'+cred;

  //var diffUrl = 'https://github.com/'+userName+'/'+repoName+'/compare/'+userName+':'+baseSha+'...'+userName+':'+headSha+'.diff?'+cred;
  
  //var diffUrl = 'https://api.github.com/repos/'+userName+'/'+repoName+'/compare/'+userName+':'+baseSha+'...'+userName+':'+headSha+'?'+cred;
  diffUrl = 'https://api.github.com/repos/seunglim/testrepo1/compare/seunglim:b6fd9b2b135655e336d76f57ebae45bcc77f982f...seunglim:cb22c9e3614dd12aa38de875899b00add00832c7?client_id=57ef25d3cc1814331eb2&client_secret=215f49aec637bf0e9e8d7a97e911e69d9b008a77';
  console.log('getDiff url: ',diffUrl);
  $.ajax(diffUrl, {
    //contentType: 'application/json',
    //dataType: 'jsonp',
    async: false,
    success: function(results){
      console.log(results);
    },
    error: function(data) {
      console.log('getDiffUrl error');
    }
  });
}

function foo(response) {
  console.log('a:',response)
  var meta = response.meta
  var data = response.data
  console.log(meta.toString());
  console.log(JSON.stringify(meta));
  console.log(data.toString());
  console.log(JSON.stringify(data));
  console.log('hi')
}

var cred2 = 'client_id=ea54367e0a769c6e4d9d&client_secret=eb4f75ef41ac8805cc540008e7f0673282ef5116'
var getDiff = function() {
  var diff_url = 'https://api.github.com/repos/seunglim/testrepo1/compare/seunglim:b6fd9b2b135655e336d76f57ebae45bcc77f982f...seunglim:cb22c9e3614dd12aa38de875899b00add00832c7?client_id=57ef25d3cc1814331eb2&client_secret=215f49aec637bf0e9e8d7a97e911e69d9b008a77';
  // var diff_url = 'https://github.com/seunglim/testrepo1/compare/seunglim:b6fd9b2b135655e336d76f57ebae45bcc77f982f...seunglim:cb22c9e3614dd12aa38de875899b00add00832c7.diff?'+cred
  //var diff_url = 'https://api.github.com/repos/seunglim/testrepo1/compare/seunglim:b6fd9b2b135655e336d76f57ebae45bcc77f982f...seunglim:cb22c9e3614dd12aa38de875899b00add00832c7.diff?'+cred;
  console.log('getDiff called')
  $.ajaxSetup({
    "access-control-allow-origin": "http://www.seegit.com",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "Access-Control-Allow-Headers": "Authorization, X-Requested-With",
    "Access-Control-Allow-Methods" : "GET, POST, PATCH, PUT, DELETE",
    "Access-Control-Expose-Headers" : "Link, X-RateLimit-Limit, X-RateLimit-Remaining, X-OAuth-Scopes, X-Accepted-OAuth-Scopes",
    "Access-Control-Max-Age" : 86400,
    "Access-Control-Allow-Credentials": true
   });
  $.ajax(diff_url, {
    //accepts: 'text/plain; charset=utf-8;application/vnd.github.VERSION.diff' ,
    accept: 'application/vnd.github.VERSION.diff' ,
    dataType: 'text/plain',
    dataType: '*',
    origin: 'http://www.seegit.com',
    contentType: 'application/json',
    //Accept: 'application/vnd.github.VERSION.diff',
    //accepts: '*/*',
    //crossDomain: true,
    //callback: foo,
    //Access-Control-Allow-Origin: *,
    success: function(results){
      // var resultJson = {};
      console.log('success results:',results)
      // resultJson['temp'] = {'somekey':results}
      // return resultJson;
    },
    error: function(data) {
      console.log('getDiff error', data, '...');
    }
  });  
};


// var defaultCorsHeaders = {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10 // Seconds.
// };


