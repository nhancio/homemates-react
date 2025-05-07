import React, { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';

const PWAInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Delay showing prompt by 1 second
    const showDelay = setTimeout(() => {
      const handler = (e: any) => {
        e.preventDefault();
        setInstallPrompt(e);
        setShowPrompt(true);
        
        // Auto hide after 2 seconds
        setTimeout(() => {
          setShowPrompt(false);
        }, 2000);
      };

      window.addEventListener('beforeinstallprompt', handler);
      // Trigger handler immediately for web browsers
      if (window.matchMedia('(display-mode: browser)').matches) {
        handler(new Event('manual-trigger'));
      }

      return () => {
        window.removeEventListener('beforeinstallprompt', handler);
      };
    }, 1000);

    return () => clearTimeout(showDelay);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-[4.5rem] w-[90%] max-w-sm mx-auto bg-white rounded-lg shadow-lg p-3 z-50 flex items-center">
      <Download className="w-4 h-4 text-primary-600 mr-2" />
      <div className="flex-1">
        <h3 className="text-sm font-semibold">Install Homemates App</h3>
        <p className="text-xs text-gray-600">For a better experience</p>
      </div>
      <button
        onClick={handleInstall}
        className="btn btn-primary btn-sm whitespace-nowrap ml-2"
      >
        Install
      </button>
      <button 
        onClick={() => setShowPrompt(false)}
        className="ml-1 p-1 text-gray-500 hover:text-gray-700"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PWAInstallPrompt;
