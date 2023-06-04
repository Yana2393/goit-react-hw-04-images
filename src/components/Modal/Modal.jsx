import React, { useEffect } from 'react';
import css from '../Modal/Modal.module.css';

const Modal = ({ modalClose, largeImage }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDwn);
    return () => {
      document.removeEventListener('keydown', handleKeyDwn);
    };
  }, []);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      modalClose('');
    }
  };

  const handleKeyDwn = e => {
    if (e.key === 'Escape') {
      modalClose('');
    }
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <div className={css.modalContent} onClick={handleOverlayClick}>
          <img className={css.modalContentImg} src={largeImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
