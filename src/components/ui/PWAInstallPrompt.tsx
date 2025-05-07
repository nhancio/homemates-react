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
    <div className="fixed bottom-16 right-4 w-64 bg-white rounded-lg shadow-lg p-3 z-50">
      <button 
        onClick={() => setShowPrompt(false)}
        className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
      >
        <X className="w-4 h-4" />
      </button>
      <h3 className="text-sm font-semibold mb-1">Install App</h3>
      <p className="text-xs text-gray-600 mb-2">
        Install for quick access
      </p>
      <button
        onClick={handleInstall}
        className="w-full btn btn-primary btn-sm"
      >
        Install Now
      </button>
    </div>
  );
};

export default PWAInstallPrompt;
