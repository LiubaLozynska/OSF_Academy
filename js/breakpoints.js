//Creating an object to store info about breakpoints

const breakpoints = {

  'VerySmall' : 'VerySmall',
  'Small' : 'Small',
  'Medium' : "Medium",
  'Large' : 'Large',
  'initialBreakPoint': 0,

   getBreakPoint: function( windowWidth ) {
   
    if (windowWidth <= 576) {
      return this.VerySmall;
    } else if (windowWidth <= 768) {
      return this.Small;
    } else if (windowWidth > 768 && windowWidth <= 980) {
      return this.Medium;
    } else {
      return this.Large;
    }
   },
   onWindowResize: function (triggerOwl) {
     
    let currentWindowWidth = $( window ).width();
    currentBreakPoint = breakpoints.getBreakPoint(currentWindowWidth);

    if ( currentBreakPoint !== breakpoints.initialBreakPoint ) {

      breakpoints.initialBreakPoint = currentBreakPoint;
      $('#product-tile').empty(); 
      products.renderProducts(products);


      //adding or disabling owl carousel for popular products based on screen width on those pages where needed
      if ( triggerOwl ) {
        triggerOwl();
      }

    }
   }
} 

