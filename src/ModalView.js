//var fileHistory = myApp.get('shaList');

var ModalView = Backbone.View.extend({

  // el: '#modalView',
  el: '#diffModal',

  initialize: function(params) {
    var self = this;
    this.render();
  },

  render: function() {
    var self = this;
    this.$el.children().detach();

    this.$el.append(new BaseFileView(0));
    this.$el.append(new DiffFileView(0,1));
    this.$el.append(new HeadFileView(0));
    return this;
  }
});

var BaseFileView = Backbone.View.extend({
  initialize: function(params) {
    var self = this;
    self.render() ;
  },

  render: function(){
    var self = this;  
    this.$el.children().detach();
    this.$el.addClass("span3");
    this.$el.append('<h4>base (older) file</h4>');

    var $select = $('<select id="headSelector">');

    var optionItem = $("<option></option>");
    if(fileHistory.length > 0) {
      for(var i = 0; i < fileHistory.length; i++) {
        if(fileHistory[i]['blob']) {
          optionItem.attr("value",fileHistory[i]['time'])
                    .text(fileHistory[i]['time']);
          $select.append($optionItem);
        }
      }
    } else {
      $optionItem.attr("value","(file not selected)")
                 .text('(file not selected)');
      $select.append($optionItem);
    };
    this.$el.append($select);

    this.$el.append('file contents');

    return this;
  }
});

var DiffFileView = Backbone.View.extend({
  initialize: function(params) {
    var self = this;
    self.render() ;
  },

  render: function(){
    var self = this; 
    this.$el.children().detach();
    this.$el.addClass("span3");
    this.$el.append('<h4>diff file</h4>');
    return this;
  }

});

var HeadFileView = Backbone.View.extend({
  initialize: function(params) {
    var self = this;
    self.render() ;
  },

  render: function(){
    var self = this;  
    this.$el.children().detach();
    this.$el.addClass("span3");
    this.$el.append('<h4>base (older) file</h4>');

    var $select = $('<select id="headSelector">');

    var optionItem = $("<option></option>");
    if(fileHistory.length > 0) {
      for(var i = 0; i < fileHistory.length; i++) {
        if(fileHistory[i]['blob']) {
          optionItem.attr("value",fileHistory[i]['time'])
                    .text(fileHistory[i]['time']);
          $select.append($optionItem);
        }
      }
    } else {
      $optionItem.attr("value","(file not selected)")
                 .text('(file not selected)');
      $select.append($optionItem);
    };
    this.$el.append($select);

    this.$el.append('file contents');

    return this;
  }
});


// var ModalView = Backbone.View.extend({
  
//   //tagName: "div", //"table"
//   el: "#modalView",

//   initialize: function(params) {
//     var self = this;
//     self.render();

//     // this.model.on('change:showDiff', function() {


//     // });
//   },

//   render: function() {
//     var self = this;
//     this.$el.children().detach();
//     this.$el.append('<h4>modal view</h4>');
// //     this.$el.append('<div class="container"><h2>Example of Modals</h2><div id="example" class="modal hide fade in" style="display: none; "><div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3>This is a Modal Heading</h3></div><div class="modal-body"><h4>Text in a modal</h4><p>You can add some text here.</p></div> <div class="modal-footer">  <a href="#" class="btn btn-success">Call to action</a> 
// // <a href="#" class="btn" data-dismiss="modal">Close</a>  </div> ');
//     return this;
//   },
//   off: function() {
//     console.log('off');
//   }

// });

