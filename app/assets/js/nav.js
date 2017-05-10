(function($, window, document, undefined) {
    'use strict';

    Nav.Defaults = {
    };
    
    function Nav (element, options) {  
      
    this.$container   = element;
    this.options    = $.extend({}, Nav.Defaults, options);
    this.initialize();
  }

  Nav.prototype.initialize = function(){
    var self = this;
    this.$container.find('a[role="menuitem"]').on('click', function(){
      self.$container.find('a[role="menuitem"]').parent().removeClass('active');
      $(this).parent().addClass('active');
    });
  };


    $.fn.nav = function(options) {   
    return this.each(function() {
      var $this = $(this);
      var data = new Nav($this, typeof options == 'object' && options);  
    });
  };
  
  $.fn.nav.Constructor = Nav;

})(jQuery, window, document);

