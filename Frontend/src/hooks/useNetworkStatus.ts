import { useState, useEffect } from 'react';

export interface NetworkStatus {
  isOnline: boolean;
  isLoading: boolean;
  isSlowConnection: boolean;
}

export const useNetworkStatus = (loadingThreshold = 1000) => {
  const [status, setStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    isLoading: false,
    isSlowConnection: false
  });

  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setStatus(prev => ({ ...prev, isOnline: true }));
    };

    const handleOffline = () => {
      setStatus(prev => ({ ...prev, isOnline: false }));
    };

    const handleLoadStart = () => {
      setLoadingStartTime(Date.now());
      setStatus(prev => ({ ...prev, isLoading: true }));

      // Start a timer to check if loading is taking longer than threshold
      const slowTimer = setTimeout(() => {
        setStatus(prev => ({ ...prev, isSlowConnection: true }));
      }, loadingThreshold);

      // Clean up the timer if loading completes before threshold
      return () => clearTimeout(slowTimer);
    };

    const handleLoadEnd = () => {
      setLoadingStartTime(null);
      setStatus(prev => ({ 
        ...prev, 
        isLoading: false,
        isSlowConnection: false
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('loadstart', handleLoadStart);
    window.addEventListener('loadend', handleLoadEnd);

    // For navigation and fetch events
    if ('navigation' in window) {
      const navigation = (window as any).navigation;
      navigation?.addEventListener('navigate', handleLoadStart);
      navigation?.addEventListener('navigatesuccess', handleLoadEnd);
      navigation?.addEventListener('navigateerror', handleLoadEnd);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('loadstart', handleLoadStart);
      window.removeEventListener('loadend', handleLoadEnd);
      
      if ('navigation' in window) {
        const navigation = (window as any).navigation;
        navigation?.removeEventListener('navigate', handleLoadStart);
        navigation?.removeEventListener('navigatesuccess', handleLoadEnd);
        navigation?.removeEventListener('navigateerror', handleLoadEnd);
      }
    };
  }, [loadingThreshold]);

  return status;
};