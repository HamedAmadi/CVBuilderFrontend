import './UserSetting.scss'
import {FC, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import UserInfo from "../../components/UserInfo/UserInfo";
import {useSendVerifyEmail} from "../../hooks/user-hooks";
import {useUserContext} from '../../context/UserContext';

const UserSetting: FC = () => {
  const {state} = useUserContext()
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>();
  const {mutate, isLoading} = useSendVerifyEmail()
  const sendVerifyEmail = () => {
    mutate( {}, {
      onSuccess: ( res ) => {
        localStorage.setItem( 'email', res.email )
        navigate( '/send-email' )
      },
      onError: ( error ) => {
        if ( error.response?.status === 401 ) {
          setErrorMessage( 'حساب کاربری با این ایمیل وجود ندارد' )
        }
        else {
          setErrorMessage( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
        }
      }
    } )
  }

  return (
    <div className="user-setting">
      <div className="container">
        <div className="d-flex justify-content-between pt-4 mb-3 pb-2 border-bottom">
          <h4 className='fw-bold'>تنظیمات حساب کاربری</h4>
        </div>
        <p className='text-danger text-center'>{errorMessage}</p>
        {!state.isVerified &&
          <div className="verify-email-banner d-flex justify-content-between mb-3 mx-auto">
            <p className="my-auto">ایمیل حساب کاربری شما تایید نشده است.</p>
            <Link to='#' onClick={sendVerifyEmail}>تایید آدرس ایمیل</Link>
          </div>
        }
        <div className="user-info-wrapper">
          <h6 className='fw-bold'>اطلاعات حساب کاربری</h6>
          <div className="user-info-form">
            <UserInfo />
          </div>
        </div>
        <div className="user-info-wrapper">
          <h6 className='fw-bold'>تغییر رمز عبور</h6>
          <div className="user-info-form">
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
