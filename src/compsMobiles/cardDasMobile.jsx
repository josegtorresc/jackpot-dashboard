import React from 'react';
import { RingLoader } from 'react-spinners';
import '../styles/cardEstBalance.css';

function CardDasMobile({ title, text, img, textButton, loading, onClick }) {
  return (
    <div>
      <div className="card-text-sections" onClick={onClick}>
        <div className="card-inside-sections">
          <div>
            <h1 className="title-card-section-inside"> {title} </h1>
            {loading ? (
              <div className="spinner-container">
                <RingLoader color={'orange'} loading={loading} size={30} />
              </div>
            ) : (
              <p
                dangerouslySetInnerHTML={{ __html: text }}
                className="text-card-section-inside"
              ></p>
            )}
          </div>
          <div>
            <img className="img-card-section-inside" src={img} alt="" />
          </div>
          <span className="item-img-span span-card-aside-inside-section"></span>
        </div>
      </div>
    </div>
  );
}

export default CardDasMobile;
