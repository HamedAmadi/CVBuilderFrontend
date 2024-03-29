import './ChangePassword.scss'
import {FC, Fragment, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useChangePassword} from "../../hooks/user-hooks";
import Button from "../../UI Component/Button/Button";
import Input from "../../UI Component/Input/Input";
import toast, {Toaster} from 'react-hot-toast';

export interface ChangePassword {
  password: string
  passwordRepeat: string
}

const ChangePassword: FC = () => {
  const {register, handleSubmit, reset, getValues, formState: {errors}} = useForm<ChangePassword>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const {mutate, isLoading} = useChangePassword()
  const onSubmit: SubmitHandler<ChangePassword> = ( data ) => {
    mutate( data, {
      onSuccess: ( res ) => {
        toast.success( res.message )
        reset()
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
    <div className="change-password">
      {/* <Toaster /> */}
      <div className="container">
        <p className='text-danger text-center'>{errorMessage}</p>
        <form onSubmit={handleSubmit( onSubmit )} className='change-password-form' noValidate>
          <Input
            errors={errors}
            {...register( 'password',
              {
                required: 'رمز عبور را وارد کنید',
                pattern: {
                  value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                  message: 'رمز عبور اشتباه وارد شده'
                },
              } )}
            type='password'
            name='password'
            label='رمز عبور'
            notice='حداقل 8 کاراکتر شامل حروف کوچک، بزرگ، اعداد و یک کاراکتر خاص'
          />
          <Input
            errors={errors}
            {...register( 'passwordRepeat',
              {
                required: 'تکرار رمز عبور را وارد کنید',
                pattern: {
                  value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                  message: 'رمز عبور اشتباه وارد شده'
                },
                validate: ( value: string ) => value === getValues( 'password' ) || 'رمز های عبور یکسان نیستند'
              } )}
            type='password'
            name='passwordRepeat'
            label='تکرار رمز عبور'
          />
          <Button disabled={isLoading} size={'medium'} style={'solid'} borderRadius={'normal'}>
            {isLoading && <div className="spinner-border spinner-border-sm ms-2" role="status" />}
            تغییر رمز عبور
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
