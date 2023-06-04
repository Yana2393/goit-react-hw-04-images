import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css';

const Modal = ({ modalClose, largeImage }) => {
  useEffect(() => {
    const handleKeyDwn = e => {
      if (e.key === 'Escape') {
        modalClose('');
      }
    };

    document.addEventListener('keydown', handleKeyDwn);

    return () => {
      document.removeEventListener('keydown', handleKeyDwn);
    };
  }, [modalClose]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
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

Modal.propTypes = {
  modalClose: PropTypes.func,
  largeImage: PropTypes.string,
};

export default Modal;
