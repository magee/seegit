var HeadView = Backbone.View.extend({

  el: '#headView',

  initialize: function(params) {
    var self = this; 
    self.render();

    // change this to when shalist[]['blob'] changes..
    this.model.on('change:decodedContent', function() {
      self.render();
    });
    this.model.on('change:diffReady', function() {
      self.render();
    });
  },

  render: function(param) {
    var self = this;
    var viewText;
    var headIndex = 0;

    this.$el.children().detach();

    this.$el.append('<h4>head (newer) file</h4>');
    var $select = $('<select id="headSelector">');
    this.$el.append($select);

      if(myApp.get('shaList').length > 0) {
        for(var i = 0; i < myApp.get('shaList').length; i++) {
          if(myApp.get('shaList')[i]['blob']) {
            var optionItem = $("<option></option>");
            optionItem.attr("value",myApp.get('shaList')[i]['time'])
                      .text(myApp.get('shaList')[i]['time']);
            $select.append($optionItem);
          }
        }
      } else {
        var $optionItem = $("<option></option>");
        $optionItem.attr("value","(file not selected)")
                   .text('(file not selected)');
        $select.append($optionItem);
      };

    //this.$el.append('</select>');

    if(myApp.get('shaList').length > 0) {
      viewText = '<p class="fileContent"><pre><code class="prettyprint">'
               + myApp.get('shaList')[headIndex]['blob']
               + '</code></pre></p>'; 
    } else {
      viewText = 'coming soon..';
    }
    this.$el.append('<br>'+viewText);

    return this;
  }
});