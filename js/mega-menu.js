$(document).ready(() => {
    $('#menu-services').on('click', () => {
        $("#dropdown-megamenu").toggleClass("active");
        $("#menu-services").toggleClass("active");
    });
})