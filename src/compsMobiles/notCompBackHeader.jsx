import React, {
  Fragment,
  useEffect,
  useState,
  useRef,
  useContext,
} from 'react';
import CardNot from '../comp/cardNot';
import { NotificationContext } from '../services/NotificationContext';

function NotCompBackHeader() {
  const { notifications } = useContext(NotificationContext);

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
          onClick={handleCloseAside}
          alt="close"
        />

        <div className="container-aside-inside">
          <h1 className="title-aside-inside">Notificaciones</h1>
          {notifications.map((notification, index) => (
            <CardNot
              key={index}
              title={notification.title}
              text={notification.text}
              img={notification.img}
            />
          ))}
        </div>
      </div>

      <div className="container-section-nav-items conatiner-nots-back-header">
        <div className="container-img--items span-container-img-back-header">
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

export default NotCompBackHeader;
