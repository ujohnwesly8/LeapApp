/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, ReactNode, useMemo, useState} from 'react';

type CustomModalContextType = {
  showModal: boolean;
  openModal: (message: string) => void;
  closeModal: () => void;
  modalMessage: string;
};
type CustomModalProviderProps = {
  children: ReactNode;
};

const CustomModalContext = createContext<CustomModalContextType>({
  showModal: false,
  openModal: () => {},
  closeModal: () => {},
  modalMessage: '',
});

export const CustomModalProvider: React.FC<CustomModalProviderProps> = ({
  children,
}: CustomModalProviderProps) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const openModal = (message: string) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const contextValue = useMemo(() => {
    return {
      showModal,
      openModal,
      closeModal,
      modalMessage,
    };
  }, []);

  return (
    <CustomModalContext.Provider value={contextValue}>
      {children}
    </CustomModalContext.Provider>
  );
};

export default CustomModalContext;
