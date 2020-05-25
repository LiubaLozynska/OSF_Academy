//Creating an object to store info about products

const products = {

  items: [],
  renderedProductsCount: 0,

  renderProducts: function() {
    let productsToRender = JSON.parse(JSON.stringify(this.items));
   
    if (breakpoints.initialBreakPoint === breakpoints.VerySmall) {
      productsToRender.length = 4 ;
    }if (breakpoints.initialBreakPoint === breakpoints.Small) {
      productsToRender.length = 4 ;
    } else if (breakpoints.initialBreakPoint === breakpoints.Medium){
      productsToRender.length = 6;
    } else if (breakpoints.initialBreakPoint === breakpoints.Large){
      productsToRender.length = 8;
    }
  
    products.renderedProductsCount = productsToRender.length;
  
    productsToRender.forEach( product => {
      $('#product-tile').append(
        `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 py-4 d-flex justify-content-center card-container">
            <div class="card-outer">
              <div class="card product-tile__item">
                <img src="${product.images[0].imageURL}" class="card-img-top" alt="Product">
                <div class="card-body">
                  <h5 class="card-title product-tile__item__title text-center">${product.name}</h5>
                  <p class="card-text product-tile__item__price text-center">$${product.price}</p>
                </div>
              </div>
              <div class="card-on-hover card">
                <div class="card-body">
                  <div class="card-body__inner">
                    <button class="add-to-cart" data-id="${product.id}"><i class="fas fa-plus"></i></i></button>
                    <button class="add-to-wishlist" data-id="${product.id}"><i class="fas fa-heart"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      )
    });
  },
  renderFeaturedProducts: function() {

    this.items.forEach( product => {
      $('#featured-products-carousel').append(
        `
        <div class="item">
        <div>
        <div class="card-outer">
        <div class="card product-tile__item" style="width: 100%;">
          <img src="${product.images[0].imageURL}" class="card-img-top" alt="Product">
          <div class="card-body">
            <h5 class="card-title product-tile__item__title text-center">${product.name}</h5>
            <p class="card-text product-tile__item__category text-center">${product.attributes.category}</p>
          </div>
        </div>
        <div class="card-on-hover card">
          <div class="card-body">
             <div class="card-body__inner">
                <button class="add-to-cart" data-id="${product.id}"><i class="fas fa-plus"></i></i></button>
                <button class="add-to-wishlist" data-id="${product.id}"><i class="fas fa-heart"></i></button>
              </div>
          </div>
        </div>
        </div>
      </div>

        </div>
        `
      )
    });

  let owl = $('#featured-products-carousel'); 
  
  owl.owlCarousel({
      nav:true,
      dots:false,
      slideBy:4,
      loop:true,
      margin:10,
      autoplay: 5,
      responsiveClass:true,
      navClass: [
        'am-prev',
        'am-next'
      ],
      responsive:{
          0:{
              items:1,
              nav:true
          },
          500:{
              items:2,
              nav:true
          },
          800:{
            items:3,
            nav:true
        },
          1200:{
              items:4,
              nav:true,
          }
      }
  });

  },
  loadMore: function() {

  //How many additional products should be rendered
  let productsToRenderQuantity = 0;

  switch(breakpoints.initialBreakPoint) {
    case breakpoints.VerySmall:
      productsToRenderQuantity = 4;
      break;
    case breakpoints.Small:
      productsToRenderQuantity = 2;
      break;
    case breakpoints.Medium:
      productsToRenderQuantity = 3;
      break;
    case breakpoints.Large:
      productsToRenderQuantity = 4;
      break;          
  }

  // Retreiving products that should be rendered
  const productsToRender = products.items.slice(products.renderedProductsCount, products.renderedProductsCount + productsToRenderQuantity);
  

  //Rendering additional products
  productsToRender.forEach( product => {
    $('#product-tile').append(
      `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 py-4 d-flex justify-content-center card-container">
        <div class="card-outer">
          <div class="card product-tile__item">
            <img src="${product.images[0].imageURL}" class="card-img-top" alt="Product">
            <div class="card-body">
              <h5 class="card-title product-tile__item__title text-center">${product.name}</h5>
              <p class="card-text product-tile__item__price text-center">$${product.price}</p>
            </div>
          </div>
          <div class="card-on-hover card">
            <div class="card-body">
              <div class="card-body__inner">
              <button class="add-to-cart" data-id="${product.id}"><i class="fas fa-plus"></i></i></button>
              <button class="add-to-wishlist" data-id="${product.id}"><i class="fas fa-heart"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
        `
    )
  });

  //Setting new rendered product quantity
  products.renderedProductsCount += productsToRenderQuantity;
  
  },
  addToCart: function (productID) {


  //Receiving data about products added to cart
  let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));  

  //Updating products in cart in Local Storage
  if (productsInCart) {

    let indicator = 0;
    
    //checking if this product has already been added before
    productsInCart.forEach( element => {
      //updating the quantity if product was added before
      if (element.id == productID) {
          element.quantity += 1;
          indicator = 1;
      }
    });

    //if this is new product - adding it to the array
    if (indicator === 0) {
      let newProductToAdd = {}
          newProductToAdd.id = productID;
          newProductToAdd.quantity = 1;
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
    newProductToAdd.quantity = 1;
    
    productsInCart.push(newProductToAdd);
    let stringifiedProducts = JSON.stringify(productsInCart);
    localStorage.setItem("productsInCart", stringifiedProducts);
  }
  },
  addToWishList: function (productID) {


    //Receiving data about products added to wishlist
    let productsInWishList = JSON.parse(localStorage.getItem("productsInWishList"));  
  
    //Updating products in wishlist in Local Storage
    if (productsInWishList) {
  
        let indicator = 0;
        
        //checking if this product has already been added before
        productsInWishList.forEach( element => {
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
  renderWishListQuantity: function () {
    let productsInWishList = JSON.parse(localStorage.getItem("productsInWishList")); 

    if (productsInWishList) {
      let productsInWishListQuantity = productsInWishList.length;
  
      //Showing ProductInCart quantity next the cart icon
      let wishListIcon = $('.wishlist-icon .count');
      
     for ( let icon of wishListIcon ) {
         $(icon).css('display', 'block');
         $(icon).html(productsInWishListQuantity);
     } 
    }
  
  },
  renderCartQuantity: function () {

    let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));  

    if (productsInCart) {
      //Showing ProductInCart quantity next the cart icon
      let cartIcon = $('.cart-icon .count');
      
      let productsInCartQuantity = 0;
      
      productsInCart.forEach( product => {
        productsInCartQuantity += +product.quantity;
      })


      for ( let icon of cartIcon ) {
          $(icon).css('display', 'block');
          $(icon).html(productsInCartQuantity);
      }
    }

  }
};

breakpoints.initialBreakPoint = breakpoints.getBreakPoint(($( window ).width()));

$.ajax({ 
  type: 'GET', 
  url: 'products.json', 
  dataType: 'JSON',
  success: function (data) {

    //Setting products data into the products object
    products.items = data;

    // Rendering the initial scope of products on Home Page
    products.renderProducts();

    // Rendering Featured Products on Home Page
    products.renderFeaturedProducts();
  }
})


