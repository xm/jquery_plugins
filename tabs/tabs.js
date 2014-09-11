$.Tabs = function (el) {
    this.$el = $(el);

    var contentTabsClass = this.$el.data("content-tabs");
    this.$contentTabs = $('.' + contentTabsClass);
    this.$activeTab = $(this.$contentTabs.find('.active'));
    
    this.$el.on('click', 'a', this.clickTab.bind(this));
};

$.Tabs.prototype.clickTab = function (event) {
    event.preventDefault();
    
    if (this.$activeTab.hasClass('transitioning')) {
        return;
    }
    
    this.$activeTab.removeClass('active');
    this.$activeTab.addClass('transitioning');
    
    this.$activeTab.one('transitionend', function (event) {    
        $(event.currentTarget).removeClass('transitioning');
        this.$activeTab.addClass('transitioning');
       
        setTimeout(function () {
            this.$activeTab.removeClass('transitioning');
            this.$activeTab.addClass('active');
        }.bind(this), 0);
     }.bind(this));

    $('.tabs a').removeClass('active');
    
    var $tabLink = $(event.currentTarget);
    $tabLink.addClass('active');
    
    this.$activeTab = $(this.$contentTabs.find($tabLink.attr("href")));
};

$.fn.tabs = function () {
   return this.each(function () {
      new $.Tabs(this); 
   });
};