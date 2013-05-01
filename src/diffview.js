var DiffView = Backbone.View.extend({

  el: '#diffView',

  initialize: function(params) {
    var self = this;
    self.render;

    this.model.on('change:showFile', function() {


    });
  },

  render: function() {
    this.$el.children().detach();
    this.$el.append('<h4>diff view</h4>');
    this.$el.append('<p class="fileContent"><pre><code class="prettyprint">'+'coming soon..'+'</code></pre></p>');
    return this;
  }
});