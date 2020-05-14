$(document).ready(() => {
    let footerOpeners = $('h6.opener');
    let length = footerOpeners.length;
   
    for (let i = 0; i < length; i++) {
        footerOpeners.eq(i).on('click', (e) => {
            // saving current element
            let currentElem = footerOpeners.eq(i);

            // toggling active class to current element on click
            currentElem.toggleClass('active');

        })
     
    }
   
});
