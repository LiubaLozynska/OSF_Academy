$(document).ready(() => {

    //desktop version
    $('#menu-services').on('click', () => {

        $("#dropdown-megamenu").toggleClass("active");
        $("#menu-services").toggleClass("active");

    

        
    });


    //mobile version
    
    $('#mobile-nav-opener').on('click', () => {

        $("#mobile-menu-dropdown").toggleClass("active");
        $("#mobile-nav-opener").toggleClass("active");

           $('#expandable').on('click', (event) => {
            event.stopPropagation()
            $("#expandable").toggleClass("active");
            
            let level2Items = $('#mobile-menu-dropdown li.level2');
            let level2ItemsCount = level2Items.length;

            for ( let i = 0; i < level2ItemsCount; i++) {
                level2Items.eq(i).on('click', (event) => {
                    event.stopPropagation();
                    level2Items.eq(i).toggleClass('active');
                })
            }
        })
    });
})