var RepoEntryView = Backbone.View.extend({
  el: '#repos',
  tagName: "ul",

  initialize: function() {
    // this.model.on('changeUser', function() {
    //   this.render();
    // }, this)
    //console.log('ln 9 this.collection: ',JSON.stringify(this.collection));
    this.render();
  },

  render: function(repo) {
    //console.log(this.collection.length)
    this.$el.children().detach();
    //console.log('\nrepo: ',repo.name)
    //this.$el.append('<li>'+this.model.attributes.path+'</li>');
    this.$el.append('<li>'+this.model.name+'</li>');
    return this;
  }
})



    // this.$el.append(
    //   this.collection.map(function(repo){
    //     console.log('line 19:',Object.keys(repo))
    //     //console.log('\n\nrepo: ',repo.attributes.path);
    //     var rname;
    //     if(Object.keys(repo).indexOf('name')=== -1) {
    //       console.log(Object.keys(repo))
    //       rname = repo.path;
    //     } else {
    //       console.log(repo.name)
    //       rname = repo.name;
    //     }
    //     //return new RepoEntryView({model: repo}).render();
    //     return rname;
    //   })
    // );