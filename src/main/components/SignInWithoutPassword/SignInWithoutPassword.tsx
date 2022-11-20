import {FC, Fragment, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useUserContext} from "../../context/UserContext";
import {useSignInWithoutPassword} from "../../services/hooks/user-hooks";

const SignInWithoutPassword: FC = () => {
  const {dispatch} = useUserContext()
  const navigate = useNavigate();
  let {token} = useParams();
  const {data, isLoading, isError, error} = useSignInWithoutPassword( token )

  useEffect( () => {
    if ( !isLoading || !isError ) {
      dispatch( {type: 'signIn', payload: true} )
      dispatch( {type: 'setEmail', payload: data.email} )
      dispatch( {type: 'verify', payload: data.verified} )
      if ( data.firstName ) {
        dispatch( {type: 'setFirstName', payload: data.firstName} )
      }
      if ( data.lastName ) {
        dispatch( {type: 'setLastName', payload: data.lastName} )
      }
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

export default SignInWithoutPassword;
