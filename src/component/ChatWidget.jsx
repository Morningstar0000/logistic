import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatWidget = () => {
  const [isChatLoaded, setIsChatLoaded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Only load Tawk.to once
    if (window.Tawk_API) {
      setIsChatLoaded(true);
      return;
    }

    // Load Tawk.to script
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function(){
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/69745de86d15d9197bca2104/1jfn8tlcs';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();

    // Set up event listeners once script is loaded
    const checkTawkLoaded = setInterval(() => {
      if (window.Tawk_API && window.Tawk_API.onLoad) {
        setIsChatLoaded(true);
        
        // Customize Tawk.to widget
        window.Tawk_API.onLoad = function() {
          // Set widget to match your brand
          window.Tawk_API.setAttributes({
            'name': 'Visitor',
            'email': '',
            'website': window.location.hostname
          });
          
          // Listen for chat events
          window.Tawk_API.onChatMaximized = function() {
            console.log('Chat opened');
            setUnreadCount(0);
          };
          
          window.Tawk_API.onChatMinimized = function() {
            console.log('Chat minimized');
          };
          
          window.Tawk_API.onChatMessageVisitor = function() {
            if (!window.Tawk_API.isChatMaximized()) {
              setUnreadCount(prev => prev + 1);
            }
          };
          
          window.Tawk_API.onChatMessageAgent = function() {
            if (!window.Tawk_API.isChatMaximized()) {
              setUnreadCount(prev => prev + 1);
            }
          };
        };
        
        clearInterval(checkTawkLoaded);
      }
    }, 100);

    return () => clearInterval(checkTawkLoaded);
  }, []);

  const toggleChat = () => {
    if (window.Tawk_API) {
      if (window.Tawk_API.isChatMaximized()) {
        window.Tawk_API.minimize();
      } else {
        window.Tawk_API.maximize();
        setUnreadCount(0);
      }
    }
  };

  const closeChat = () => {
    if (window.Tawk_API && window.Tawk_API.hideWidget) {
      window.Tawk_API.hideWidget();
    }
  };

  return (
    <>
      {/* Custom Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 flex items-center justify-center"
          aria-label="Live chat support"
          disabled={!isChatLoaded}
        >
          {isChatLoaded ? (
            <>
              <MessageCircle className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </>
          ) : (
            <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
        </button>
        
        {/* Optional: Status indicator */}
        <div className="absolute -bottom-8 right-0 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow-sm">
          {isChatLoaded ? 'Chat ready' : 'Loading...'}
        </div>
      </div>
      
      {/* Optional: Custom chat interface that appears over Tawk.to */}
      <div className="fixed bottom-24 right-6 z-40 bg-white rounded-lg shadow-xl p-4 max-w-xs hidden" id="custom-chat-tips">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-800">Quick Help</h3>
          <button onClick={() => document.getElementById('custom-chat-tips').classList.add('hidden')}>
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-3">Our agents can help with:</p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Shipping rates & quotes</li>
          <li>• Tracking shipments</li>
          <li>• Booking assistance</li>
          <li>• Customs documentation</li>
        </ul>
      </div>
    </>
  );
};

export default ChatWidget;