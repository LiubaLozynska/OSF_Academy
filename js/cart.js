
export const cart = {

  addToCart: function (productID, quantity) {

    //Receiving data about products added to cart
    let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));

    //Updating products in cart in Local Storage
    if (productsInCart) {

      let indicator = 0;

      //checking if this product has already been added before
      productsInCart.forEach(element => {
        //updating the quantity if product was added before
        if (element.id === productID) {
          if (quantity) {
            element.quantity = +quantity;
          } else {
            element.quantity += 1;
          }
          indicator = 1;
        }
      });

      //if this is new product - adding it to the array
      if (indicator === 0) {
        let newProductToAdd = {}
        newProductToAdd.id = productID;
        if (quantity) {
          newProductToAdd.quantity = quantity;
        } else {
          newProductToAdd.quantity =1;
        }
        productsInCart.push(newProductToAdd);
      }

      //pusing the updated array of products to Local Storage
      let stringifiedProducts = JSON.stringify(productsInCart);
      localStorage.setItem("productsInCart", stringifiedProducts);

    } else {

      //creating new Local Storage item in case no products wwere added to the cart so far
      let newProductToAdd = {}
      productsInCart = [];

      newProductToAdd.id = productID;
      if (quantity) {
        newProductToAdd.quantity = quantity;
      } else {
        newProductToAdd.quantity =1;
      }

      productsInCart.push(newProductToAdd);
      let stringifiedProducts = JSON.stringify(productsInCart);
      localStorage.setItem("productsInCart", stringifiedProducts);
    }
  },
  renderCartQuantity: function () {

    let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
    let cartIcon = $('.cart-icon .count');

    if (productsInCart) {
      if (productsInCart.length == 0) {
        return;
      }
      //Showing ProductInCart quantity next the cart icon
      let productsInCartQuantity = 0;

      productsInCart.forEach(product => {
        productsInCartQuantity += +product.quantity;
      })

        $(cartIcon).css('display', 'block');
        $(cartIcon).html(productsInCartQuantity);
    } else {
        $(cartIcon).css('display', 'none');
    }

  }
};


  $(document).on('click','.add-to-cart', function () {

    //Receiving data-id of this product
    let productDataId = $(this).attr("data-id");
    
    //Adding the product to ProductInCart in Local Storage
    cart.addToCart(productDataId);
    
    //Rendering products in cart quantity in header and footer
    cart.renderCartQuantity();
    
  });



