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
        this._super(e); // Call original method
      },

      // Only prevent default for horizontal movements
      _touchMove: function (e) {
        if (!e.cancelable) {
          // Event already handled elsewhere
          return this._super(e);
        }

        const t = e.touches[0];
        const dx = Math.abs(t.clientX - this.startX || 0);
        const dy = Math.abs(t.clientY - this.startY || 0);

        // For vertical scrolling, don't prevent default
        if (dy > dx) {
          // Let browser handle the vertical scroll naturally
          // Still call super but WITHOUT preventDefault()
          return this._super(e);
        }

        // For horizontal swipes - prevent default and handle in slider
        e.preventDefault();
        return this._super(e);
      }
    });
  };
}); 