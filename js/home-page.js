function toggleOwlPopularProducts() {
  
  let currentWindowWidth = $( window ).width();
  currentBreakPoint = breakpoints.getBreakPoint(currentWindowWidth);

  let owlProductTile = $('#product-tile');

  if ( currentBreakPoint !== breakpoints.VerySmall) {
    
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

$(document).ready(() => {
  
  // Rerendering products based on window width

  $( window ).resize( () => {
    
    //Rerendering product tile on window resize and adding owl carousel on very small screen
    breakpoints.onWindowResize(toggleOwlPopularProducts);
  })

})