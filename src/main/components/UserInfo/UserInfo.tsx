import './UserInfo.scss'
import {FC, useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useUserContext} from "../../context/UserContext";
import {useCompleteProfile, useGetUserInfo} from "../../services/hooks/user-hooks";
import Button from "../../UI Component/Button/Button";
import Input from "../../UI Component/Input/Input";
import toast from 'react-hot-toast';

export interface UserInfo {
  firstName: string
  lastName: string
  email: string
}

const UserInfo: FC = () => {
  const {dispatch} = useUserContext()
  const {register, handleSubmit, reset, setValue, formState: {errors}} = useForm<UserInfo>();
  const {data: userInfo, isLoading: getIsLoading} = useGetUserInfo()
  const {mutate, isLoading: postIsLoading} = useCompleteProfile()

  useEffect( () => {
    if ( !getIsLoading ) {
      if ( userInfo ) {
        setValue( "firstName", userInfo.firstName )
        setValue( "lastName", userInfo.lastName )
        setValue( "email", userInfo.email )
        dispatch( {type: 'setEmail', payload: userInfo.email} )
        dispatch( {type: 'setFirstName', payload: userInfo.firstName} )
        dispatch( {type: 'setLastName', payload: userInfo.lastName} )
      }
    }
  }, [userInfo] )

  const onSubmit: SubmitHandler<UserInfo> = ( data ) => {
    mutate( data, {
      onSuccess: ( res ) => {
        toast.success( res.message )
      },
      onError: ( error ) => {
        if ( error.response?.status === 401 ) {
          toast.error( 'حساب کاربری با این ایمیل وجود دارد' )
        }
        else {
          toast.error( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
        }
      }
    } )
  };

  return (
    <div className="user-info">
      <form onSubmit={handleSubmit( onSubmit )} className='user-info-form' noValidate>
        <Input
          isLoading={getIsLoading}
          errors={errors}
          {...register( 'firstName' )}
          type='text'
          name='firstName'
          label='نام'
        />
        <Input
          isLoading={getIsLoading}
          errors={errors}
          {...register( 'lastName' )}
          type='text'
          name='lastName'
          label='نام خانوادگی'
        />
        <Input
          isLoading={getIsLoading}
          disabled
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
        <Button disabled={postIsLoading} size={'medium'} style={'solid'} borderRadius={'normal'}>
          {postIsLoading && <div className="spinner-border spinner-border-sm ms-2" role="status" />}
          ذخیره
        </Button>
      </form>
    </div>
  );
};

export default UserInfo;
