import { useState, useEffect } from 'react';
import { Purchases, LOG_LEVEL } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';

export function useIAP() {
  const [customerInfo, setCustomerInfo] = useState(null);
  const [offerings, setOfferings] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      initPurchases();
    }
  }, []);

  const initPurchases = async () => {
    try {
      await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
      
      // Reemplaza con tu API Key pública de RevenueCat para Android (Google Play)
      // await Purchases.configure({ apiKey: 'goog_TU_API_KEY_AQUI' });

      const info = await Purchases.getCustomerInfo();
      setCustomerInfo(info.customerInfo);
      
      // Verifica si el usuario tiene una suscripción activa (ej: 'premium')
      if (typeof info.customerInfo.entitlements.active['premium'] !== 'undefined') {
        setIsPremium(true);
      }

      // Obtener paquetes disponibles
      const offers = await Purchases.getOfferings();
      if (offers.current !== null && offers.current.availablePackages.length !== 0) {
        setOfferings(offers.current.availablePackages);
      }
    } catch (e) {
      console.error('Error initializing RevenueCat:', e);
    }
  };

  const purchasePackage = async (rcPackage) => {
    try {
      const { customerInfo } = await Purchases.purchasePackage({ aPackage: rcPackage });
      if (typeof customerInfo.entitlements.active['premium'] !== 'undefined') {
        setIsPremium(true);
        return true;
      }
    } catch (e) {
      if (!e.userCancelled) {
        console.error('Error purchasing:', e);
      }
      return false;
    }
  };

  const restorePurchases = async () => {
    try {
      const { customerInfo } = await Purchases.restorePurchases();
      if (typeof customerInfo.entitlements.active['premium'] !== 'undefined') {
        setIsPremium(true);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Error restoring purchases:', e);
      return false;
    }
  };

  return { customerInfo, offerings, isPremium, purchasePackage, restorePurchases };
}
