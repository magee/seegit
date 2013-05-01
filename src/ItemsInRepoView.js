var ItemsInRepoView = Backbone.View.extend({

  tagName: "ul",

  initialize: function() {
    this.render();
  },

  render: function() {

    var self = this;
    self.$el.children().detach();
    self.$el.append('<h4>'+myApp.get('currentRepo')+' contains:</h4>');
    self.$el.append('<li>Expand?  '
      +'<input name="expandCheck" id="expand" type="checkbox" checked="'+myApp.get('expand')+'">');
    
    repoData.map(function(item) {
      var itemtype = item.type;

      itemname = (itemtype === 'tree' || itemtype === 'blob') ? item.path : item.name;
      itemclass = (itemtype === 'dir' || itemtype === 'tree') ? 'dir' : 'file';

      self.$el.append('<li class="'+itemclass+'">'+itemname+'</li>');
      //self.$el.append('<li id="clickItems" class="'+itemclass+'">'+itemname+'</li>');
    });

    return this;
  }
});
