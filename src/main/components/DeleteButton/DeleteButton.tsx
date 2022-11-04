import './DeleteButton.scss'
import {FC} from "react";
import {TbTrash} from 'react-icons/tb';

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const DeleteButton: FC<Props> = ( props ) => {
  return (
    <button type='button' className='delete-button rounded p-1 mb-4 mt-3 ms-2' onClick={props.onClick}><TbTrash /></button>
  );
};

export default DeleteButton;
