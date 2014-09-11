$.Carousel = function (el) {
    this.$el = $(el);
    
    this.$images = this.$el.find('.items img');
    this.activeIndex = 0;
    
    $(this.activeImage()).addClass('active');
    
    this.bindEvents();
};

$.Carousel.prototype.bindEvents = function () {
    var $slideLeft = this.$el.find('.slide-left');
    var $slideRight = this.$el.find('.slide-right');
    
    $slideLeft.on('click', this.slideLeft.bind(this));
    $slideRight.on('click', this.slideRight.bind(this));    
};

$.Carousel.prototype.activeImage = function () {
    return this.$images[this.activeIndex];
};

$.Carousel.prototype._directionToString = function (direction) {
    return (direction > 0) ? "right" : "left";
};

$.Carousel.prototype.slide = function (direction) {
    var $previousImage = $(this.activeImage());
    
    if ($previousImage.hasClass("transitioning")) {
        return;
    }
    
    this.activeIndex += direction + this.$images.length;
    this.activeIndex %= this.$images.length;   
    
    var $nextImage = $(this.activeImage()); 
    
    $nextImage.addClass("active transitioning");
    $nextImage.addClass(this._directionToString(direction));  

    setTimeout(function() {
        $previousImage.addClass(this._directionToString(-direction));      
        $nextImage.removeClass("left right");  
    }.bind(this));
    
    $previousImage.one("transitionend", function () {
        $previousImage.removeClass("active left right");
        $nextImage.removeClass("transitioning");
    }.bind(this)); 
};

$.Carousel.prototype.slideLeft = function (event) {
    event.preventDefault();
    this.slide(-1);
};

$.Carousel.prototype.slideRight = function (event) {
    event.preventDefault();
    this.slide(1);
};

$.fn.carousel = function () {
   return this.each(function () {
      new $.Carousel(this); 
   });
};