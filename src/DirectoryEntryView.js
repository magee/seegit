var DirectoryView = Backbone.View.extend({
  
  tagName: 'tr',

  template: _.template('<td><%= filename %></td>'),

  events: {
    'click': function() {
      this.model.show();
    },
    'expand': function() {
      this.model.expand();
    }
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    return this.$el.html(this.template(this.model.attributes));
  }

});