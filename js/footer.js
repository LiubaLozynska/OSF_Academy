    
export function footer() {
  
  let footerOpeners = $('h6.opener');
  let length = footerOpeners.length;
 
  for (let i = 0; i < length; i++) {
      footerOpeners.eq(i).on('click', () => {
          // saving current element
          let currentElem = footerOpeners.eq(i);

          // toggling active class to current element on click
          currentElem.toggleClass('active');

      })
   
  }

  // setting copyright date to current year
  let thisDate = new Date();
  let thisYear = thisDate.getFullYear();

  $( '#current-year' ).html(thisYear);
}    
