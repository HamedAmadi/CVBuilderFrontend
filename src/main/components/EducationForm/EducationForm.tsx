import {FC, Fragment, useEffect} from "react";
import {SubmitHandler, useForm, useFieldArray} from 'react-hook-form';
import {TbPlus} from "react-icons/tb";
import {useDeleteEducation, useGetEducation, useInsertEducation} from "../../hooks/education-hooks";
import Button from "../../UI Component/Button/Button";
import DeleteButton from "../../UI Component/DeleteButton/DeleteButton";
import SelectDate from '../../UI Component/SelectDate/SelectDate';
import toast from 'react-hot-toast';
import {useParams} from "react-router-dom";
import Input from "../../UI Component/Input/Input";

export interface EducationItem {
  degree: string
  study: string
  university: string
  startDate: string
  endDate: string
  _id?: string
}

export interface Education {
  educationItem: EducationItem[];
  resumeId: string | undefined
};

const EducationForm: FC = () => {
  const {resumeId} = useParams()
  const {data: educationItem, isLoading: getIsLoading} = useGetEducation( resumeId )
  const {mutate, isLoading: insertIsLoading} = useInsertEducation()
  const {mutate: Delete, isLoading: deleleteIsLoading} = useDeleteEducation()
  const {register, handleSubmit, reset, control, setValue, formState: {errors}} = useForm<Education>( {
    mode: "onBlur"
  } );
  const {fields, append, remove} = useFieldArray( {
    name: "educationItem",
    control
  } );

  useEffect( () => {
    if ( !getIsLoading ) {
      if ( educationItem ) {
        reset()
        educationItem.map( ( education: EducationItem ) => {
          append( {
            degree: education.degree,
            study: education.study,
            university: education.university,
            startDate: education.startDate,
            endDate: education.endDate,
            _id: education._id
          }, {
            focusIndex: -1
          } )
        } )
      }
    }
  }, [educationItem] )

  const onSubmit: SubmitHandler<Education> = ( data ) => {
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

  const deleteCertificate = ( resumeId: string | undefined, educationId: string | undefined ) => {
    const data = {resumeId, educationId}
    Delete( data, {
      onSuccess: ( res ) => {
        if ( res.isSuccess ) {
          toast.success( res.message )
        } else if ( !res.isSuccess ) {
          toast.error( res.message )
        } else {
          toast.error( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
        }
      }
    } )
  }

  return (
    <Fragment>
      <div className="education-form">
        <form onSubmit={handleSubmit( onSubmit )} className='mb-0' noValidate>
          {fields.map( ( field, index ) => {
            return (
              <div className="d-flex" key={field.id}>
                <DeleteButton onClick={() => {remove( index ); deleteCertificate( resumeId, field._id )}} />
                <div className="row mb-4">
                  <div className="col-12">
                    <Input  {...register( `educationItem.${index}.study` as const )} type={"text"} name={`educationItem.${index}.study` as const} label={"رشته تحصیلی"} errors={errors} />
                    {/* <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary me-2">رشته تحصیلی</label>
                      <input className="text-input" type={'text'} {...register( `educationItem.${index}.study` as const )} />
                    </div> */}
                  </div>
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary me-2">مقطع تحصیلی</label>
                      <input className="text-input" type={'text'} {...register( `educationItem.${index}.degree` as const )} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary me-2">دانشگاه</label>
                      <input className="text-input" type={'text'} {...register( `educationItem.${index}.university` as const )} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary me-2">تاریخ شروع تحصیل</label>
                      <div className="d-flex justify-content-between">
                        <SelectDate setValue={( value ) => setValue( `educationItem.${index}.startDate`, value )} {...register( `educationItem.${index}.startDate` as const )} placeholder='ار تاریخ' />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary me-2">تاریخ پایان تحصیل</label>
                      <div className="d-flex justify-content-between">
                        <SelectDate setValue={( value ) => setValue( `educationItem.${index}.endDate`, value )} {...register( `educationItem.${index}.endDate` as const )} placeholder='تا تاریخ' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          } )}
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="border-0 bg-transparent p-0 fw-bold text-primary"
              onClick={() =>
                append( {
                  study: '',
                  university: '',
                  startDate: '',
                  endDate: '',
                  degree: '',
                } )
              }
            >
              <TbPlus className="fw-bold ms-1" />
              سابقه تحصیلی جدید
            </button>
            {
              fields.length !== 0 &&
              <Button disabled={insertIsLoading} size={'small'} style={'solid'} borderRadius={'normal'}>
                {insertIsLoading && <div className="spinner-border spinner-border-sm ms-2" role="status" />}
                ثبت
              </Button>
            }
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default EducationForm
