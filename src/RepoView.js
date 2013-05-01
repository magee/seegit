var RepoView = Backbone.View.extend({

  tagName: "table",
  el:"#dirMenu",

  initialize: function() {
    this.render();
  },

  render: function() {
    var self = this;
    this.$el.children().detach();

    this.$el.append('<h4><b>currentRepo: '+this.model.get('currentRepo')+'</b></h4>');
    this.$el.append(new RepoListView({model: this.model}).render().el);
    
    this.repoItemView = new RepoItemView({model: this.model}).render();
    this.$el.append(this.repoItemView.render().el);
    
    return this;
  }

});
