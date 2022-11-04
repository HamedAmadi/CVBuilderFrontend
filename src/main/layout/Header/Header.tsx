import './Header.scss'
import {Fragment, useState} from "react"
import Logo from '../../components/Logo/Logo'
import UserWidget from '../../components/UserWidget/UserWidget'




const Header: React.FC = () => {
  return (
    <Fragment>
      <div className="header">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="d-flex my-2 me-2">
              <div className='py-2'><Logo /></div>
            </div>
            <UserWidget />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Header
