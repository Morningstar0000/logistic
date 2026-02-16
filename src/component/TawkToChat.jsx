import { useEffect } from 'react';

const TawkToChat = () => {
  useEffect(() => {
    // Prevent multiple script loads
    if (window.Tawk_API) return;

    // Your Tawk.to widget code
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function(){
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/69745de86d15d9197bca2104/1jfn8tlcs';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();

    // Optional: Customize the widget
    if (window.Tawk_API && window.Tawk_API.onLoad) {
      window.Tawk_API.onLoad = function() {
        // Set widget properties
        window.Tawk_API.customStyle = {
          visibility: {
            desktop: {
              position: 'br', // bottom-right
              offsetX: 20,
              offsetY: 20
            },
            mobile: {
              position: 'br',
              offsetX: 10,
              offsetY: 10
            }
          }
        };
        
        // Set visitor attributes (optional)
        window.Tawk_API.setAttributes({
          'name': 'Website Visitor',
          'website': 'Ezio Logistics'
        });
      };
    }

    // Cleanup function (optional)
    return () => {
      // If you want to hide the widget when component unmounts
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default TawkToChat;