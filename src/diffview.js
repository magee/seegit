var DiffView = Backbone.View.extend({

  el: '#diffView',

  initialize: function(params) {
    var self = this;
    self.render();

    myApp.on('change:showFile', function() {


    });
  },

  render: function() {
    this.$el.children().detach();
    this.$el.append('<h4>diff view</h4>');
    this.$el.append('<a href="#" id="showDiffResult"><h3>show</h3></a>');
    this.$el.append('<p class="fileContent"><pre><code class="prettyprint">'+'coming soon..'+'</code></pre></p>');
    
    $('#showDiffResult').on('click', function(event) {
      event.preventDefault();
      /// fetch diffview here

    ///temporarily overwrite
      baseSha = myApp.get('shaList')[1]['sha'];
      headSha = myApp.get('shaList')[0]['sha'];
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
          //console.log(Object.keys(results['files'][0]));
          //console.log(results['files'][0]['patch']);
          //console.info(results['files']['patch']);
        },
        error: function(data) {
          console.log('getDiffUrl error');
        }
      });
    })

    return this;
  }
});
