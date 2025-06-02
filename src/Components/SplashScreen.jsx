import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2500); 
    const finishTimer = setTimeout(() => onFinish(), 3500); 

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  const text = "🍳 Recipe Hub";

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-orange-500 z-50 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <h1 className="text-white text-5xl font-extrabold animate-wave flex items-center justify-center">
  <span className="mr-2">🍳</span> 
  {' '}
  {"Recipe Hub".split('').map((char, index) => (
    <span key={index} className="wave-letter">
      {char}
    </span>
  ))}
</h1>

    </div>
  );
};

export default SplashScreen;
