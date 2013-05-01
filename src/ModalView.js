var ModalView = Backbone.View.extend({
  
  //tagName: "div", //"table"
  el: "#modalView",

  initialize: function(params) {
    var self = this;
    self.render();

    // this.model.on('change:showDiff', function() {


    // });
  },

  render: function() {
    var self = this;
    this.$el.children().detach();
    this.$el.append('<h4>modal view</h4>');
//     this.$el.append('<div class="container"><h2>Example of Modals</h2><div id="example" class="modal hide fade in" style="display: none; "><div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3>This is a Modal Heading</h3></div><div class="modal-body"><h4>Text in a modal</h4><p>You can add some text here.</p></div> <div class="modal-footer">  <a href="#" class="btn btn-success">Call to action</a> 
// <a href="#" class="btn" data-dismiss="modal">Close</a>  </div> ');
    return this;
  },
  off: function() {
    console.log('off');
  }

});
