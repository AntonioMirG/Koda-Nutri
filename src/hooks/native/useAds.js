import { useState, useEffect } from 'react';
import { AdMob, InterstitialAdPluginEvents } from '@capacitor-community/admob';

export function useAds() {
  const [isAdReady, setIsAdReady] = useState(false);

  useEffect(() => {
    // Inicializar AdMob al montar el hook
    const initAdMob = async () => {
      await AdMob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'], // Tu ID de prueba de AdMob
        initializeForTesting: true,
      });

      // Escuchar eventos del Interstitial
      AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info) => {
        setIsAdReady(true);
      });

      AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
        // Preparar el siguiente anuncio una vez cerrado
        setIsAdReady(false);
        prepareInterstitial();
      });

      prepareInterstitial();
    };

    initAdMob();

    return () => {
      AdMob.removeAllListeners();
    };
  }, []);

  const prepareInterstitial = async () => {
    const options = {
      adId: 'ca-app-pub-3940256099942544/1033173712', // ID DE PRUEBA INTERSTITIAL ANDROID
      // adId: 'TU_ID_REAL_DE_PRODUCCION',
      isTesting: true
    };
    await AdMob.prepareInterstitial(options);
  };

  const showInterstitial = async () => {
    if (isAdReady) {
      await AdMob.showInterstitial();
    } else {
      console.warn('El anuncio aún no estaba listo. Se saltará.');
      // Intenta prepararlo de nuevo para la próxima
      prepareInterstitial();
    }
  };

  return { showInterstitial, isAdReady };
}
