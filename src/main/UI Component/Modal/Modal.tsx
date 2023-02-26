import './Modal.scss'
import {MouseEventHandler} from 'react';
import {createPortal} from "react-dom";
// import * as ReactDOM from 'react-dom';

interface Props {
  onBackdropClick: () => void;
  children: React.ReactNode;
  isPdfModal?: boolean
  small?: boolean
}

const stopPropagation: MouseEventHandler<HTMLDivElement> = e => {
  e.stopPropagation();
};

const Modal: React.FC<Props> = ( {onBackdropClick, children, small, isPdfModal} ) => {
  return createPortal(
    <div className="my-modal" onClick={onBackdropClick}>
      {
        isPdfModal ?
          <div onClick={stopPropagation} className="pdf-modal-content">
            {children}
          </div>
          :
          small ?
            <div onClick={stopPropagation} className="my-modal-content2">
              {children}
            </div>
            :
            <div onClick={stopPropagation} className="my-modal-content">
              {children}
            </div>
      }
    </div>,
    document.getElementById( "modal" )!
  );
}

export default Modal
