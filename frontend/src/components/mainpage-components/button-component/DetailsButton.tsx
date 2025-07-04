import React from 'react';

import Modal from '../../car-selection-components/Modal';
import CarSelection from '../../car-selection-components/CarSelection';

interface DetailsButtonProps {
  onClick?: () => void;
  modalStateData:{
    modalOpen:boolean,
    setModalOpen:React.Dispatch<React.SetStateAction<boolean>>
  }
}

const DetailsButton: React.FC<DetailsButtonProps> = (props) => {
  const {modalOpen,setModalOpen} = props.modalStateData;
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setModalOpen(true);
        }}
        className="mt-2 text-sm text-black underline hover:text-red-800 transition-colors duration-200 cursor-pointer"
      >
        See more details
      </button>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <CarSelection  />
      </Modal>
    </>
  );
};

export default DetailsButton;
