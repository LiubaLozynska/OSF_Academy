import { breakpoints } from './breakpoints.js';
import { products, loadProducts } from './products.js';
import { OSFcookies } from './cookies.js';
import { footer } from './footer.js';
import { megaMenu } from './mega-menu.js';
import { cart } from './cart.js';
import { wishList } from './wish-list.js';
import { modalLogin } from './modal-login.js';
import QuantityHandler from './quantity-handler.js';


$(document).ready(() => {
  loadProducts();
  megaMenu();
  footer();
  modalLogin();

  //Cookies usage Initialization
  OSFcookies.showCookiesModal();
  OSFcookies.initializeCookies();

  //Rendering wishlist products count in header
  wishList.renderWishList();

  //Rendering cart products count in header
  cart.renderCartQuantity();
  
  //Receiving data about products added to cart
  let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
  let qtyHandler = new QuantityHandler();

  //Receiving all needed info about the products in cart and rendering them on the cart page
  (async () => {

    //Receiving product data from backend
   const allProducts = await $.getJSON('/products.json', function(data) {
      return data;
   });

   products.renderShoppingCart(allProducts, productsInCart);

   qtyHandler.products = allProducts;
   qtyHandler.getProductById = products.getProductById;
   qtyHandler.updateTotals();
   qtyHandler.onChangeValidate('.product-quantity');

   //Castom radio boxes logic
  let radioInputs = $('.custom-radio-input');

  radioInputs.on('click', (event) => {
    const thisInput = event.currentTarget;
    radioInputs.removeClass('active');
    $(thisInput).addClass('active');
    qtyHandler.updateTotals();
  });
  
   $(document).on('click','.quantity-decrese', function() { 
    const input = $(this).parent().find('input');
    qtyHandler.onInit(input);
    qtyHandler.onDecrease();
   });
 
   $(document).on('click','.quantity-increase', function() {
     const input = $(this).parent().find('input');
   
     qtyHandler.onInit(input);
     qtyHandler.onIncrease();
   })

   //Delete Products from cart logic
   $(document).on('click','.delete-button', function() {
    const productToDelete = $(this).closest('[data-productID]');
    let productToDeleteID = productToDelete.attr('data-productID');

    let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
        productsInCart = productsInCart.filter((productInCart) => {
          if (productInCart.id == productToDeleteID) {
            return 0;
          }
          else {
            return 1;
          }
        });

    let stringifiedProducts = JSON.stringify(productsInCart);
    localStorage.setItem("productsInCart", stringifiedProducts);
    products.renderShoppingCart(allProducts, productsInCart);  

    //Updating LocalStorage with new product q-ty
    cart.renderCartQuantity();

    //Updating cart totals
    qtyHandler.updateTotals();
  })
  })();


});