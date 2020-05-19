$('#product-preview').owlCarousel({
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

  $('#popular-products').owlCarousel({
    loop:true,
    nav:false,
    dots:true,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
        },
        360:{
          items:2,
        },
        768:{
          items:3,
        },
        980:{
          items:4,
        },

    }
  })


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
}
