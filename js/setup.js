//   var cred = '?client_id=57ef25d3cc1814331eb2&client_secret=215f49aec637bf0e9e8d7a97e911e69d9b008a77';
//   var login = function() {
//     $.ajax('https://api.github.com/users/seung'+cred, {
//       success: function(data) {
//         console.log('logged in!');   
//         console.log('login data: ',data);
//       },
//       error: function() {
//         console.log('login failed!')
//       }
//     });
//   };

//  login();

var cred = 'client_id=57ef25d3cc1814331eb2&client_secret=215f49aec637bf0e9e8d7a97e911e69d9b008a77';

var getRepoList = function(showuser) {
  //console.log('getRepoList showuser: ',showuser);
  getData(showuser);
}

var getData = function(showuser) {
  //console.log('getData showuser: ',showuser);

  /////////////////////////
  $.ajax('https://api.github.com/users/'+showuser+'/repos?'+cred, {
  //$.ajax('https://api.github.com/repos/seung/try_git/git/blobs/0ce0259a52b0df0d31441764ed6f690bff75c91c', {
    //$.ajax('https://api.github.com/repos/seung/try_git/git/blobs/0ce0259a52b0df0d31441764ed6f690bff75c91c', {
    contentType: 'application/json',
    dataType: 'jsonp',
    success: function(results){
      repos = [];
      var somedata = results.data.content;
      for(var i = 0; i < results.data.length; i++) {
        var repoName = results.data[i].name;
        repos.push(repoName);
      };
/////////////////////////
      //console.log('list repos: ',repos);
      // overwrite temporarily
      // repos = ["temp"]

      for(var i = 0; i < repos.length; i++) {
        var rname = repos[i];
        getRepoData(repos[i]); ///////////////
        //repoData.push({name: 'name'+i.toString(), type: 'type', sha: 'sha'});
      };
      myAppView.render();
    },

    error: function(data) {
      console.log('error getting list of repos');
      $('#error').prepend(' oh no').append('!');
    }

  });

};

var getRepoData = function(reponame) {
  console.log('getRepoData')
  $.ajax('https://api.github.com/repos/seung/'+reponame+'/contents?'+cred,{
    contentType: 'application/json',
    dataType: 'jsonp',
    success: function(results) {

      for(var i = 0; i < results.data.length; i++) {
        var obj = {
          name: results.data[i].name,
          type: results.data[i].type,
          url: results.data[i].url,
          sha: results.data[i].sha
        }

        repoData = [];
        repoData.push(obj);
        if(obj.type === 'dir') {
          var recursivedata = recursiveRepoData(reponame,obj.name,obj.sha);
        }
      }
    },

    error: function(data) {
      console.log('getRepoData error');
    }

  });
}

var recursiveRepoData = function(reponame,dirname,sha) {
  var url = 'https://api.github.com/repos/seung/'+reponame+'/git/trees/'+sha+'?recursive=1&'+cred;
  $.ajax(url,{
    contentType: 'application/json',
    dataType: 'jsonp',
    success: function(results) {
      for(var i = 0; i < results.data.tree.length; i++) {
        results.data.tree[i].path = dirname+'/'.concat(results.data.tree[i].path);
        repoData.push(results.data.tree[i]);
      }

      // this refers to a backbone view obj rather than a tag, how to get value
      // to be used to set file to show
      $('.file').on('click', function(event) {
        event.preventDefault();
        //myApp.set('showFile',reponame+'/'+this.textContent);
        myApp.set('showFile',this.textContent);
        console.log('showFile',this.textContent);
        console.log('myApp.get(showFile) : ',myApp.get('showFile'));
      });

      // to be used later to expand folders
      $('.dir').on('click', function(event) {
        event.preventDefault();
        console.log('dir')
      });

      // $('.repoItems').on('click', function(event) {
      //   event.preventDefault();
      //   myApp.set('currentRepo',this.textContent);
      //   console.log('currentRepo',this.textContent);
      // });
    },

    error: function(data) {
      console.log('getRepoData error');
    }

  });
}


var getFileContent = function(filepathname) {

  var url = 'https://api.github.com/repos/seung/'+myApp.get('currentRepo')+'/contents/'+filepathname+'?'+cred;
           //'https://api.github.com/repos/seung/temp/SQL/schema.sql'
  $.ajax(url, {
  //$.ajax('https://api.github.com/repos/seung/try_git/contents/testfile.txt?'+cred, {
  //$.ajax('https://api.github.com/repos/seung/try_git/git/blobs/0ce0259a52b0df0d31441764ed6f690bff75c91c', {
  //$.ajax('https://api.github.com/repos/seung/try_git/git/blobs/0ce0259a52b0df0d31441764ed6f690bff75c91c', {

    //contentType: 'application/json',
    accepts: 'application/vnd.github-blob.raw',
    dataType: 'jsonp',
    //contentType: 'application/vnd.github-blob.raw',
    //data: {},
    success: function(results){
      var somedata = results.data.content;
      decodedContent = decode64(somedata);
    },
    error: function(data) {
      console.log('getFileContent error');
    }
  });


}


// dir, file, blob, tree
var showdata = function() {
  for(var i = 0; i < repos.length; i++) {
    var reponame = repos[i];
    console.log('\nreponame : ',reponame)
    for(var j = 0; j < repoData[reponame].length; j++) {
      var datatype = repoData[reponame][j]['type'];
      switch(datatype) {
        case 'dir': case 'file': 
          console.log(JSON.stringify(repoData[reponame][j]['name']));
          break;
        case 'blob': case 'tree':
          console.log(JSON.stringify(repoData[reponame][j]['path']));
          break;
      }
    }      
  }
}

var hideFile = function() {
  $('.fileContent').hide();
}
// used anywhere?
// var processData = function(data) {
//   if(data.length>0){
//     console.log(data.length); 
//   }
// };
