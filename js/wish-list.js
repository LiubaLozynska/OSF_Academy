$(document).on('click','.add-to-wishlist', function () {

  //Receiving data-id of this product
  let productDataId = $(this).attr("data-id");
  
  //Adding the product to ProductInCart in Local Storage
  products.addToWishList(productDataId);
  
  //Rendering products in wishlist quantity in header and footer
  products.renderWishListQuantity();
  });