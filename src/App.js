var cred = 'client_id=57ef25d3cc1814331eb2&client_secret=215f49aec637bf0e9e8d7a97e911e69d9b008a77';

var App = Backbone.Model.extend({
  defaults: {
    'showUser': 'seung',
    'showFile': '',
    'shaList': [],
    'decodedContent' : "(content of a selected file goes here)",
    'diffReady' : false,
    'showDiff' : false
  },

  initialize: function(params) {
    var self = this;
      // waits for ajax results then set '.repos' and '.currentRepo'
    this.getRepolistforNewUser(self);
    this.fetchRepoContent(self);
  },

  getRepolistforNewUser: function(context) {
    $.ajax('https://api.github.com/users/'+this.get('showUser')+'/repos?'+cred, {
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(results){
        repos = [];
        //var somedata = results.data.content;
        for(var i = 0; i < results.data.length; i++) {
          var repoName = results.data[i].name;
          repos.push(repoName);
        };
        context.set('repos', repos);
        context.set('currentRepo', repos[0]);
      },
      error: function() {
        console.log('error getting reposlist')
      }
    });
  },

  fetchRepoContent: function(context) {
    var fetchRepoContentUrl = 'https://api.github.com/repos/'+this.get('showUser')+'/'
                            +this.get('currentRepo')+'/contents?'+cred;
    $.ajax(fetchRepoContentUrl,{
      contentType: 'application/json',
      dataType: 'jsonp',
      //async: false,
      success: function(results) {
        //setTimeout(function(){console.log("Hello")},3000);
        repoData = [];
        for(var i = 0; i < results.data.length; i++) {
          var obj = {
            name: results.data[i].name,
            type: results.data[i].type,
            url: results.data[i].url,
            sha: results.data[i].sha
          }

          repoData.push(obj);
          // if(obj.type === 'dir') {
          //   var recursivedata = recursiveRepoData(reponame,obj.name,obj.sha);
          // }
        }
        context.set('currRepoData',repoData);
        console.log('after fetchRepoContent',repoData.length);
      },

      error: function(data) {
        console.log('getRepoData error');
      }
    });
  },

  updateUser: function(newUser) {
    this.set("showUser",newUser);
  }

});

