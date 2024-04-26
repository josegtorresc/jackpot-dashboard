import React, { Fragment, useState, useEffect, useRef } from 'react';
import '../styles/notComp.css';
import CardNot from './cardNot';

function NotComp() {
  const [activeNot, setActiveNot] = useState(false);
  const notContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notContainerRef.current &&
        !notContainerRef.current.contains(event.target) &&
        activeNot
      ) {
        setActiveNot(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeNot]);

  const handleCloseAside = () => {
    setActiveNot(false);
  };

  const textNotJackpot =
    'El monto del jackpot fue <br /> actualizado el 23/04/24';

  const textNotCele = 'Bienvenid@ dashboard de administración de jackpots';

  const textNotJackpotAdmin = 'Administra todo lo necesario de los jackpots';

  return (
    <Fragment>
      <div
        className={`container-not-aside-general-info ${
          activeNot ? 'container-not-aside-general-info-show' : ''
        }`}
        ref={notContainerRef}
      >
        <img
          className="img-section-aside-not"
          src={require('../images/close.png')}
          onClick={handleCloseAside} // Aquí se llama handleCloseAside al hacer clic en la imagen
          alt="close"
        />

        <div className="container-aside-inside">
          <h1 className="title-aside-inside">Notificaciones</h1>
          <CardNot
            title="Jackpot actualizado!!"
            text={textNotJackpot}
            img={require('../images/conf.png')}
          />
          <CardNot
            title="Administra todo!"
            text={textNotJackpotAdmin}
            img={require('../images/mon.png')}
          />
          <CardNot
            title="Bienvenid@!!"
            text={textNotCele}
            img={require('../images/celebracion.png')}
          />
          <CardNot
            title="Bienvenid@!!"
            text={textNotCele}
            img={require('../images/celebracion.png')}
          />
        </div>
      </div>

      <div className="container-section-nav-items">
        <div className="container-img--items">
          <img
            className="img--items"
            src={require('../images/campana.png')}
            alt=""
          />
          <span className="item-img-span"></span>
        </div>
        <div className="container-img--items">
          <img
            className="img--items"
            src={require('../images/not.png')}
            onClick={() => setActiveNot(!activeNot)}
            alt=""
          />
          <span className="item-img-span"></span>
        </div>
      </div>
    </Fragment>
  );
}

export default NotComp;
