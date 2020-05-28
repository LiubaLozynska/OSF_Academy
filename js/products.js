import { breakpoints } from './breakpoints.js';

export const products = {

  items: [],
  renderedProductsCount: 0,

  renderProducts: function () {
    let productsToRender = JSON.parse(JSON.stringify(this.items));

    if (breakpoints.initialBreakPoint === breakpoints.VerySmall) {
      productsToRender.length = 4;
    } if (breakpoints.initialBreakPoint === breakpoints.Small) {
      productsToRender.length = 4;
    } else if (breakpoints.initialBreakPoint === breakpoints.Medium) {
      productsToRender.length = 6;
    } else if (breakpoints.initialBreakPoint === breakpoints.Large) {
      productsToRender.length = 8;
    }

    products.renderedProductsCount = productsToRender.length;

    productsToRender.forEach(product => {
      if (product.showBuyButton) {
        $('#product-tile').append(
          `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 py-4 d-flex justify-content-center card-container">
          <div class="card-outer">
            <div class="card product-tile__item">
            <a href="product-page.html"><img src="${product.images[0].imageURL}" class="card-img-top" alt="Product"></a>
              <div class="card-body pb-2">
                <h5 class="card-title product-tile__item__title text-center mb-1  "><a href="product-page.html">${product.name}</a></h5>
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
  renderFeaturedProducts: function () {

    this.items.forEach(product => {
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
      nav: false,
      dots: false,
      slideBy: 4,
      loop: true,
      margin: 10,
      autoplay: 5,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        500: {
          items: 2,
        },
        800: {
          items: 3,
        },
        1200: {
          items: 4,
        }
      }
    });

    //Reassigning default owl controls

    let featuredProdCarousel = $('#featured-products-carousel');
    $('#prev').on('click', function () {
      featuredProdCarousel.trigger('prev.owl.carousel');
    })

    $('#next').on('click', function () {
      featuredProdCarousel.trigger('next.owl.carousel');
    })

  },
  loadMore: function () {

    //How many additional products should be rendered
    let productsToRenderQuantity = 0;

    switch (breakpoints.initialBreakPoint) {
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
    productsToRender.forEach(product => {
      if (product.showBuyButton) {
        $('#product-tile').append(
          `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 py-4 d-flex justify-content-center card-container">
        <div class="card-outer">
         <a href="product-page.html">
          <div class="card product-tile__item">
            <img src="${product.images[0].imageURL}" class="card-img-top" alt="Product">
            <div class="card-body pb-2">
              <h5 class="card-title product-tile__item__title text-center mb-1  "> ${product.name} </h5>
              <div class="price-container d-flex justify-content-center mx-auto">
                <p class="card-text price-container__price d-flex justify-content-center">$${product.price}</p>
                <button class="add-to-cart d-flex justify-content-center">BUY NOW</button>
              </div>
            </div>
           </div>
          </a>
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

    //Setting new rendered product quantity
    products.renderedProductsCount += productsToRenderQuantity;

  },
  renderPopularProducts: function () {
    let productsToRender = JSON.parse(JSON.stringify(this.items));
    productsToRender.length = 4;

    productsToRender.forEach(product => {
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
  onWindowResize: function ( triggerOwl = false ) {
     
    let currentWindowWidth = $( window ).width();
    let currentBreakPoint = breakpoints.getBreakPoint(currentWindowWidth);

    if ( currentBreakPoint !== breakpoints.initialBreakPoint ) {

      breakpoints.initialBreakPoint = currentBreakPoint;
      $('#product-tile').empty(); 
      products.renderProducts(products);


      //adding or disabling owl carousel for popular products based on screen width on those pages where needed
      if ( triggerOwl ) {
        breakpoints.toggleOwlPopularProducts();
      }

    }
  }
}

export function loadProducts() {

  breakpoints.initialBreakPoint = breakpoints.getBreakPoint(($(window).width()));

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
        nav: false,
        dots: true,
        slideBy: 4,
        loop: true,
        margin: 10,
        autoplay: 5,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
          },
          500: {
            items: 2,
          },
          750: {
            items: 3,
          },
          1000: {
            items: 4,
            dots: false,
          },
        }
      });
  
      //adding owl carousel for homepage product tile on very small screens
      breakpoints.toggleOwlPopularProducts();
      
    }
  })

  // Rendering more products based on window width after the LOAD MORE button is pressed
  $( document ).on('click', '#load-product-tile', () => {
    products.loadMore();
  })
}






