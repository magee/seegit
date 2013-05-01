var FileView = Backbone.View.extend({

  tagName: "table",
  el:"#dispfile",

  initialize: function() {
    var self = this;
    this.render();

    this.model.on('change:decodedContent', function() {
      self.render();
    })
  },

  render: function() {
    this.$el.children().detach();
    this.$el.append('<a href="#" id="diffit"><h1>dif:<b>f</b>it</h1></a>');
    this.$el.append('<h4>current repo: '+myApp.get('currentRepo')+'</h4>');
    this.$el.append('<h4>showing file: '+myApp.get('showFile')+'</h4>');
    this.$el.append('<p class="fileContent">'+myApp.get('decodedContent')+'</p>');
    // this.$el.append('<p class="fileContent"><pre><code class="prettyprint">'+myApp.get('decodedContent')+'</code></pre></p>');
    $('#diffit').on('click', function(event) {
      event.preventDefault();
      myApp.set('showDiff',true);

    $('#modalView').append(new BaseView({model: this.model}).render().el);
    $('#modalView').append(new DiffView({model: this.model}).render().el);
    $('#modalView').append(new HeadView({model: this.model}).render().el); 
$('#modalView').modal({'show':true});
      console.log('showDiff true',myApp.get('shaList'));
    })
    return this;
  }

});
