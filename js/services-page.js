$(document).ready(() => {
  
  // Rerendering products based on window width

  $( window ).resize( () => {
    
   //Rerendering product tile on window resize 
    breakpoints.onWindowResize();
  })
})