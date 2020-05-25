  //Showing Cookies modal once page loaded
  OSFcookies.showCookiesModal();

  //Rendering products in wishlist quantity in header and footer
  products.renderWishListQuantity();

  //Rendering products in cart quantity in header and footer
  products.renderCartQuantity(); 

  // Rendering more products based on window width after the LOAD MORE button is pressed

  $( document ).on('click', '#load-product-tile', () => {
    products.loadMore();
})
