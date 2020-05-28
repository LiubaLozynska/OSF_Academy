export const OSFcookies = {

  setCookies: function(name, value, options = {}) {
        options = {
          path: '/',
          ...options
        };

        if (options.expires instanceof Date) {
          options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
          updatedCookie += "; " + optionKey;
          let optionValue = options[optionKey];
          if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
          }
        }

        document.cookie = updatedCookie;
  },
  deleteCookies: function(name) {
        setCookie(name, "", {
          'max-age': -1
        })
  },
  getCookie: function (name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
  },
  showCookiesModal: function() {

      //Receiving cookiesAccepted value from cookies
      let cookiesAccepted = this.getCookie('cookiesAccepted'); 
  
      //showing cookies modal once page loaded if user haven't accepted cookies yet
      if ( +cookiesAccepted === 0 || typeof(cookiesAccepted) === 'undefined' ) {
        setTimeout(() => {
          $('#cookies-modal').modal('show');
        }, 10000);
      }
  },
  initializeCookies: function () {
      // Saving cookiesAccepted property as false once close cookies modal was pressed
      $( document ).on('click', '#cookies-modal-close', function(){
        $('#cookies-modal').modal('hide');
        OSFcookies.setCookies('cookiesAccepted', 0);
      })

      // Saving cookiesAccepted property as true once ACCEPT button in cookies modal was pressed
      $( document ).on('click', '#cookies-modal-accept', function(){
        $('#cookies-modal').modal('hide');
        OSFcookies.setCookies('cookiesAccepted', 1);
      })
  }
  
}


