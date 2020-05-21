//Creating an object to store info about products

const products = {

  items: [],
  renderedProductsCount: 0,

  renderProducts: function() {
    let productsToRender = JSON.parse(JSON.stringify(this.items));
   
  
    if (breakpoints.initialBreakPoint === breakpoints.Small) {
      productsToRender.length = 2;
    } else if (breakpoints.initialBreakPoint === breakpoints.Medium){
      productsToRender.length = 6;
    } else if (breakpoints.initialBreakPoint === breakpoints.Large){
      productsToRender.length = 8;
    }
  
    products.renderedProductsCount = productsToRender.length;
  
    productsToRender.forEach( product => {
      $('#product-tile').append(
        `<div class="col-12 col-sm-6 col-md-4 col-lg-3 py-4 mx-auto d-flex justify-content-center">
          <div class="card product-tile__item" style="width: 15rem;">
            <img src="${product.images[0].imageURL}" class="card-img-top" alt="Product">
            <div class="card-body">
              <h5 class="card-title product-tile__item__title text-center">${product.name}</h5>
              <p class="card-text product-tile__item__price text-center">$${product.price}</p>
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
        <div class="card product-tile__item">
          <img src="${product.images[0].imageURL}" class="card-img-top" alt="Product">
          <div class="card-body">
            <h5 class="card-title product-tile__item__title text-center">${product.name}</h5>
            <p class="card-text product-tile__item__category text-center">${product.attributes.category}</p>
          </div>
        </div>
      </div>
        `
      )
    });
  
    $('#featured-products-carousel').owlCarousel({
      nav:true,
      dots:false,
      slideBy:4,
      loop:true,
      margin:10,
      autoplay: 5,
      responsiveClass:true,
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
  })
  },
  loadMore: function() {

  //How many additional products should be rendered
  let productsToRenderQuantity = 0;

  switch(breakpoints.initialBreakPoint) {
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
      `<div class="col-12 col-sm-6 col-md-4 col-lg-3 py-4 mx-auto d-flex justify-content-center">
        <div class="card product-tile__item" style="width: 15rem;">
          <img src="${product.images[0].imageURL}" class="card-img-top" alt="Product">
          <div class="card-body">
            <h5 class="card-title product-tile__item__title text-center">${product.name}</h5>
            <p class="card-text product-tile__item__price text-center">$${product.price}</p>
          </div>
        </div>
      </div>
      `
    )
  });

  //Setting new rendered product quantity
  products.renderedProductsCount += productsToRenderQuantity;
  
  },
};

//Creating an object to store info about breakpoints

const breakpoints = {

  'Small' : 'Small',
  'Medium' : "Medium",
  'Large' : 'Large',
  'initialBreakPoint': 0,

   getBreakPoint: function( windowWidth ) {
    if (windowWidth <= 768) {
      return this.Small;
    } else if (windowWidth > 768 && windowWidth <= 980) {
      return this.Medium;
    } else {
      return this.Large;
    }
   }
} 

// Loading products details from JSON file - products.json and rendering them

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


// Rerendering products based on window width

$( window ).resize( () => {
  
  let currentWindowWidth = $( window ).width();
  currentBreakPoint = breakpoints.getBreakPoint(currentWindowWidth);

  if ( currentBreakPoint !== breakpoints.initialBreakPoint ) {

    breakpoints.initialBreakPoint = currentBreakPoint;
    $('#product-tile').empty(); 
    products.renderProducts(products);

  }
  
})

// Rerendering more products based on window width after the LOAD MORE button is pressed

$( '#load-product-tile' ).on('click', () => {
     products.loadMore();
})


