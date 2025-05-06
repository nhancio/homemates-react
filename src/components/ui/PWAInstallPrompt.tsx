import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const PWAInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
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
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-lg shadow-lg p-4 z-50">
      <button 
        onClick={() => setShowPrompt(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <X className="w-5 h-5" />
      </button>
      <h3 className="font-semibold mb-2">Install Homemates App</h3>
      <p className="text-sm text-gray-600 mb-4">
        Install our app for a better experience and quick access to your properties
      </p>
      <button
        onClick={handleInstall}
        className="w-full btn btn-primary"
      >
        Install App
      </button>
    </div>
  );
};

export default PWAInstallPrompt;
