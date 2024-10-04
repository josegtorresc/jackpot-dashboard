import React from 'react';
import '../styles/flashMessageStatic.css';
import { RingLoader } from 'react-spinners';
import '../styles/cardEstBalance.css';

function FlashMessageStatic() {
  return (
    <div className="flash-message-static">
      <RingLoader color={'orange'} size={45} />
    </div>
  );
}

export default FlashMessageStatic;
