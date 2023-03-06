import './UserWidget.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import {FC, Fragment, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useUserContext} from '../../context/UserContext';
import {TbChevronDown, TbUser, TbFileText, TbLogout, TbUserCircle} from 'react-icons/tb';
import Backdrop from '../../UI Component/Backdrop/Backdrop';
import {useLogout} from '../../hooks/user-hooks';
import Skeleton from 'react-loading-skeleton';

const UserWidget: FC = () => {
  const navigate = useNavigate()
  const {state, dispatch} = useUserContext()
  const [dropdownIsVisible, dropdownIsVisibleToggleHandler] = useState<boolean>( false )
  const {mutate: logout, isLoading} = useLogout()


  let dropdownClasses = 'nav-dropdown'
  if ( dropdownIsVisible ) {
    dropdownClasses = 'nav-dropdown show'
  }


  const toggleDate = () => {
    dropdownIsVisibleToggleHandler( !dropdownIsVisible )
  }

  const logoutHandler = () => {
    logout( undefined, {
      onSuccess: ( res ) => {
        dispatch( {type: 'reset'} )
        localStorage.removeItem( 'templateNumber' )
        localStorage.removeItem( 'email' )
        navigate( '/' )
      }
    } )
  }

  let backdrop;
  if ( dropdownIsVisible ) {
    backdrop = <Backdrop close={toggleDate} />;
  }

  return (
    <div className="user-widget my-auto">
      <div className="my-auto d-flex">
        {
          state.isSignIn === null ?
            <Skeleton height='100%' width='160px' baseColor='#008f7e' highlightColor='#00695c' />
            :
            state.isSignIn ?
              <div className="profile-button" onClick={toggleDate}>
                <TbUserCircle className="user-icon" />

                <TbChevronDown className="me-1 mt-1" />
                <ul className={dropdownClasses}>
                  {
                    ( state.firstName && state.lastName ) ?

                      <div className='user-name'><TbUserCircle /> {state.firstName} {state.lastName}</div>
                      :
                      ( state.firstName ) ?
                        <div className='user-name'><TbUserCircle /> {state.firstName}</div>
                        :
                        ( state.lastName ) ?
                          <div className='user-name'><TbUserCircle /> {state.lastName}</div>
                          :
                          <div className='user-email'>{state.email}</div>

                  }
                  <li onClick={toggleDate}><Link className='stretched-link' to="/resume-list"><TbFileText /> لیست رزومه ها</Link></li>
                  <li onClick={toggleDate}><Link className='stretched-link' to="/user-setting"><TbUser /> تنظیمات کاربری</Link></li>
                  <li onClick={toggleDate}><Link className='stretched-link' to="#" onClick={logoutHandler}><TbLogout /> خروج</Link></li>
                </ul>
              </div>
              :
              <Fragment>
                <div className="mx-2 my-auto">
                  <Link to='/signin'>
                    ورود
                  </Link>
                </div>
                <div className="my-auto">/</div>
                <div className="mx-2 my-auto">
                  <Link to='/choose-templates'>
                    ثبت نام
                  </Link>
                </div>
              </Fragment>
        }
      </div>
      {backdrop}
    </div>
  );
};

export default UserWidget;
