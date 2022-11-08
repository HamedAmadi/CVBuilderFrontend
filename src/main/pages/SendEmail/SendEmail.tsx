import './SendEmail.scss'
import {FC} from "react";
import SendEmailImage from '../../../assets/send-email.webp'

const SendEmail: FC = () => {
  return (
    <div className="send-email mx-auto mt-5">
      <div className="container">
        <div className="col-md-6 mx-auto">
          <img src={SendEmailImage} alt="send-email" />
        </div>
        <h2 className="text-center">ایمیل خود را بررسی کنید</h2>
        <p className="text-center">لینک تایید را به آدرس ایمیل {localStorage.getItem( 'email' )} ارسال کردیم.</p>
        <p className="text-center">(ایمیل ارسال شده ممکن است داخل پوشه spam شما باشد.)</p>
      </div>
    </div>
  );
};

export default SendEmail;
