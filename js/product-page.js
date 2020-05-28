import { loadProducts } from './products.js';
import { OSFcookies } from './cookies.js';
import { footer } from './footer.js';
import { megaMenu } from './mega-menu.js';
import { cart } from './cart.js';
import { wishList } from './wish-list.js';
import { modalLogin } from './modal-login.js';

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

//Rendering product page tabs
let tabs = $('.tabs__item');
let tabsCount = tabs.length;


for (let i=0; i < tabsCount; i++) {
    tabs.eq(i).on('click', (event)=> {

      let ID = event.target.id;
      let stringID = '#' + event.target.id;

      $(stringID).toggleClass('active');
      $("div[data-show=" + ID + "]").toggleClass('show');

      for (let i=0; i < tabsCount; i++) {
        
        if (tabs.eq(i)[0].id !== ID) {
          let idToHide = tabs.eq(i)[0].id;
          let stringIDtoHide = '#' + tabs.eq(i)[0].id;

          $(stringIDtoHide).removeClass('active');
          $("div[data-show=" + idToHide + "]").removeClass('show');

        }
      }
    })
  };

//Receiving all needed info about the product and rendering it on the page
  (async () => {
    //Receiving product data
    let product = await $.getJSON('/products.json', function(data) {
      return data;
     });

    // Rendering main product image
    $('#main-product-image').html(
      `<i class="fas fa-expand-arrows-alt zoom-in"></i><img src="${product[0].images[1].imageURL}" alt="Product Image" id="main-image">`
    )

    //Main image zoom in listener
    const mainImageZoom = new Zooming();

    $(document).on('click', '.zoom-in', (event) => {
      event.stopPropagation;
      mainImageZoom.open('#main-image');
    })

    function renderThumbmnails(parent) {
      for (let i = 1; i <= 4; i++) {
        if ( i === 1) {
          $(parent).append(
            `<div class="item">
            <img src="${product[0].images[i].imageThumbnail}" alt="product preview" class="thumbnail active">
            </div>`
          )
        } else {
          $(parent).append(
            `<div class="item">
            <img src="${product[0].images[i].imageThumbnail}" alt="product preview" class="thumbnail">
            </div>`
          )
        }
      }
    }

    //Rendering thumbnails
    renderThumbmnails('#img-thumbnails');
    renderThumbmnails('#img-thumbnails-desktop');

    //Adding thumbnails carousel on small screens
    $('#img-thumbnails').owlCarousel({
      loop:true,
      nav:false,
      dots:true,
      margin:10,
      responsiveClass:true,
      responsive:{
          0:{
              items:3,
          },
      }
    }) 

    //By clicking on any thumbnail, the main image is changed
    $( document ).on('click', '.thumbnail', (event) => { 

      const currentImage = $(event.currentTarget);  
      const currentImageSrc = $(currentImage).attr('src');

      const allThumbnails = $('.thumbnail');
      const SameImageInAnotherView = $(`.thumbnail[src="${currentImageSrc}"]`);
      $(allThumbnails).removeClass('active');
      $(currentImage).addClass('active');
      $(SameImageInAnotherView).addClass('active');

      const bigImageSrc = currentImageSrc.replace('-small.jpg', '') + '.jpg';

      $('#main-product-image').find('img').attr('src', bigImageSrc);

    })


    //Rendering product price
    $('#product-price').html('$' + product[0].price);

    //Q-ty field logic
    const quantityField = $('#product-quantity');
    const increaseQuantity = $('#quantity-increase');
    const decreseQuantity = $('#quantity-decrese');

    //Q-ty field should accept only numbers
    $(quantityField).on('change', () => {
     let currentQuantity = +$(quantityField).val();

     if ( isNaN(currentQuantity) || currentQuantity <= 0) {
       $('.quantity-invalid-feedback').css('display','block');
       $(quantityField).val(1);
     } else if ( +currentQuantity > 0) {
      $('.quantity-invalid-feedback').css('display','none');
     }
    })

    //By clicking “+”, “-” button, accordingly increase/decrease the quantity.
    $(increaseQuantity).on('click', () => {
      let currentQuantity = +$(quantityField).val();
          currentQuantity +=1;
          $(quantityField).val(currentQuantity);
    })

    $(decreseQuantity).on('click', () => {
      let currentQuantity = +$(quantityField).val();
        if( currentQuantity > 1 ) {
          currentQuantity -=1;
        }
        $(quantityField).val(currentQuantity);
    })

    //Minicart will be increased accordingly to the value from Quantity field once ADD TO CART is pressed
    $(document).on('click','.add-to-cart-product-page', () => {
      //Receiving data-id of this product
      let productDataId = product[0].id;
      let quantity = +$(quantityField).val();

      //Adding the product to ProductInCart in Local Storage
      cart.addToCart(productDataId, quantity);

      //Rendering products in wishlist quantity in header and footer
      cart.renderCartQuantity();
    });


    //Read More link. Expand the Product Description text. 
    //The initial limit to show no more than 100 characters. 
    //By clicking on the link, show remaining characters.

    ( () => {
      const showChar = 100;
      const ellipsestext = "...";
      //Receiving product description from json file
      const content = product[0].description;
      const textNode = $('#product-description');
      let currentText;
      let moreText; 
    
      if(content.length > showChar) {
    
        let initialContentToShow = content.substr(0, showChar);
        let contentHidden = content.substr(showChar-1, content.length - showChar);
    
        currentText = initialContentToShow + ellipsestext;
        moreText = initialContentToShow + contentHidden;

        $(textNode).html(currentText);
        $("#read-more").addClass('less');
        }
    
      $("#read-more").click(function(){
        if ($(this).hasClass('less')) {
          $(this).removeClass('less');
          $(this).html('Hide');
          $(textNode).html(moreText);
        } else {
          $(this).addClass('less');
          $(this).html('Read more');
          $(textNode).html(currentText);
        }
      });
    })();  

    //Rendering text in product tabs
    $('#tabs-description').html(product[0].description);
    $('#tabs-additionalInformation').html(product[0].additionalInfo);
   
    product[0].reviews.forEach( review => {
      $('#tabs-reviews').append(
        `
        <div class="review mx-auto">
          <div class="review__username">${review.customerName}</div>
          <div class="review__body">${review.reviewText}</div>
        </div>
        `
      )
    });

    //Rendering reviews quantity in Rewievs tab
    let reviewsQuantity = `(${product[0].reviews.length})`
    $('#reviews-quality').html(reviewsQuantity);
    
  })(); //End of async logic for product page




