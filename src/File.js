var File = Backbone.Model.extend({
  display: function() {
    this.trigger('display', this);
  }
})