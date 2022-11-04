import { MouseEventHandler } from 'react'
import './Backdrop.scss'

interface Props {
  close: MouseEventHandler<HTMLDivElement>
}

const Backdrop: React.FC<Props> = ( props ) => {
  return (
    <div className="backdrop" onClick={props.close}></div>
  )
}


export default Backdrop