define(['jquery', 'domReady!'], function($) {
    'use strict';

    // Override Clerk's slider touchmove handlers directly at the DOM level
    function fixClerkSliders() {
        // Use a MutationObserver to detect when sliders are added to the DOM
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                    // Check for any newly added clerk sliders
                    var sliders = document.querySelectorAll('.clerk-slider:not([data-touch-fixed])');
                    if (sliders.length) {
                        applyFix(sliders);
                    }
                }
            });
        });

        // Start observing the document with the configured parameters
        observer.observe(document.body, { childList: true, subtree: true });
        
        // Apply fix to any existing sliders
        var existingSliders = document.querySelectorAll('.clerk-slider:not([data-touch-fixed])');
        if (existingSliders.length) {
            applyFix(existingSliders);
        }
        
        // Function to apply the fix to sliders
        function applyFix(sliders) {
            sliders.forEach(function(slider) {
                // Mark as fixed
                slider.setAttribute('data-touch-fixed', 'true');
                
                // Add style to ensure touch-action is set
                slider.style.touchAction = 'pan-y';
                
                // Store the original touchmove handler(s) if any
                var oldTouchMoveHandlers = slider._touchmoveHandlers || [];
                
                // Clear existing handlers if possible
                if (typeof slider.ontouchmove === 'function') {
                    slider._originalTouchmove = slider.ontouchmove;
                    slider.ontouchmove = null;
                }
                
                // Add our handler that will prevent defaults only for horizontal swipes
                slider.addEventListener('touchstart', function(e) {
                    var touch = e.touches[0];
                    slider._startX = touch.clientX;
                    slider._startY = touch.clientY;
                }, { passive: true });
                
                // Our touchmove handler with vertical scroll detection
                var touchMoveHandler = function(e) {
                    if (!slider._startX || !slider._startY) {
                        var touch = e.touches[0];
                        slider._startX = touch.clientX;
                        slider._startY = touch.clientY;
                        return;
                    }
                    
                    var touch = e.touches[0];
                    var dx = Math.abs(touch.clientX - slider._startX);
                    var dy = Math.abs(touch.clientY - slider._startY);
                    
                    // If movement is more vertical than horizontal, let it scroll
                    if (dy > dx) {
                        // Do nothing - let the browser handle the scroll
                        return;
                    }
                    
                    // For horizontal swipes, prevent default to allow slider to work
                    if (e.cancelable) {
                        e.preventDefault();
                    }
                };
                
                // Add our handler with capture to ensure it runs first
                slider.addEventListener('touchmove', touchMoveHandler, { passive: false, capture: true });
                
                console.log('Clerk slider ' + slider.className + ' touch fixed');
            });
        }
    }
    
    // Run immediately and on DOM updates
    fixClerkSliders();
    $(document).on('contentUpdated clerk-slider-initialized', fixClerkSliders);
    
    return fixClerkSliders;
}); 