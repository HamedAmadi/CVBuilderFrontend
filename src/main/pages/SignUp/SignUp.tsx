import './SignUp.scss'
import {Fragment, useState} from "react";
import {FieldValues, SubmitHandler, useForm, ValidationRule} from 'react-hook-form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {Link, useNavigate} from 'react-router-dom';
import {useSignUp} from '../../services/hooks/user-hooks';
import {useCookies} from "react-cookie";
import {useUserContext} from '../../context/UserContext';

export interface SignUp {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordRepeat: string
  templateNumber: string | null
}

interface SignUpForm {
  name: "email" | "password" | "passwordRepeat" | "firstName" | "lastName"
  type: string,
  label: string,
  pattern?: ValidationRule<RegExp>,
  reqMessage: string
  notice?: string
  validate?: ( arg0: string ) => boolean | string
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const {dispatch} = useUserContext()
  const [errorMessage, setErrorMessage] = useState<string>();
  const {register, handleSubmit, getValues, formState: {errors}} = useForm<SignUp>();
  const {mutate, isLoading} = useSignUp()

  const signUpForm: SignUpForm[] = [
    {
      name: 'firstName',
      type: 'text',
      label: 'نام',
      reqMessage: 'نام خود را وارد کنید'
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'نام خانوادگی',
      reqMessage: 'نام خانوادگی خود را وارد کنید'
    },
    {
      name: 'email',
      type: 'email',
      label: 'ایمیل',
      pattern: {
        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: 'ایمیل اشتباه وارد شده'
      },
      reqMessage: 'ایمیل خود را وارد کنید'
    },
    {
      name: 'password',
      type: 'password',
      label: 'رمز عبور',
      pattern: {
        value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
        message: 'رمز عبور اشتباه وارد شده'
      },
      reqMessage: 'رمز عبور را وارد کنید',
      notice: 'حداقل 8 کاراکتر شامل حروف کوچک، بزرگ و اعداد'
    },
    {
      name: 'passwordRepeat',
      type: 'password',
      label: 'تکرار رمز عبور',
      pattern: {
        value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
        message: 'رمز عبور اشتباه وارد شده'
      },
      reqMessage: 'تکرار رمز عبور را وارد کنید',
      validate: ( value: string ) => value === getValues( 'password' ) || 'پسوزد یکسان نیست'
    },
  ]

  console.log( localStorage.getItem( 'templateNumber' ) )

  const onSubmit: SubmitHandler<SignUp> = ( data ) => {
    const templateNumber = localStorage.getItem( 'templateNumber' )
    console.log( data )
    const values = {...data, templateNumber}
    mutate( values, {
      onSuccess: ( res ) => {
        console.log( res )
        dispatch( {type: 'signIn'} )
        dispatch( {type: 'setFirstName', payload: res.data.firstName} )
        dispatch( {type: 'setLastName', payload: res.data.lastName} )
        dispatch( {type: 'setEmail', payload: res.data.email} )
        dispatch( {type: 'verify', payload: res.data.isVerified} )

        localStorage.setItem( 'resumeId', res.data.resumeId )
        navigate( '/resume-completion' )
      },
      onError: ( error ) => {
        if ( error.response?.status === 401 ) {
          setErrorMessage( 'حساب کاربری با این ایمیل وجود دارد' )
        }
        else {
          setErrorMessage( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
        }
      }
    } )
  };

  return (
    <Fragment>
      <div className="signup">
        <div className="container">
          <h3 className='mt-5 fw-bolder text-center'>ثبت نام</h3>
          <p className='text-danger text-center'>{errorMessage}</p>
          <form onSubmit={handleSubmit( onSubmit )} className='signup-form' noValidate>
            {
              signUpForm.map( props => {
                return (
                  <Fragment key={props.name}>
                    <Input
                      errors={errors}
                      {...register( props.name,
                        {
                          required: props.reqMessage,
                          pattern: props.pattern,
                          validate: props.validate
                        } )}
                      type={props.type}
                      name={props.name}
                      label={props.label}
                      notice={props.notice}
                    />
                  </Fragment>
                )
              } )
            }
            <Button size={'medium'} style={'solid'} borderRadius={'normal'}>ورود به رزومه ساز</Button>
          </form>
          {
            errorMessage === 'حساب کاربری با این ایمیل وجود دارد' &&
            <Fragment>
              <div className="text-center mt-2">
                <Link to='/signin'> ورود به حساب کاربری </Link>
              </div>
              <div className="text-center mt-2">
                <Link to='/signin'> ورود بدون رمز عبور </Link>
              </div>
            </Fragment>
          }
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
