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

        if (dy > dx) {
          // mainly vertical → don't interfere
          return;
        }

        // horizontal swipe → keep current behaviour
        e.preventDefault();
        this._super(e);
      }
    });
  };
}); 