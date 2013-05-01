var RepoListView = Backbone.View.extend({

  // tagName: "table",
  tagName: "ul",
  //el:"#repolist",

  initialize: function() {
    this.render();
  },

  render: function() {
    var self = this;
    this.$el.children().detach();
    this.$el.append('<h4>'+this.model.get('showUser')+'\'s repos: '+'</h4>');
    for(var i = 0; i < repos.length; i++){
        self.$el.append('<li class="repoItems">'+repos[i]+'</li>');
    }

    $('.repoItems').on('click', function(event) {
      event.preventDefault();
      myApp.set('currentRepo',this.textContent);
      console.log('currentRepo',this.textContent);
    });

    return this;
  },
});
