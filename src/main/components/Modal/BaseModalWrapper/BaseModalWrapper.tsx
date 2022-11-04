import Modal from "../Modal";


export interface Props {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  children?: React.ReactNode;
  isPdfModal?: boolean
  small?: boolean
}



const BaseModalWrapper: React.FC<Props> = ( {isModalVisible, onBackdropClick, small, children, isPdfModal} ) => {

  if ( !isModalVisible ) {
    return null
  }

  return (
    <Modal onBackdropClick={onBackdropClick} isPdfModal={isPdfModal} small={small} >
      {children}
    </Modal>
  );
}

export default BaseModalWrapper
