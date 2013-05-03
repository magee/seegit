var AppView = Backbone.View.extend({

  el: '#main',

  initialize: function(params) {
    var self = this;
    this.fetchRepoListAndRender(self);
    this.fetchFileContentAndRender(self);

    this.model.on('change:showUser', function() {
      // console.log('change:showUser');
      decodedContent = "(content of a selected file goes here)";
      myApp.set('decodedContent',decodedContent);
      myApp.set('showFile', "");
      self.fetchRepoListAndRender(self);
      myApp.set('diffReady',false);
    });

    this.model.on('change:currentRepo', function() {
      // console.log('change:currentRepo');
      decodedContent = "(content of a selected file goes here)";
      myApp.set('decodedContent',decodedContent);
      myApp.set('showFile', "");
      self.fetchRepoContentAndRender(self);
      myApp.set('diffReady',false);
    });

    this.model.on('change:showFile', function() {
      //console.log('change:showFile');
      self.fetchFileContentAndRender(self);
      myApp.set('diffReady',true);
      if(myApp.get('showFile')!==""){
        self.getAllCommitsForRepo(myApp.get('showUser'),myApp.get('currentRepo'),myApp.get('showFile'));
      };
      if(myApp.get('shaList').length > 0)
        myApp.set('decodedContent',myApp.get('shaList')[0]['blob']);
    }); 

  },

  render: function() {
    //this.$el.children().detach();
    var self = this;
    this.$el.append(new RepoView({model: this.model}).render().el);
    this.$el.append(new FileView({model: this.model}).render().el); 
    
    // this.$el.append(new BaseView({model: this.model}).render().el);
    // this.$el.append(new DiffView({model: this.model}).render().el);
    // this.$el.append(new HeadView({model: this.model}).render().el); 

    $('.repoItems').on('click', function(event) {
      event.preventDefault();
      myApp.set('currentRepo',this.textContent);
    });

    $('.file').on('click', function(event) {
      event.preventDefault();
      myApp.set('showFile',this.textContent);
    });

    return this;
  },

  // returns the list of all repos for a given user
  fetchRepoListAndRender: function(context) {
    $.ajax('https://api.github.com/users/'+this.model.get('showUser')+'/repos?'+cred, {
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(results){
        repos = [];
        var somedata = results.data.content;
        for(var i = 0; i < results.data.length; i++) {
          var repoName = results.data[i].name;
          repos.push(repoName);
        };
        myApp.set('currentRepo', repos[0]);
        context.render();
      },
      error: function(data) {
        console.log('getRepoData error');
      }
    });
  },

  // not used temporarily
  recursiveRepoData : function(dirname,sha,context) {
    var url = 'https://api.github.com/repos/'+this.model.get('showUser')+'/'
            +this.model.get('currentRepo')+'/git/trees/'+sha+'?recursive=1&'+cred;
    $.ajax(url,{
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(results) {
        for(var i = 0; i < results.data.tree.length; i++) {
          results.data.tree[i].path = dirname+'/'.concat(results.data.tree[i].path);
          repoData.push(results.data.tree[i]);
        };
        context.render();
      }
    });
  },

  fetchRepoContentAndRender : function(context) {
    var self = this;
    var url = 'https://api.github.com/repos/'+this.model.get('showUser')
            +'/'+this.model.get('currentRepo')+'/contents?'+cred;
    $.ajax(url,{
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(results) {
        repoData = [];
        for(var i = 0; i < results.data.length; i++) {
          var obj = {
            name: results.data[i].name,
            type: results.data[i].type,
            url: results.data[i].url,
            sha: results.data[i].sha
          }
          repoData.push(obj);
          // not used temporarily due to download speed
          if(obj.type === 'dir') {
            self.recursiveRepoData(obj.name,obj.sha,context);
            console.log('calling recursiveRepoData');
          }
        };
        context.render();
      },

      error: function(data) {
        console.log('getRepoData error');
      }
    });
  },

  fetchFileContentAndRender: function(context) {
    if(myApp.get('showFile') !== "") {
      var url = 'https://api.github.com/repos/'+this.model.get('showUser')+'/'
              +this.model.get('currentRepo')+'/contents/'+this.model.get('showFile')+'?'+cred;
      // console.log('fetchFileContentAndRender ',url)
      $.ajax(url, {

        //contentType: 'application/json',
        accepts: 'application/vnd.github-blob.raw',
        dataType: 'jsonp',
        success: function(results){
          var somedata = results.data.content;
          decodedContent = decode64(somedata);
          myApp.set('decodedContent',decodedContent)
          //context.render();
        },
        error: function(data) {
          console.log('getFileContent error');
        }
      }); 
    } else {
      decodedContent = "content of a selected file goes here";
      myApp.set('decodedContent',decodedContent)
      //context.render();/////////////
    };
  },

  getAllCommitsForRepo: function(username, reponame, path) {
    //var innerSelf = this;
    console.log('\ngetting data for username, reponame, path : '+username + ' ' + reponame + ' ' + path);
    var allCommitsUrl = 'https://api.github.com/repos/'+username+'/'+reponame+'/commits?'+cred;
    //console.log(allCommitsUrl);
    var commitIndex;
    $.ajax(allCommitsUrl, {
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(results){
        console.log('\n\ngetAllCommitsForRepo',myApp.get('showUser'));
        myApp.set('shaList',[]);
        var newList = [];
        for(commitIndex = 0; commitIndex < results.data.length; commitIndex++) {
          //console.log('pushing onto myApp.get(shaList): ',({'sha':results.data[commitIndex].sha, 'time':results.data[commitIndex].commit.author.date}))
          newList.push({'sha':results.data[commitIndex].sha, 'time':results.data[commitIndex].commit.author.date});
        };
        myApp.set('shaList', newList);
        myAppView.getBlobs(myApp.get('showUser'), myApp.get('currentRepo'), myApp.get('showFile'));
      },
      error: function(data) {
        // TODO: following part does not work correctly
        if (commitIndex === 0) {
          console.log('getAllCommitsForRepo error');
        } else {
          console.log('file has not been created at the time of this commit');
          var newShaList = myApp.get('shaList');     
          newShaList[commitIndex]['blob'] = "(file does not exist)";
          myApp.set('shaList',newShaList);
        };
      }
    });
  },

  getBlobs : function(username, reponame, path) {
    console.log('\n\ngetBlobs called with username, reponame, path: ',username, reponame, path)
    console.log('myApp.get(shaList) length',myApp.get('shaList').length)
    for(var i = 0; i < myApp.get('shaList').length; i++) {
      //console.log('getBlobs i, username, reponame, path:',i, username, reponame, path)
      myAppView.fetchBlobs(i, myApp.get('showUser'), myApp.get('currentRepo'), myApp.get('showFile'));
    }
    myApp.set('blobReady',true);
  },

  fetchBlobs : function(index, username, reponame, path) { 
    blobsUrl = 'https://api.github.com/repos/'+username+'/'+reponame+'/contents/'+path+'?ref='+myApp.get('shaList')[index]['sha']+'&'+cred;
    console.log('\n\nfetchBlobs with index = ',index,' sha: ',myApp.get('shaList')[index]['sha'])
    console.log(blobsUrl);
    $.ajax(blobsUrl, {
      //contentType: 'application/json',
      //dataType: 'jsonp',
      async: false,
      success: function(results){
        console.log('fetchBlobs success');
        if(myApp.get('shaList')[index] === undefined) console.log('data length mismatch error');
        var newShaList = myApp.get('shaList');
        newShaList[index]['blob'] = results['content'];
        myApp.set('shaList', newShaList);
        //console.log('results[content] = ',results['content']);
        myAppView.decodeFile(index, newShaList[index]['blob']);
        //console.log('shaList[index][blob]: ',shaList[index]['blob'])
      },
      error: function(data) {
        console.log('fetchBlobs error');
      }
    });
  },

  decodeFile : function(j, input) {
    var newShaList = myApp.get('shaList');
    newShaList[j]['blob'] = decode64(input);
    myApp.set('shaList',newShaList);
  }



});
