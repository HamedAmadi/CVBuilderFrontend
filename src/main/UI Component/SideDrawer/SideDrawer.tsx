import './SideDrawer.scss'

interface Props {
  children?: React.ReactNode
  show: boolean
}


const SideDrawer: React.FC<Props> = ( props ) => {
  let drawerClasses = 'side-drawer'
  if ( props.show ) {
    drawerClasses = 'side-drawer open'
  }
  return (
    < div className={drawerClasses} >
      {props.children}
    </div >
  )
}

export default SideDrawer
