import { products, loadProducts } from './products.js';
import { OSFcookies } from './cookies.js';
import { footer } from './footer.js';
import { megaMenu } from './mega-menu.js';
import { cart } from './cart.js';
import { wishList } from './wish-list.js';
import { modalLogin } from './modal-login.js';

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

  // Rerendering products based on window width
  $(window).resize(() => {
    
    //Rerendering product tile on window resize and adding owl carousel on very small screen
    products.onWindowResize(true);
  })

})