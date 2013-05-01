var User = Backbone.Model.extend({
  initialize: function() {
    //this.on('change:user', function() {
    this.on('change', function() {
      this.trigger('changeUser', this);
    })
  },
  changeUser: function() {
    console.log('changeUser called')
  }
})