function triggerOwlPopularProducts() {
  
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

  //Rendering products in wishlist quantity in header and footer
  products.renderWishListQuantity();

  //Rendering products in cart quantity in header and footer
  products.renderCartQuantity(); 

  //adding or disabling owl carousel for popular products based on screen width
  triggerOwlPopularProducts();
  
  // Rerendering products based on window width

  $( window ).resize( () => {
    
    let currentWindowWidth = $( window ).width();
    currentBreakPoint = breakpoints.getBreakPoint(currentWindowWidth);

    if ( currentBreakPoint !== breakpoints.initialBreakPoint ) {

      breakpoints.initialBreakPoint = currentBreakPoint;
      $('#product-tile').empty(); 
      products.renderProducts(products);

       //adding or disabling owl carousel for popular products based on screen width
      triggerOwlPopularProducts();

    }
    
  })

  // Rendering more products based on window width after the LOAD MORE button is pressed

  $( '#load-product-tile' ).on('click', () => {
      products.loadMore();
  })

})