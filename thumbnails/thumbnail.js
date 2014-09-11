$.Thumbnails = function (el) {
    this.$el = $(el);
    this.$images = this.$el.find('.items img');
};

$.fn.thumbnails = function () {
  return this.each(function () {
     new $.Thumbnails(this); 
  });  
};