$.Tabs = function (el) {
    this.$el = $(el);

    var contentTabsClass = this.$el.data("content-tabs");
    this.$contentTabs = $('.' + contentTabsClass);
    this.$activeTab = $(this.$contentTabs.find('.active'));
    
    this.$el.on('click', 'a', this.clickTab.bind(this));
};

$.Tabs.prototype.clickTab = function (event) {
    event.preventDefault();
    
    this.$contentTabs.children().removeClass('active');
    $('.tabs a').removeClass('active');
    
    var $tabLink = $(event.currentTarget);
    $tabLink.addClass('active');
    
    var $tab = $(this.$contentTabs.find($tabLink.attr("href")));
    $tab.addClass('active');
};

$.fn.tabs = function () {
   return this.each(function () {
      new $.Tabs(this); 
   });
};