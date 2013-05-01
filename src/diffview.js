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

// <div class="container">  
// <h2>Example of creating Modals with Twitter Bootstrap</h2>  
// <div id="example" class="modal hide fade in" style="display: none; ">  
// <div class="modal-header">  
// <a class="close" data-dismiss="modal">×</a>  
// <h3>This is a Modal Heading</h3>  
// </div>  
// <div class="modal-body">  
// <h4>Text in a modal</h4>  
// <p>You can add some text here.</p>                
// </div>  
// <div class="modal-footer">  
// <a href="#" class="btn btn-success">Call to action</a>  
// <a href="#" class="btn" data-dismiss="modal">Close</a>  
// </div> 