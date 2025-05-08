var config = {
  config: {
    mixins: {
      // Path depends on Clerk version — one of these usually matches:
      'Clerk_Module/js/slider'              : { 'js/clerk-slider-mixin': true },
      'Clerk_Clerk/js/slider'               : { 'js/clerk-slider-mixin': true },
      'Clerk/js/slider'                     : { 'js/clerk-slider-mixin': true }
    }
  },
  // Auto-load our touch fix script
  deps: ['js/clerk-touch-init']
}; 