var AppView = Backbone.View.extend({

  el: '#main',

  initialize: function(params) {
    var self = this;
    this.fetchRepoListAndRender(self);
    this.fetchFileContentAndRender(self);

    this.model.on('change:showUser', function() {
      console.log('change:showUser');
      decodedContent = "(content of a selected file goes here)";
      myApp.set('showFile', "");
      self.fetchRepoListAndRender(self);
      myApp.set('diffReady',false);
    });

    this.model.on('change:currentRepo', function() {
      console.log('change:currentRepo');
      decodedContent = "(content of a selected file goes here)"
      myApp.set('showFile', "");
      self.fetchRepoContentAndRender(self);
      myApp.set('diffReady',false);
    });

    this.model.on('change:showFile', function() {
      //console.log('change:showFile');
      self.fetchFileContentAndRender(self);
      myApp.set('diffReady',true);
      if(myApp.get('showFile')!==""){
        getAllCommitsForRepo(myApp.get('showUser'),myApp.get('currentRepo'),myApp.get('showFile'));
      };
      if(shaList.length > 0)
        myApp.set('decodedContent',shaList[0]['blob']);
    });

  },

  render: function() {
    //this.$el.children().detach();
    var self = this;
    this.$el.append(new RepoView({model: this.model}).render().el);
    this.$el.append(new FileView({model: this.model}).render().el); 
    
    this.$el.append(new BaseView({model: this.model}).render().el);
    this.$el.append(new DiffView({model: this.model}).render().el);
    this.$el.append(new HeadView({model: this.model}).render().el); 

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

  fetchRepoListAndRender: function(context) {
    $.ajax('https://api.github.com/users/'+this.model.get('showUser')+'/repos?'+cred, {
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
          // if(obj.type === 'dir') {
          //   self.recursiveRepoData(obj.name,obj.sha,context);
          //   console.log('calling recursiveRepoData');
          // }
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
      console.log('fetchFileContentAndRender ',url)
      $.ajax(url, {

        //contentType: 'application/json',
        accepts: 'application/vnd.github-blob.raw',
        dataType: 'jsonp',
        //contentType: 'application/vnd.github-blob.raw',
        //data: {},
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
      context.render();/////////////
    };
  },
});
