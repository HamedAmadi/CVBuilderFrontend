import {FC, Fragment, useEffect} from "react";
import {SubmitHandler, useForm, useFieldArray} from 'react-hook-form';
import {TbPlus} from "react-icons/tb";
import {useDeleteJobExperience, useInsertJobExperience, useJobExperience} from "../../hooks/job-experience-hooks";
import Button from "../../UI Component/Button/Button";
import DeleteButton from "../../UI Component/DeleteButton/DeleteButton";
import SelectDate from '../../UI Component/SelectDate/SelectDate';
import toast from 'react-hot-toast';
import {useParams} from "react-router-dom";

export interface JobExperienceItem {
  jobPosition: string
  companyName: string
  city: string
  startDate: string
  endDate: string
  _id?: string
}

export interface JobExperience {
  jobExperienceItem: JobExperienceItem[]
  resumeId?: string
};

const JobExperienceForm: FC = () => {
  const {resumeId} = useParams()
  const {data: jobExperienceItem, isLoading: getIsLoading} = useJobExperience( resumeId )
  const {mutate, isLoading: insertIsLoading} = useInsertJobExperience()
  const {mutate: Delete, isLoading: deleleteIsLoading} = useDeleteJobExperience()
  const {register, handleSubmit, reset, control, setValue} = useForm<JobExperience>( {
    mode: "onBlur"
  } );
  const {fields, append, remove} = useFieldArray( {
    name: "jobExperienceItem",
    control
  } );

  useEffect( () => {
    if ( !getIsLoading ) {
      if ( jobExperienceItem ) {
        reset()
        jobExperienceItem.map( ( jobExperienceItem: JobExperienceItem ) => {
          append( {
            jobPosition: jobExperienceItem.jobPosition,
            companyName: jobExperienceItem.companyName,
            city: jobExperienceItem.city,
            startDate: jobExperienceItem.startDate,
            endDate: jobExperienceItem.endDate,
            _id: jobExperienceItem._id
          }, {
            focusIndex: -1
          } )
        } )
      }
    }
  }, [jobExperienceItem] )

  const onSubmit: SubmitHandler<JobExperience> = ( data ) => {
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

  const deleteJobExperience = ( resumeId: string | undefined, jobExperienceId: string | undefined ) => {
    const data = {resumeId, jobExperienceId}
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
      <form onSubmit={handleSubmit( onSubmit )} className='mb-0' noValidate>
        {fields.map( ( field, index ) => {
          return (
            <div className="d-flex" key={field.id}>
              <DeleteButton onClick={() => {remove( index ); deleteJobExperience( resumeId, field._id )}} />
              <div className="row mb-4">
                <div className="col-12">
                  <div className='input-wrapper'>
                    <label className="d-block fw-bold text-secondary me-2">عنوان شغلی / سمت</label>
                    <input className="text-input" type={'text'} {...register( `jobExperienceItem.${index}.jobPosition` as const )} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='input-wrapper'>
                    <label className="d-block fw-bold text-secondary me-2">نام شزکت / سازمان</label>
                    <input className="text-input" type={'text'} {...register( `jobExperienceItem.${index}.companyName` as const )} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='input-wrapper'>
                    <label className="d-block fw-bold text-secondary me-2">شهر</label>
                    <input className="text-input" type={'text'} {...register( `jobExperienceItem.${index}.city` as const )} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='input-wrapper'>
                    <label className="d-block fw-bold text-secondary me-2">تاریخ شروع اشتغال</label>
                    <div className="d-flex justify-content-between">
                      <SelectDate setValue={( value ) => setValue( `jobExperienceItem.${index}.startDate`, value )} {...register( `jobExperienceItem.${index}.startDate` as const )} placeholder='ار تاریخ' />
                      {/* <SelectDate setValue={( value ) => setValue( `jobExperienceItem.${index}.endDate`, value )} {...register( `jobExperienceItem.${index}.endDate` as const )} placeholder='تا تاریخ' /> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='input-wrapper'>
                    <label className="d-block fw-bold text-secondary me-2">تاریخ پایان اشتغال</label>
                    <div className="d-flex justify-content-between">
                      {/* <SelectDate setValue={( value ) => setValue( `jobExperienceItem.${index}.startDate`, value )} {...register( `jobExperienceItem.${index}.startDate` as const )} placeholder='ار تاریخ' /> */}
                      <SelectDate setValue={( value ) => setValue( `jobExperienceItem.${index}.endDate`, value )} {...register( `jobExperienceItem.${index}.endDate` as const )} placeholder='تا تاریخ' />
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
                jobPosition: '',
                companyName: '',
                city: '',
                startDate: '',
                endDate: '',
              } )
            }
          >
            <TbPlus className="fw-bold ms-1" />
            سابقه شغلی جدید
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
    </Fragment>
  );
};

export default JobExperienceForm
