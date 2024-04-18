import React, { useState, useEffect } from 'react';
import '../styles/flashMessage.css';

function FlashMessage() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`flash-message ${isVisible ? '' : 'fade-out'}`}>
      <div className="spinner"></div>
    </div>
  );
}

export default FlashMessage;
