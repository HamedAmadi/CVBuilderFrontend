import {FC, Fragment, useEffect} from "react";
import {SubmitHandler, useForm, useFieldArray} from 'react-hook-form';
import {TbPlus} from "react-icons/tb";
import {useDeleteCertificate, useGetCertificate, useInsertCertificate} from "../../services/hooks/certificate-hooks";
import Button from "../../UI Component/Button/Button";
import DeleteButton from "../../UI Component/DeleteButton/DeleteButton";
import SelectDate from '../../UI Component/SelectDate/SelectDate';
import toast from 'react-hot-toast';
import {useParams} from "react-router-dom";

export interface CertificateItem {
  certificateName: string
  institution: string
  startDate: string
  endDate: string
  _id?: string
}

export interface Certificate {
  certificateItem: CertificateItem[]
  resumeId?: string
};

const CertificateForm: FC = () => {
  const {resumeId} = useParams()
  const {data: certificateItem, isLoading: getIsLoading} = useGetCertificate( resumeId )
  const {mutate, isLoading: insertIsLoading} = useInsertCertificate()
  const {mutate: Delete, isLoading: deleleteIsLoading} = useDeleteCertificate()
  const {register, handleSubmit, reset, control, setValue} = useForm<Certificate>( {
    mode: "onBlur"
  } );
  const {fields, append, remove} = useFieldArray( {
    name: "certificateItem",
    control
  } );


  useEffect( () => {
    if ( !getIsLoading ) {
      if ( certificateItem ) {
        reset()
        certificateItem.map( ( certificate: CertificateItem ) => {
          append( {
            certificateName: certificate.certificateName,
            institution: certificate.institution,
            startDate: certificate.startDate,
            endDate: certificate.endDate,
            _id: certificate._id
          }, {
            focusIndex: -1
          } )
        } )
      }
    }
  }, [certificateItem] )

  const onSubmit: SubmitHandler<Certificate> = ( data ) => {
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

  const deleteCertificate = ( resumeId: string | undefined, certificateId: string | undefined ) => {
    const data = {resumeId, certificateId}
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
      <div>
        <form onSubmit={handleSubmit( onSubmit )} className='mb-0' noValidate>
          {fields.map( ( field, index ) => {
            return (
              <div className="d-flex" key={field.id}>
                <DeleteButton onClick={() => {remove( index ); deleteCertificate( resumeId, field._id )}} />
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary">عنوان گواهینامه</label>
                      <input className="text-input" type={'text'} {...register( `certificateItem.${index}.certificateName` as const )} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary">نام موسسه</label>
                      <input className="text-input" type={'text'} {...register( `certificateItem.${index}.institution` as const )} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary">تاریخ شروع دوره</label>
                      <div className="d-flex justify-content-between">
                        <SelectDate setValue={( value ) => setValue( `certificateItem.${index}.startDate`, value )} {...register( `certificateItem.${index}.startDate` as const )} placeholder='ار تاریخ' />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary">تاریخ پایان دوره</label>
                      <div className="d-flex justify-content-between">
                        <SelectDate setValue={( value ) => setValue( `certificateItem.${index}.endDate`, value )} {...register( `certificateItem.${index}.endDate` as const )} placeholder='تا تاریخ' />
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
                  certificateName: '',
                  institution: '',
                  startDate: '',
                  endDate: '',
                } )
              }
            >
              <TbPlus className="fw-bold ms-1" />
              دوره و گواهینامه جدید
            </button>
            {fields.length !== 0 && <Button disabled={insertIsLoading} size={'small'} style={'solid'} borderRadius={'normal'}>
              {insertIsLoading && <div className="spinner-border spinner-border-sm ms-2" role="status" />}
              ثبت
            </Button>}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default CertificateForm
