function toggleOwlPopularProducts() {
  
  let currentWindowWidth = $( window ).width();
  currentBreakPoint = breakpoints.getBreakPoint(currentWindowWidth);

  let owlProductTile = $('.popular-products-homepage');

  if ( currentBreakPoint !== breakpoints.VerySmall) {
    
    //disabling owl carousel for popular products for medium and big screens
    $(owlProductTile).removeClass('owl-carousel');
    $(owlProductTile).removeClass('owl-theme');

    owlProductTile.trigger('destroy.owl.carousel');
   
  } else  {

    $(owlProductTile).addClass('owl-carousel');
    $(owlProductTile).addClass('owl-theme');

      owlProductTile.owlCarousel({
        nav:false,
        dots:true,
        slideBy:4,
        loop:true,
        margin:10,
        autoplay: 5,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            }
        }
    });
  }
}

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
      if (product.showBuyButton) {
        $('#product-tile').append(
          `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 py-4 d-flex justify-content-center card-container">
          <div class="card-outer">
            <div class="card product-tile__item">
              <img src="${product.images[0].imageURL}" class="card-img-top" alt="Product">
              <div class="card-body pb-2">
                <h5 class="card-title product-tile__item__title text-center mb-1  ">${product.name}</h5>
                <div class="price-container d-flex justify-content-center mx-auto">
                  <p class="card-text price-container__price d-flex justify-content-center">$${product.price}</p>
                  <button class="add-to-cart d-flex justify-content-center">BUY NOW</button>
                </div>
              </div>
            </div>
          </div>
        </div>
          `
        )
      } else if (!product.name) {
        $('#product-tile').append(
        `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 py-4 d-flex justify-content-center card-container">
        <div class="card-outer no-product">
          <div class="card product-tile__item">
            <img src="../img/no_product.png" class="card-img-top" alt="Product">
            </div>
            <div class="card-overlay card">
              <div class="card-body d-flex align-items-end p-4">
                <div class="card-body__inner d-flex flex-column">
                  <p class="text-white mb-3">My dragons are misbehaving again. Unbelieveable!</p>
                  <p><i class="far fa-id-badge"></i> <span class="text-white text-uppercase ml-2">5H ago</span> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
        )
      } else {
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
      }

    });

  },
  renderFeaturedProducts: function() {

    this.items.forEach( product => {
      product.name &&
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
      nav:false,
      dots:false,
      slideBy:4,
      loop:true,
      margin:10,
      autoplay: 5,
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
          },
          500:{
              items:2,
          },
          800:{
            items:3,
        },
          1200:{
              items:4,
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
    product.name &&
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
  addToCart: function (productID, quantity = 1) {


  //Receiving data about products added to cart
  let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));  

  //Updating products in cart in Local Storage
  if (productsInCart) {

    let indicator = 0;
    
    //checking if this product has already been added before
    productsInCart.forEach( element => {
      //updating the quantity if product was added before
      if (element.id == productID) {
          element.quantity += quantity;
          indicator = 1;
      }
    });

    //if this is new product - adding it to the array
    if (indicator === 0) {
      let newProductToAdd = {}
          newProductToAdd.id = productID;
          newProductToAdd.quantity = quantity;
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
    newProductToAdd.quantity = quantity;
    
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

  },
  renderPopularProducts: function() {
    let productsToRender = JSON.parse(JSON.stringify(this.items));
    productsToRender.length = 4;
  
    productsToRender.forEach( product => {
      $('#popular-products').append(
        `
        <div class="item">
        <div>
        <div class="card-outer">
        <div class="card product-tile__item" style="width: 100%;">
          <img src="${product.images[0].imageURL}" class="card-img-top" alt="Product">
          <div class="card-body">
            <h5 class="card-title product-tile__item__title text-center">${product.name}</h5>
            <p class="card-text product-tile__item__price text-center">${product.price}</p>
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

  },
};

breakpoints.initialBreakPoint = breakpoints.getBreakPoint(($( window ).width()));

$.ajax({ 
  type: 'GET', 
  url: 'products.json', 
  dataType: 'JSON',
  success: function (data) {

    //Setting products data into the products object
    products.items = data;

    // Rendering the initial scope of products on all pages where needed
    products.renderProducts();

    // Rendering featured products on all pages where needed
    products.renderFeaturedProducts();  

    // Rendering Popular Products on product page
    products.renderPopularProducts();

    //Rendering products count on services page
    $('#products-count').html(products.items.length);

    // Adding owl carousel for popular products on product page
    $('#popular-products').owlCarousel({
      nav:false,
      dots:true,
      slideBy:4,
      loop:true,
      margin:10,
      autoplay: 5,
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
          },
          500:{
            items:2,
          },
          800:{
            items:3,
          },
          1000:{
            items:4,
            dots:false,
          },
      }
    });

    //adding owl carousel for homepage product tile on very small screens
    toggleOwlPopularProducts();

  }
})




