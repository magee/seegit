  // this.collection = myApp
  // this.collection.library = myRepos
var RepoItemView = Backbone.View.extend({

  // tagName: "table",
  tagName: "ul",
  //el: "#repos",
  initialize: function() {
    this.render();
  },

  render: function() {

    var self = this;
    self.$el.children().detach();
    self.$el.append('<h4>'+myApp.get('currentRepo')+' contains:</h4>');

    //self.model.get('currRepoData').map(function(item) {
    repoData.map(function(item) {
      var itemtype = item.type

      if(itemtype === 'tree' || itemtype === 'blob') {
        itemname = item.path;
      } else {
        itemname = item.name;
      }

      if(itemtype === 'dir' || itemtype === 'tree') {
        itemclass = 'dir';
      } else {
        itemclass = 'file';
      }
      self.$el.append('<li class="'+itemclass+'">'+itemname+'</li>');
      self.$el.attr('id',"clickItems");
    });

    return this;
  }

  //  refer to delegateEvents on backbonejs.org/#View
  // events: {
  //   'click' : 'showthisfile'
  // },

  // showthisfile: function() {

  // }
});


    //   this.model.get('showUser')
    // this.model.get('repos').map(function(item) {
    //         self.$el.append("<h3>"+item+"</h3>"); 
    // })