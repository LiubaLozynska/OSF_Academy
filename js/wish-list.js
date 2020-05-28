export const wishList = {

  addToWishList: function(productID) {
    //Receiving data about products added to wishlist
    let productsInWishList = JSON.parse(localStorage.getItem("productsInWishList"));
    
    //Updating products in wishlist in Local Storage
    if ( productsInWishList ) {
    
      let indicator = 0;
    
      //checking if this product has already been added before
      productsInWishList.forEach(element => {
        //updating the quantity if product was added before
        if (element == productID) {
          alert('This product has already been added to the wishlist');
          indicator = 1;
        }
      });
    
      //if this is new product - adding it to the array
      if (indicator === 0) {
        productsInWishList.push(productID);
      }
    
      //pusing the updated array of products to Local Storage
      let stringifiedProducts = JSON.stringify(productsInWishList);
      localStorage.setItem("productsInWishList", stringifiedProducts);
    
    } else {
    
      //creating new Local Storage item in case no products wwere added to the wishlist so far
      let productsInWishList = [];
      productsInWishList.push(productID);
    
      let stringifiedProducts = JSON.stringify(productsInWishList);
      localStorage.setItem("productsInWishList", stringifiedProducts);
    }
  },
  renderWishList: function() {

      //Rendering products count in wish list in header
      let productsInWishList = JSON.parse(localStorage.getItem("productsInWishList"));

      if (productsInWishList) {
        let productsInWishListQuantity = productsInWishList.length;

        //Showing ProductInCart quantity next the cart icon
        let wishListIcon = $('.wishlist-icon .count');

        for (let icon of wishListIcon) {
          $(icon).css('display', 'block');
          $(icon).html(productsInWishListQuantity);
        }
      }
  }
  
};

$(document).on('click','.add-to-wishlist', function () {

  //Receiving data-id of this product
  let productDataId = $(this).attr("data-id");
  
   //Adding the product to ProductInCart in Local Storage
   wishList.addToWishList(productDataId);
   
   //Rendering wishlist products count in header
   wishList.renderWishList();
  
  });
