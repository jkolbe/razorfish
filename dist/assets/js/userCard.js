!function(t,n,i,e){"use strict";function o(n,i){this.$container=n,this.options=t.extend({},o.Defaults,i),this.initialize()}o.Defaults={},o.prototype.initialize=function(){var n=this;this.$container.find(".user-action").on("click",function(){n.$container.find(".user-action").parent().removeClass("active"),t(this).parent().addClass("active")})},t.fn.usercard=function(n){return this.each(function(){var i=t(this);new o(i,"object"==typeof n&&n)})},t.fn.usercard.Constructor=o}(jQuery,window,document);