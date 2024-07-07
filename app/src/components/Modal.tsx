import React, { Fragment } from 'react';
import { Button, Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Transition } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, children }) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpen(false)}>
      {children}
    </Dialog>
  );
};

export default Modal;
