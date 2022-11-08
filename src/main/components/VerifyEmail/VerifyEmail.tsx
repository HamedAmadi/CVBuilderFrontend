import {FC, Fragment, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useUserContext} from "../../context/UserContext";
import {useVerifyEmail} from "../../services/hooks/user-hooks";

const VerifyEmail: FC = () => {
  const {dispatch} = useUserContext()
  const navigate = useNavigate();
  let {token} = useParams();
  const {data, isLoading, isError, error} = useVerifyEmail( token )

  useEffect( () => {
    if ( !isLoading ) {
      dispatch( {type: 'verify', payload: data.verified} )
      navigate( '/resume-list' )
    }

  }, [data] );

  if ( isLoading ) return ( <div className="text-center mt-5"><h4 className="text-center pt-5">در حال انتقال به حساب کاربری...</h4></div > )
  if ( error?.response?.status === 401 ) return ( <div className="text-center mt-5"><h4 className="text-center pt-5">لینک معتبر نیست</h4></div > )
  if ( error?.response?.status === 403 ) return ( <div className="text-center mt-5"><h4 className="text-center pt-5">لینک منقضی شده است</h4></div > )
  if ( error?.response?.status === 500 ) return ( <div className="text-center mt-5"><h4 className="text-center pt-5">خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید</h4></div > )

  return (
    <Fragment>
    </Fragment>
  );
};

export default VerifyEmail;
