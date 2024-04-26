import React from 'react';

function CardDasMobile({ title, text, img, textButton }) {
  return (
    <div>
      <div className="card-text-sections">
        <div className="card-inside-sections">
          <div>
            <h1 className="title-card-section-inside"> {title} </h1>
            <p
              dangerouslySetInnerHTML={{ __html: text }}
              className="text-card-section-inside"
            ></p>
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
