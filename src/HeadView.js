var HeadView = Backbone.View.extend({

  el: '#headView',

  initialize: function(params) {
    var self = this; 
    self.render();

    // change this to when shalist[]['blob'] changes..
    myApp.on('change:decodedContent', function() {
      self.render();
    });
    myApp.on('change:diffReady', function() {
      if(myApp.get('diffReady'))
        self.render();
    });
  },

  render: function(param) {
    var self = this;
    var viewText;
    var headIndex = 0;

    this.$el.children().detach();
    this.$el.addClass("span3");
    //this.$el.append('<h4>head (newer) file</h4>');
    this.$el.append('<h4>head file</h4>');
    var $select = $('<select id="headSelector">');
    this.$el.append($select);

    console.log('myApp',myApp);
    console.log('length: ',myApp.get('shaList').length);
    
     if(myApp.get('shaList').length > 0) {
      for(var i = 0; i < myApp.get('shaList').length; i++) {
        if(myApp.get('shaList')[i]['blob']) {
          var $optionItem = $("<option></option>");
          $optionItem.attr("value",myApp.get('shaList')[i]['sha'])
           //          .text(myApp.get('shaList')[i]['time']);
                       .text(myApp.get('shaList')[i]['sha']);
          $select.append($optionItem);
        }
      }
    } else {
      var $optionItem = $("<option></option>");
      $optionItem.attr("value","(file not selected)")
                 .text("(file not selected)");
      $select.append($optionItem);
    };

//////////// this part changes
headIndex = 0;
    if(myApp.get('shaList').length > 0) {
      // viewText = '<p class="fileContent"><pre><code class="prettyprint">'
      //          + myApp.get('shaList')[headIndex]['blob']
      //          + '</code></pre></p>'; 
      viewText = '<p class="fileContent"><!--'
               + myApp.get('shaList')[headIndex]['blob'].toString()
               + '--></p>'; 
    } else {
      viewText = 'coming soon..';
    }
    /////////
    this.$el.append('<br>'+viewText);
    return this;
  }
});