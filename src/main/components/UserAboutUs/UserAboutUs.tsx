import {FC, Fragment, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {useParams} from 'react-router-dom';
import {useGetAboutMe, useInsertAboutMe} from '../../hooks/about-me-hooks';
import Button from '../../UI Component/Button/Button';
import Input from '../../UI Component/Input/Input';
import './UserAboutUs.scss'

export interface UserAboutUs {
  description: string
  resumeId?: string
}

const UserAboutUs: FC = () => {
  const {resumeId} = useParams()
  const {data: aboutMe, isLoading: getIsLoading} = useGetAboutMe( resumeId )
  const {register, handleSubmit, setValue, formState: {errors}} = useForm<UserAboutUs>();
  const {mutate, isLoading: insertIsLoading} = useInsertAboutMe()


  useEffect( () => {
    if ( !getIsLoading ) {
      if ( aboutMe ) {
        setValue( "description", aboutMe.description )
      }
    }
  }, [aboutMe] )

  const onSubmit: SubmitHandler<UserAboutUs> = ( data ) => {
    const values = {...data, resumeId}
    mutate( values, {
      onSuccess: ( res ) => {
        if ( res.isSuccess ) {
          toast.success( res.message )
        }
        else {
          toast.error( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
        }
      }
    } )
  };
  return (
    <Fragment>
      <div className="user-about-us">
        <form onSubmit={handleSubmit( onSubmit )} className='mt-3 mb-0' noValidate>
          <Input isLoading={getIsLoading} {...register( 'description' )} type={'textarea'} name={'description'} label={'خلاصه‌ای از تجربه شخصی و اهداف کاری یا تحصیلی'} errors={errors} />
          <div className="d-flex justify-content-end mt-3">
            <Button disabled={insertIsLoading} size={'small'} style={'solid'} borderRadius={'normal'}>
              {insertIsLoading && <div className="spinner-border spinner-border-sm ms-2" role="status" />}
              ثبت
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default UserAboutUs;
