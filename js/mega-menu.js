$.ajax({ 
  type: 'GET', 
  url: 'menu-items.json', 
  dataType: 'JSON',
  success: function (data) {
    const [...categoriesImported] = Object.keys(data);
    const [...subCategoriesImported] = Object.values(data);

    //Rendering categories
    const categories = $('.category-name'); // caterogies will be rendered here
     
    categoriesImported.forEach ( (category, index) => {
      const categoryInnerHTML = `${categoriesImported[index]} <p class="main-nav__opener d-lg-none">&#9660</p>`
      $( categories[index] ).html(categoryInnerHTML);
    })

    //Rendering subcategories
    const subCategories = $('.subcategories'); // subcaterogies will be rendered here

    subCategoriesImported.forEach( ( subCategoriesList, index ) => {
      subCategoriesList.forEach( subcategory => {
        $( subCategories[index] ).append(
          `<li class="level3"><a href="not-found.html">${subcategory}</a></li>`
        )
      })
    })
  }
});



//Mobile menu Dropdown
$('#mobile-nav-opener').on('click', (event) => {

  $("#dropdown-megamenu").toggleClass("active");
  $( event.currentTarget ).toggleClass("active");

    $(document).on('click', '.main-nav__opener', (event) => {
      event.preventDefault();
      event.stopPropagation();
      let thisElement = event.currentTarget;

      $(thisElement).parent().parent().toggleClass("active");

      //Replacing html geometric shape to up or down pointing triangle depending on active state
      if  ( $(thisElement).parent().parent().hasClass("active") ) {
        $(thisElement).html('&#9650');
      } else {
        $(thisElement).html('&#9660');
      }
      

    });

  
});
