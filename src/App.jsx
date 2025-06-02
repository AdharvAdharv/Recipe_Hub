import React, { useState } from 'react';
import SplashScreen from './Components/SplashScreen';
import HomePage from './pages/HomePage';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <HomePage />
      )}
    </>
  );
}

export default App;
