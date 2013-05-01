var BaseView = Backbone.View.extend({

  el: '#baseView',

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
    var baseIndex = Math.max(myApp.get('shaList').length - 1,0);

    this.$el.children().detach();

    this.$el.append('<h4>base (older) file</h4>');
    var $select = $('<select id="baseSelector">');
    this.$el.append($select);
    
    console.log('myApp',myApp);
    console.log('length: ',myApp.get('shaList').length);
    
    if(myApp.get('shaList').length > 0) {
      for(var i = 0; i < myApp.get('shaList').length; i++) {
        if(myApp.get('shaList')[i]['blob']) {
          var $optionItem = $("<option></option>");
          $optionItem.attr("value",myApp.get('shaList')[i]['time'])
                     .text(myApp.get('shaList')[i]['time']);
          $select.append($optionItem);
        }
      }
    } else {
      var $optionItem = $("<option></option>");
      $optionItem.attr("value","(file not selected)")
                 .text("(file not selected)");
      $select.append($optionItem);
    };

////////// this part changes put in func
baseIndex = 0;
    if(myApp.get('shaList').length > 0) {
      viewText = '<p class="fileContent"><pre><code class="prettyprint">'
               + myApp.get('shaList')[baseIndex]['blob']
               + '</code></pre></p>'; 
    } else {
      viewText = 'coming soon..';
    }
    ///////////////
    this.$el.append('<br>'+viewText);

    return this;
  }
});