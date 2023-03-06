import './SignIn.scss'
import {FC, Fragment, useState} from "react";
import {SubmitHandler, useForm} from 'react-hook-form';
import Input from '../../UI Component/Input/Input';
import Button from '../../UI Component/Button/Button';
import {Link, useNavigate} from 'react-router-dom';
import {useSendEmailForSignIn, useSignIn} from '../../hooks/user-hooks';
import {useUserContext} from '../../context/UserContext';

export interface SignIn {
  email: string
  password: string
}

const SignIn: FC = () => {
  const navigate = useNavigate();
  const {dispatch} = useUserContext()
  const [withoutPassword, setWithoutPassword] = useState<boolean>( false );
  const [errorMessage, setErrorMessage] = useState<string>();
  const {register, handleSubmit, reset, formState: {errors}} = useForm<SignIn>();
  const {mutate: signIn, isLoading: signInIsLoading} = useSignIn()
  const {mutate: signInWithoutPassword, isLoading: signInWithoutPasswordIsLoading} = useSendEmailForSignIn()

  const onSubmit: SubmitHandler<SignIn> = ( data ) => {
    if ( !withoutPassword ) {
      signIn( data, {
        onSuccess: ( res ) => {
          dispatch( {type: 'signIn', payload: true} )
          dispatch( {type: 'verify', payload: res.verified} )
          if ( res.firstName ) {
            dispatch( {type: 'setFirstName', payload: res.firstName} )
          }
          if ( res.lastName ) {
            dispatch( {type: 'setLastName', payload: res.lastName} )
          }
          dispatch( {type: 'setEmail', payload: res.email} )
          navigate( '/resume-list' )
          reset()
        },
        onError: ( error ) => {
          if ( error.response?.status === 401 ) {
            setErrorMessage( 'ایمیل یا رمز عبور وارد شده اشتباه است' )
          }
          else {
            setErrorMessage( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
          }
        }
      } )
    }
    if ( withoutPassword ) {
      signInWithoutPassword( data, {
        onSuccess: ( res ) => {
          localStorage.setItem( 'email', res.email )
          navigate( '/send-email-for-login' )
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
  };

  return (
    <Fragment>
      <div>
        <div className="container">
          <h3 className='mt-5 fw-bolder text-center'>ورود به حساب کاربری</h3>
          <p className='text-danger text-center'>{errorMessage}</p>
          <form onSubmit={handleSubmit( onSubmit )} className='signin-form' noValidate>
            <Input
              errors={errors}
              {...register( 'email',
                {
                  required: 'ایمیل خود را وارد کنید',
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'ایمیل اشتباه وارد شده'
                  },
                } )}
              type='email'
              name='email'
              label='ایمیل'
            />
            {
              !withoutPassword &&
              <Input
                errors={errors}
                {...register( 'password',
                  {
                    required: 'رمز عبور را وارد کنید',
                  } )}
                type='password'
                name='password'
                label='رمز عبور'
              />
            }
            <div className="password-checkbox">
              <input type="checkbox" id='withoutPassword' checked={withoutPassword} onChange={() => setWithoutPassword( !withoutPassword )} />
              <label htmlFor="withoutPassword">ورود بدون رمز عبور</label>
            </div>
            <Button disabled={signInIsLoading || signInWithoutPasswordIsLoading} size={'medium'} style={'solid'} borderRadius={'normal'}>
              {( signInIsLoading || signInWithoutPasswordIsLoading ) && <div className="spinner-border spinner-border-sm ms-2" role="status" />}
              ورود
            </Button>
          </form>
          {
            errorMessage === 'ایمیل یا رمز عبور وارد شده اشتباه است' &&
            <Fragment>
              <div className="text-center mt-2">
                <Link to='/signup'> ثبت نام </Link>
              </div>
            </Fragment>
          }
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
