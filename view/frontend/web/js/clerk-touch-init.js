define(['jquery', 'domReady!'], function($) {
    'use strict';

    // Extra protection to ensure vertical scrolling works
    function fixClerkSliders() {
        // Wait for sliders to be in the DOM
        setTimeout(function() {
            var sliders = document.querySelectorAll('.clerk-slider');
            
            if (sliders.length) {
                // Add a passive listener with higher priority
                sliders.forEach(function(slider) {
                    // Use passive: true for touchmove to allow native scrolling
                    slider.addEventListener('touchmove', function(e) {
                        // Let vertical scrolls pass through naturally
                        var touch = e.touches[0];
                        var startX = slider.hasAttribute('data-start-x') ? parseFloat(slider.getAttribute('data-start-x')) : touch.clientX;
                        var startY = slider.hasAttribute('data-start-y') ? parseFloat(slider.getAttribute('data-start-y')) : touch.clientY;
                        
                        var dx = Math.abs(touch.clientX - startX);
                        var dy = Math.abs(touch.clientY - startY);
                        
                        // If more vertical than horizontal, don't interfere
                        if (dy > dx) {
                            // Let native scroll work
                            e.stopPropagation();
                        }
                    }, {passive: true, capture: true});
                    
                    // Store touch start position
                    slider.addEventListener('touchstart', function(e) {
                        var touch = e.touches[0];
                        slider.setAttribute('data-start-x', touch.clientX);
                        slider.setAttribute('data-start-y', touch.clientY);
                    }, {passive: true});
                });
                
                console.log('Clerk slider touch handlers fixed');
            }
        }, 1000); // Wait for sliders to be initialized
    }
    
    // Run immediately and also whenever content is updated
    fixClerkSliders();
    
    // Re-apply fix when new content is loaded (for AJAX-loaded sliders)
    $(document).on('clerk-slider-initialized', fixClerkSliders);
    
    return fixClerkSliders;
}); 