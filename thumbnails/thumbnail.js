$.Thumbnails = function (el) {
    this.$el = $(el);
    this.$images = this.$el.find('.items img');
    this.$imageNav = this.buildImageNav();
    
    this.activeThumbIndex = 0;
    this.activeImageIndex = 0;    
    this.tempImageIndex = null;
    
    this.imageOffset = 0;
    
    this.fillGutter();
    this.setActiveImage(0);
    this.setActiveThumb(0);
    
    this.bindEvents();
};

$.Thumbnails.prototype.bindEvents = function () {
    this.$imageNav.find('.gutter').on("click", "img.thumb",
        this.thumbClick.bind(this));
    this.$imageNav.find('.gutter').on("mouseenter", "img.thumb",
        this.thumbMouseEnter.bind(this));
    this.$imageNav.find('.gutter').on("mouseleave", "img.thumb",
        this.thumbMouseLeave.bind(this));

    this.$imageNav.find('a.gutterLeft').on("click", function (event) {
        event.preventDefault();
        this.moveGutterStart(-1);
    }.bind(this));
    this.$imageNav.find('a.gutterRight').on("click", function (event) {
        event.preventDefault(); 
        this.moveGutterStart(1);
    }.bind(this));
};

$.Thumbnails.prototype.thumbClick = function (event) {
    var $currentTarget = $(event.currentTarget);
    var index = $currentTarget.data('index');
        
    this.setActiveImage(index);
    this.setActiveThumb(index);
};

$.Thumbnails.prototype.thumbMouseEnter = function (event) {
    var $currentTarget = $(event.currentTarget);
    var index = $currentTarget.data('index');

    if (index === this.activeImageIndex) {
        return;
    }
    
    this.tempImageIndex = index;
    
    $(this.getActiveImage()).removeClass('active');
    $(this.getTempImage()).addClass('active');    
};

$.Thumbnails.prototype.thumbMouseLeave = function (event) {
    var $currentTarget = $(event.currentTarget);
    var index = $currentTarget.data('index');

    if (index === this.activeImageIndex) {
        return;
    }
    
    $(this.getActiveImage()).addClass('active');
    $(this.getTempImage()).removeClass('active');   
    
    this.tempImageIndex = null;
};

$.Thumbnails.prototype.buildImageNav = function () {
    var $left = _makeLink('gutterLeft');    
    $left.text('<');
    
    var $right = _makeLink('gutterRight');
    $right.text('>');

    var $gutter = $('<ul>').addClass('gutter');
    
    var $imageNav = $('<div>').addClass('imageNav');

    $imageNav.append($left);    
    $imageNav.append($gutter);
    $imageNav.append($right);
        
    this.$el.append($imageNav);
    
    return $imageNav;
    
    function _makeLink(cssClass) {
        return $('<a href="#">').addClass(cssClass);
    }
};

$.Thumbnails.prototype.fillGutter = function () {
    var $gutter = this.$imageNav.find('.gutter');
    
    $gutter.empty();
    
    for (var i = 0; i < 5; ++i) {
        var $li = $('<li>');    
        var $thumb = $('<img>').addClass('thumb');

        $thumb.attr("data-index", i);
        $thumb.attr(
            "src",
            $(this.$images[this.imageOffset + i]).attr("src")
        );
        
        $li.append($thumb);
        $gutter.append($li);
    }
};

$.Thumbnails.prototype.getActiveImage = function () {
    return this.$images[this.imageOffset + this.activeImageIndex];
};

$.Thumbnails.prototype.getTempImage = function () {
    return this.$images[this.imageOffset + this.tempImageIndex];
};

$.Thumbnails.prototype.getActiveThumb = function () {
    return this.$imageNav.find('.gutter .thumb')[this.activeThumbIndex];
};

$.Thumbnails.prototype.setActiveImage = function (index) {
    $(this.getActiveImage()).removeClass('active');
    this.activeImageIndex = index;
    $(this.getActiveImage()).addClass('active');
};

$.Thumbnails.prototype.setActiveThumb = function (index) {
    $(this.getActiveThumb()).removeClass('active');
    this.activeThumbIndex = index;
    $(this.getActiveThumb()).addClass('active');
};

$.Thumbnails.prototype.setGutterStart = function (index) {
    this.imageOffset = index;
    this.fillGutter();
};

$.Thumbnails.prototype.moveGutterStart = function (direction) {
    var newIndex = this.imageOffset + direction;
    
    if (newIndex >= 0 && newIndex <= this.$images.length - 5) {
        this.setGutterStart(newIndex);

        this.setActiveThumb(this.activeThumbIndex - direction);
        this.setActiveImage(this.activeImageIndex - direction);
    }
};

$.fn.thumbnails = function () {
  return this.each(function () {
     new $.Thumbnails(this); 
  });  
};
