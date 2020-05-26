  //Reassigning default owl controls
   
  let featuredProdCarousel = $('#featured-products-carousel');

  $('#prev').on('click', function() {
    featuredProdCarousel.trigger('prev.owl.carousel');
  })

  $('#next').on('click', function() {
    featuredProdCarousel.trigger('next.owl.carousel');
  })