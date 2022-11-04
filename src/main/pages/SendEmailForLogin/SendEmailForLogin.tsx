import './SendEmailForLogin.scss'
import {FC} from "react";
import SendEmailImage from '../../../assets/send-email.png'

const SendEmailForLogin: FC = () => {
  return (
    <div className="send-email mx-auto mt-5">
      <div className="container">
        <div className="col-md-6 mx-auto">
          <img src={SendEmailImage} alt="send-email" />
        </div>
        <h2 className="text-center">ایمیل خود را بررسی کنید</h2>
        <p className="text-center">لینک ورود به حساب کاربری را به آدرس ایمیل {localStorage.getItem( 'email' )} ارسال کردیم.</p>
      </div>
    </div>
  );
};

export default SendEmailForLogin;
