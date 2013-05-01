var DiffView = Backbone.View.extend({

  el: '#diffModal',

  initialize: function(params) {
    var self = this;
    self.render();

    myApp.on('change:diffText', function() {
      self.render();

    });
  },

  render: function() {
    var self = this;
    this.$el.children().detach();
    this.$el.append('<h4>diff view</h4>');
    this.$el.append('<a href="#" id="showDiffResult"><button>show</button></a>');
    this.$el.append('<p class="fileContent">'+myApp.get('diffText').toString()+'</p>');
    
    $('#showDiffResult').on('click', function(event) {
      event.preventDefault();
      baseSha = $("#baseSelector option:selected").val();
      console.log('baseSha',baseSha)
      headSha = $("#headSelector option:selected").val();
      console.log('headSha',headSha)
      /// fetch diffview here
      self.getDiffText(baseSha,headSha);
    });

    return this;
  },

  getDiffText : function(baseSha, headSha) {
      ///temporarily overwrite
      // baseSha = myApp.get('shaList')[1]['sha'];
      // headSha = myApp.get('shaList')[0]['sha'];
      //var diffUrl = 'https://api.github.com/repos/'+userName+'/'+repoName+'/compare/'+userName+':'+baseSha+'...'+userName+':'+headSha+'?'+cred;
      diffUrl = 'https://api.github.com/repos/'
              +myApp.get('showUser')+'/'
              +myApp.get('currentRepo')+'/compare/'
              +myApp.get('showUser')+':'
              +baseSha+'...'
              +myApp.get('showUser')+':'
              +headSha+'?'+cred;
      console.log('diffUrl',diffUrl)
      $.ajax(diffUrl, {
        //contentType: 'application/json',
        //dataType: 'jsonp',
        //async: false,
        success: function(results){
          window.returnvalue = results;
          //console.log(Object.keys(results));
          var filesInResult = [];
          for(var i = 0; i < results['files'].length; i++) {
            filesInResult.push(results['files'][i]['filename']);
          }
          console.log(filesInResult);
          var fileNumber = filesInResult.indexOf(myApp.get('showFile'));
          var fileText = results['files'][fileNumber]['patch'];
          myApp.set('diffText',fileText);
          //console.log(results['files'][0]['patch']);
          //console.info(results['files']['patch']);
        },
        error: function(data) {
          console.log('getDiffUrl error');
        }
      });
    }
});
