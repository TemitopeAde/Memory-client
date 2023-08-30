import React from 'react'
import Modal from 'react-modal';
import UpdateMemory from '../Pages/UpdateMemory';


const FormModal = ({ currentId, setCurrentId }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: "60%"
    },
  };

  console.log(currentId, "currentId");
  // let subtitle;
  const [isOpen, setIsOpen] = React.useState(currentId ? true: false);
  console.log(isOpen, "open");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setCurrentId(null)
  }

  Modal.setAppElement("body")

  return (
    <div>
      <div className='modal-class'>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add memory modal"
        >
          <a className='close-btn' href='' onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
              <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
            </svg>
          </a>
          <UpdateMemory currentId={currentId} setCurrentId={setCurrentId} />
        </Modal>
      </div>
    </div>
  )
}

export default FormModal