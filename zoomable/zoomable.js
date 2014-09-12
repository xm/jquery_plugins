$.Zoomable = function (el) {
    this.$el = $(el);
    this.focusSize = { width: 100, height: 100 };
    this.zoomFactor = 3;
    this.zooming = false;
    
    this.bindEvents();
};

$.Zoomable.prototype.bindEvents = function () {
    this.$el.on("mousemove", function (event) {
        this.showFocusBox({ 
            x: event.pageX - this.$el.offset().left,
            y: event.pageY - this.$el.offset().top
        });
    }.bind(this));

    this.$el.on("mouseleave", function (event) {
        if (!$(event.toElement).hasClass('focus-box')) {
            this.removeFocusBox();
        } 
    }.bind(this));
};

$.Zoomable.prototype.showFocusBox = function (mousePos) {
    if (!this.$focusBox) {
        this.$focusBox = $('<div>').addClass("focus-box");
        this.$focusBox.css("width", this.focusSize.width);
        this.$focusBox.css("height", this.focusSize.height);
        this.$el.append(this.$focusBox);
    }
    
    var imgWidth = this.$el.width();
    var imgHeight = this.$el.height();
    
    var maxX = imgWidth - this.focusSize.width - 2;
    var maxY = imgHeight - this.focusSize.height - 2;
    
    var x = this.clamp(mousePos.x - Math.floor(this.focusSize.width / 2), 0, maxX);
    var y = this.clamp(mousePos.y - Math.floor(this.focusSize.height / 2), 0, maxY);
        
    this.$focusBox.css("left", x);
    this.$focusBox.css("top", y);

    this.showZoom( { x: x * this.zoomFactor, y: y * this.zoomFactor });
};

$.Zoomable.prototype.removeFocusBox = function (event) {
    this.$el.find('.focus-box').remove();
    this.$focusBox = null;

    this.removeZoom();
};

$.Zoomable.prototype.showZoom = function (diff) {
  if (!this.$zoom) {
    this.$zoom = $('<div>').addClass('zoomed-image');
    this.$zoom.css('background-image', 'url(' + this.$el.find('img').attr('src') + ')');
  }

  var $body = $('body');
  this.$zoom.css('width', this.focusSize.width * this.zoomFactor);
  this.$zoom.css('height', this.focusSize.height * this.zoomFactor);

  var $img = $('.zoomable img');

  var sizeStr = this.$el.width() * this.zoomFactor + 'px ' + 
    this.$el.height() * this.zoomFactor + 'px';

  this.$zoom.css('background-size', sizeStr);
  this.$zoom.css('background-position', -diff.x + 'px ' + -diff.y + 'px');

  $body.append(this.$zoom);
};

$.Zoomable.prototype.removeZoom = function () {
  this.$zoom.remove();
  this.$zoom = null;
};

$.Zoomable.prototype.clamp = function(num, min, max) {
  return Math.min(Math.max(num, min), max);
};

$.fn.zoomable = function () {
  return this.each(function () {
     new $.Zoomable(this); 
  });  
};
