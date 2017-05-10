(function($, window, document, undefined) {
    'use strict';

    UserCard.Defaults = {
    };
    
    function UserCard (element, options) {  
      
    this.$container   = element;
    this.options    = $.extend({}, UserCard.Defaults, options);
    this.initialize();
  }

  UserCard.prototype.initialize = function(){
    var self = this;
    this.$container.find('.user-action').on('click', function(){
      self.$container.find('.user-action').parent().removeClass('active');
      $(this).parent().addClass('active');
    });
  };


    $.fn.usercard = function(options) {   
    return this.each(function() {
      var $this = $(this);
      var data = new UserCard($this, typeof options == 'object' && options);  
    });
  };
  
  $.fn.usercard.Constructor = UserCard;

})(jQuery, window, document);

