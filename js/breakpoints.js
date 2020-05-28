export const breakpoints = {

  'VerySmall' : 'VerySmall',
  'Small' : 'Small',
  'Medium' : "Medium",
  'Large' : 'Large',
  'initialBreakPoint': 0,

   getBreakPoint: function( windowWidth ) {
   
    if (windowWidth <= 576) {
      return this.VerySmall;
    } else if (windowWidth < 768) {
      return this.Small;
    } else if (windowWidth >= 768 && windowWidth <= 980) {
      return this.Medium;
    } else {
      return this.Large;
    }
   },
    toggleOwlPopularProducts: function() {

    let currentWindowWidth = $( window ).width();
    let currentBreakPoint = this.getBreakPoint(currentWindowWidth);

    let owlProductTile = $('#product-tile');

    if ( currentBreakPoint !== this.VerySmall) {
      
      //disabling owl carousel for popular products for medium and big screens
      $(owlProductTile).removeClass('owl-carousel');
      $(owlProductTile).removeClass('owl-theme');

      owlProductTile.trigger('destroy.owl.carousel');
    
    } else  {

      $(owlProductTile).addClass('owl-carousel');
      $(owlProductTile).addClass('owl-theme');

        owlProductTile.owlCarousel({
          nav:false,
          dots:true,
          slideBy:4,
          loop:true,
          margin:10,
          autoplay: 5,
          responsiveClass:true,
          responsive:{
              0:{
                  items:1,
              }
          }
      });
    }
   }
} 

