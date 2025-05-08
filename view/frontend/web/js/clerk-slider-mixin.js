define([], function () {
  'use strict';

  // Slider is whatever module Clerk uses internally (see next step)
  return function (Slider) {

    return Slider.extend({

      // touch start – remember where the finger began
      _touchStart: function (e) {
        const t = e.touches[0];
        this.startX = t.clientX;
        this.startY = t.clientY;
        this._super(e);                   // call original method
      },

      // touch move – decide whether to block or let it scroll
      _touchMove: function (e) {
        const t = e.touches[0];
        const dx = Math.abs(t.clientX - this.startX);
        const dy = Math.abs(t.clientY - this.startY);

        // If mainly vertical motion, don't prevent default and don't call super
        if (dy > dx) {
          // No preventDefault and no super call - let native scroll happen
          return;
        }

        // Only for horizontal swipes - prevent default and handle the swipe
        e.preventDefault();
        this._super(e);
      }
    });
  };
}); 