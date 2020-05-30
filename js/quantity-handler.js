import { cart } from './cart.js';

export default class QuantityHandler {
  
  constructor () {
    this.quantityInput;
    this.currentQuantity;
    this.updateCart = true;
    this.products;
    this.getProductById
  }
  onInit (input) {
    this.quantityInput = input;
    this.currentQuantity = +this.quantityInput.val();
  }

  onChangeValidate(selector) {
    const context = this;

    $(document).on('change', selector, function() {
      const quantityInput = $(this);
      const currentProduct = quantityInput.closest('[data-productID]');
      let productID = currentProduct.attr('data-productID');
      let currentQuantity = quantityInput.val();
      const invalidFeedback = currentProduct.find('.quantity-invalid-feedback');

      const currentProductData = context.getProductById(context.products, productID);
      const currentProductPrice = currentProductData[0].price;

      if (isNaN(currentQuantity) || currentQuantity <= 0) {
        invalidFeedback.css('display','block');
        currentQuantity = 1;
      } else if ( currentQuantity > 0) {
        invalidFeedback.css('display','none');
      }

      quantityInput.val(currentQuantity);
      const productPriceUpdated = '$' + (currentProductPrice * quantityInput.val()).toFixed(2);
      currentProduct.find('.price').html(productPriceUpdated);

      //Updating LocalStorage with new product q-ty
      if (context.updateCart) {
        cart.addToCart(productID, +currentQuantity);
        cart.renderCartQuantity();
      }

      // Updating cart subtotals
      context.updateTotals()
    })
  }

  onIncrease(){   
    this.currentQuantity +=1;
    this.quantityInput.val(this.currentQuantity);
    this.quantityInput.trigger("change");
  }

  onDecrease(){
    this.currentQuantity -=1;
    this.quantityInput.val(this.currentQuantity);
    this.quantityInput.trigger("change");
  }

  updateTotals() {
    //Update cart subtotals
    let subtotals = 0;
    let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));

    if (productsInCart) {
      productsInCart.forEach( element => {
        subtotals += element.quantity * this.getProductById(this.products, element.id)[0].price;
      });
    }
    
    //Setting subtotals
    let subtotalsHTML = '$' + subtotals.toFixed(2);
    $('#cart-subtotals').html(subtotalsHTML);

    //Update Cart Totals
    let shipping = +$('.form-check .active').parent().find('input').val();

   //Setting Totals
   let totals = '$' + (subtotals + shipping).toFixed(2);
   $('.order-totals__price span').html(totals);

  }
}