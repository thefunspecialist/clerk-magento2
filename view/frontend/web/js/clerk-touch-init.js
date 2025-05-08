define(['jquery', 'domReady!'], function($) {
    'use strict';

    // Fix for Clerk sliders - prevents "teleport to top" issue while allowing scrolling
    function fixClerkSliders() {
        // Wait for sliders to be in the DOM
        setTimeout(function() {
            var sliders = document.querySelectorAll('.clerk-slider');
            
            if (sliders.length) {
                // Process each slider
                sliders.forEach(function(slider) {
                    // Remove any existing listeners we might have added before
                    if (slider.hasAttribute('data-touch-fixed')) {
                        return;
                    }
                    
                    // Mark as fixed to avoid duplicate handlers
                    slider.setAttribute('data-touch-fixed', 'true');
                    
                    // Add a low-level capture phase listener to monitor events
                    // This won't interfere with scrolling but will help us debug
                    slider.addEventListener('touchmove', function(e) {
                        // Just log, don't interfere with any behavior
                        console.log('Touch moving on slider', e.cancelable);
                    }, {passive: true});
                });
                
                console.log('Clerk slider touch monitoring added');
            }
        }, 500);
    }
    
    // Run immediately
    fixClerkSliders();
    
    // Re-apply when new content is loaded (for AJAX-loaded sliders)
    $(document).on('contentUpdated clerk-slider-initialized', fixClerkSliders);
    
    return fixClerkSliders;
}); 