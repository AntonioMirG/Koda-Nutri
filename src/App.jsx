import React, { useState, useEffect } from 'react';
import { auth, db } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';

function App() {
  const [user, setUser] = useState(null);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Check if user document exists in Firestore
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setNeedsOnboarding(false);
          } else {
            setNeedsOnboarding(true);
          }
        } catch (error) {
          console.error("Error checking user doc:", error);
          setNeedsOnboarding(true); // Default to onboarding if error or not found
        }
      } else {
        setUser(null);
        setNeedsOnboarding(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleOnboardingComplete = () => {
    setNeedsOnboarding(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fog flex items-center justify-center">
        <div className="animate-pulse text-ink font-display text-heading-sm font-semibold">Koda</div>
      </div>
    );
  }

  if (!user) {
    return <Landing />;
  }

  if (needsOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  return <Dashboard />;
}

export default App;
