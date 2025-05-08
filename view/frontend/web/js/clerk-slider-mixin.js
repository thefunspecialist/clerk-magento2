define([], function () {
  'use strict';

  // Mixin for Clerk slider to allow vertical scrolling
  return function (Slider) {
    return Slider.extend({
      // Remember touch start position
      _touchStart: function (e) {
        const t = e.touches[0];
        this.startX = t.clientX;
        this.startY = t.clientY;
        this.isScrolling = false;
        this._super(e); // Call original method
      },

      // Complete override of touch move to fix scrolling
      _touchMove: function (e) {
        if (!this.startX || !this.startY) {
          this.startX = e.touches[0].clientX;
          this.startY = e.touches[0].clientY;
        }

        const t = e.touches[0];
        const dx = Math.abs(t.clientX - this.startX);
        const dy = Math.abs(t.clientY - this.startY);

        // For vertical scrolling, DO NOT call super or prevent default
        if (dy > dx) {
          this.isScrolling = true;
          // Do nothing - let browser handle vertical scrolling
          return;
        }

        // For horizontal swipes only
        e.preventDefault();
        return this._super(e);
      },
      
      // Also fix touchend to prevent teleporting
      _touchEnd: function(e) {
        if (this.isScrolling) {
          // If we were scrolling vertically, don't process touchend
          this.isScrolling = false;
          return;
        }
        
        // Only call original touchend for horizontal swipes
        return this._super(e);
      }
    });
  };
}); 