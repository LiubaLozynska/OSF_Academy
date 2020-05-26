$(document).on('click','.add-to-cart', function () {

//Receiving data-id of this product
let productDataId = $(this).attr("data-id");

//Adding the product to ProductInCart in Local Storage
products.addToCart(productDataId);

//Rendering products in cart quantity in header and footer
products.renderCartQuantity();

});

