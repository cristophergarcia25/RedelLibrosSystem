import React, { useEffect } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';
import { CustomFlowbiteTheme } from "flowbite-react";

export const Modals = ({ opModal, handleClose, title = '', children, handleNewBook }) => {
  const [openModal, setOpenModal] = useState(true);

  useEffect(() => {
    setOpenModal(opModal);
  }, [opModal]);



  return (
    <>
      <Modal show={openModal} onClose={() => { setOpenModal(false); handleClose(false) }} customClass="custom-modal-bg">
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer className='flex justify-center '>
          <Button color='green' className='bg-green-500 ' onClick={() => { handleNewBook(true) }}>
            <RiCheckLine className="mr-2 shrink-0 w-6 h-6" /> Aceptar
          </Button>
          <Button className='bg-red-500 text-white' color="red" onClick={() => { setOpenModal(false); handleClose(false) }}>
            <RiCloseLine className="mr-2 shrink-0 w-6 h-6" /> Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
