$.Carousel = function (el) {
    this.$el = $(el);
};

$.fn.carousel = function () {
   return this.each(function () {
      new $.Carousel(this); 
   });
};