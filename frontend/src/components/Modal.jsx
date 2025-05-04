import React, { useState, useEffect } from 'react';
import { FaX } from 'react-icons/fa6';
const Modal = ({ isOpen, closeModal, children }) => {
  const [showModal, setShowModal] = useState(isOpen);

  // When the `isOpen` prop changes, we update the modal state
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      const timer = setTimeout(() => setShowModal(false), 300); // Match with animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div>
      {showModal && (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={closeModal}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
          >
            <button className="close-btn cBtn cBtn--green" onClick={closeModal}>
                <span>
                <FaX></FaX>
                </span>
            </button>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;