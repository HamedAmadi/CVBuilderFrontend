import {FC, Fragment, useEffect, useState} from 'react';
import './PersonalInfo.scss'
import Image from '../../../assets/images.png'
import Button from '../Button/Button';
import Input from '../Input/Input';
import {FieldValues, SubmitHandler, useForm, ValidationRule} from 'react-hook-form';
import Upload from '../Upload/Upload';
import {useGetBasicInformation, useInsertBasicInformation} from '../../services/hooks/information-hooks';
import BirthDate from '../BirthDate/BirthDate';
import Select from '../Select/Select';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import toast, {Toaster} from 'react-hot-toast';
import {Navigate, useNavigate} from 'react-router-dom';

export interface BasicInformation {
  firstName: string
  lastName: string
  email: string
  jobTitle: string
  mobileNumber: string
  birthDate: string
  soldieringStatus: string
  maritalStatus: string
  city: string
  address: string
  userImageBase64: string | undefined
  resumeId: string | null
}

const maritalOptions = [
  {value: '', label: ' '},
  {value: 'مجرد', label: 'مجرد'},
  {value: 'متاهل', label: 'متاهل'},
]

const soldieringOptions = [
  {value: '', label: ' '},
  {value: 'مشمول', label: 'مشمول'},
  {value: 'در حال خدمت', label: 'در حال خدمت'},
  {value: 'معاف', label: 'معاف'},
  {value: 'معافیت تحصیلی', label: 'معافیت تحصیلی'},
  {value: 'معافیت غیر پزشکی', label: 'معافیت غیر پزشکی'},
  {value: 'معافیت پزشکی', label: 'معافیت پزشکی'},
  {value: 'پایان خدمت', label: 'پایان خدمت'},
]

const PersonalInfo: FC = () => {
  // const navigate = useNavigate()
  const resumeId = localStorage.getItem( 'resumeId' )
  const {data: basicInformation, isLoading: getIsLoading, isError} = useGetBasicInformation( resumeId )
  const [userImageBase64, setProfileBase64String] = useState<string | undefined>();
  const {mutate, isLoading: insertIsLoading} = useInsertBasicInformation()
  const {register, handleSubmit, setValue, formState: {errors}} = useForm<BasicInformation>();

  const setProfileImage = ( image: string ) => {
    setProfileBase64String( image )
  }

  useEffect( () => {
    if ( !getIsLoading ) {
      if ( basicInformation ) {
        setValue( "firstName", basicInformation.firstName )
        setValue( "lastName", basicInformation.lastName )
        setValue( "email", basicInformation.email )
        setValue( "jobTitle", basicInformation.jobTitle )
        setValue( "mobileNumber", basicInformation.mobileNumber )
        setValue( "soldieringStatus", basicInformation.soldieringStatus )
        setValue( "maritalStatus", basicInformation.maritalStatus )
        setValue( "birthDate", basicInformation.birthDate )
        setValue( "city", basicInformation.city )
        setValue( "address", basicInformation.address )
        setProfileBase64String( basicInformation.userImageBase64 )
      }
    }
  }, [basicInformation] )

  const onSubmit: SubmitHandler<BasicInformation> = ( data ) => {
    const values = {...data, userImageBase64, resumeId}
    console.log( values )
    mutate( values, {
      onSuccess: ( res ) => {
        if ( res.isSuccess ) {
          toast.success( res.message )
        }
        else {
          console.log( res )
          toast.error( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
        }
      }
    } )
  };
  return (
    <Fragment>
      <Toaster />
      <div className="personal-info-form">
        <div className="image-uploader row">
          <div className="col-md-3">
            {getIsLoading ?
              <Skeleton
                height="112px"
                width='112px'
                containerClassName="avatar-skeleton"
              />
              :
              userImageBase64 ?
                <img src={`data:image/jpg;base64,${userImageBase64}`} alt="profile-picture" />
                :
                <img src={Image} alt="profile-picture" />
            }
          </div>
          <div className="col-md-9">
            <div className="me-md-3 mt-2">
              <div className="image-uploader-text">
                <h6 className="fw-bold">عکس خود را آپلود کنید</h6>
                <p>فقط فرمت jpg , jpeg و png</p>
              </div>
              <div className="d-inline-block mx-auto">
                <div className="ms-2 d-inline-block">
                  <Upload shape={'rect'} widthRate={1} heightRate={1} width={100} height={100} setImage={setProfileImage} />
                </div>
                <div className="d-inline-block">
                  <Button onClick={() => setProfileBase64String( undefined )} size={'small'} style={'outline'} borderRadius={'normal'}>حذف</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit( onSubmit )} className='mt-3 mb-0' noValidate>
          <div className="row">
            <div className="col-md-6">
              <Input
                isLoading={getIsLoading}
                errors={errors}
                {...register( "firstName" )}
                type="text"
                label="نام"
              />
            </div>
            <div className="col-md-6">
              <Input
                isLoading={getIsLoading}
                errors={errors}
                {...register( "lastName" )}
                type="text"
                label="نام خانوادگی"
              />
            </div>
            <div className="col-md-6">
              <Input
                isLoading={getIsLoading}
                errors={errors}
                {...register( "jobTitle" )}
                type="text"
                label="عنوان شغلی / تخصص"
              />
            </div>
            <div className="col-md-6">
              <Input
                isLoading={getIsLoading}
                errors={errors}
                {...register( "email",
                  {
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: 'ایمیل اشتباه وارد شده'
                    },
                  } )}
                type="email"
                label="ایمیل"
              />
            </div>
            <div className="col-md-6">
              <Input
                isLoading={getIsLoading}
                errors={errors}
                {...register( "mobileNumber",
                  {
                    pattern: {
                      value: /^09-?[0-9]{9}$/,
                      message: 'شماره موبایل اشتباه وارد شده'
                    }
                  } )}
                type="text"
                label="شماره موبایل"
              />
            </div>
            <div className="col-md-6">
              <div className="input-wrapper">
                <BirthDate isLoading={getIsLoading} setValue={( value ) => setValue( `birthDate`, value )} {...register( 'birthDate' )} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-wrapper">
                <Select isLoading={getIsLoading} label={'وضعیت تاهل'} options={maritalOptions} setValue={( value ) => setValue( `maritalStatus`, value )} {...register( 'maritalStatus' )} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-wrapper">
                <Select isLoading={getIsLoading} label={'وضعیت سربازی'} options={soldieringOptions} setValue={( value ) => setValue( `soldieringStatus`, value )} {...register( 'soldieringStatus' )} />
              </div>
            </div>
            <div className="col-md-6">
              <Input
                isLoading={getIsLoading}
                errors={errors}
                {...register( "city" )}
                type="text"
                label="شهر"
              />
            </div>
            <div className="col-md-6">
              <Input
                isLoading={getIsLoading}
                errors={errors}
                {...register( "address" )}
                type="text"
                label="آدرس"
              />
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button disabled={insertIsLoading} size={'small'} style={'solid'} borderRadius={'normal'}>
              {insertIsLoading && <div className="spinner-border spinner-border-sm ms-2" role="status" />}
              ثبت
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  )
};

export default PersonalInfo;
