$(document).ready(() => {

  //Rendering products in wishlist quantity in header and footer
  products.renderWishListQuantity();

  //Rendering products in cart quantity in header and footer
  products.renderCartQuantity();

  
// Rerendering products based on window width

  $( window ).resize( () => {
    
    let currentWindowWidth = $( window ).width();
    currentBreakPoint = breakpoints.getBreakPoint(currentWindowWidth);

    if ( currentBreakPoint !== breakpoints.initialBreakPoint ) {

      breakpoints.initialBreakPoint = currentBreakPoint;
      $('#product-tile').empty(); 
      products.renderProducts(products);

    }
    
  })

// Rendering more products based on window width after the LOAD MORE button is pressed

$( '#load-product-tile' ).on('click', () => {
     products.loadMore();
})

})