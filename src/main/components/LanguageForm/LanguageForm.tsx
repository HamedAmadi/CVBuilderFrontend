import {FC, Fragment, useEffect} from "react";
import {SubmitHandler, useForm, useFieldArray} from 'react-hook-form';
import {TbPlus} from "react-icons/tb";
import {useDeleteLanguage, useGetLanguage, useInsertLanguage} from "../../services/hooks/language-hooks";
import Button from "../Button/Button";
import DeleteButton from "../DeleteButton/DeleteButton";
import Select from "../Select/Select";
import toast from 'react-hot-toast';

export interface LanguageItem {
  languageName: string
  level: string
  _id?: string
}

export interface Language {
  languageItem: LanguageItem[]
  resumeId: string | null
};

const levelOptions = [
  {value: 'مبتدی', label: 'مبتدی'},
  {value: 'پایین تر متوسط', label: 'پایین تر متوسط'},
  {value: 'متوسط', label: 'متوسط'},
  {value: 'بالا تر از متوسط', label: 'بالا تر از متوسط'},
  {value: 'پیشرفته', label: 'پیشرفته'},
  {value: 'زبان مادری', label: 'زبان مادری'},
]

const LanguageForm: FC = () => {
  const resumeId = localStorage.getItem( 'resumeId' )
  const {data: languageItem, isLoading: getIsLoading} = useGetLanguage( resumeId )
  const {mutate, isLoading: insertIsLoading} = useInsertLanguage()
  const {mutate: Delete, isLoading: deleleteIsLoading} = useDeleteLanguage()
  const {register, handleSubmit, setValue, reset, control} = useForm<Language>( {
    mode: "onBlur"
  } );
  const {fields, append, remove} = useFieldArray( {
    name: "languageItem",
    control
  } );

  useEffect( () => {
    if ( !getIsLoading ) {
      if ( languageItem ) {
        reset()
        languageItem.map( ( language: LanguageItem ) => {
          append( {
            languageName: language.languageName,
            level: language.level,
            _id: language._id
          }, {
            focusIndex: -1
          } )
        } )
      }
    }
  }, [languageItem] )

  const onSubmit: SubmitHandler<Language> = ( data ) => {
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

  const deleteLanguage = ( resumeId: string | null, languageId: string | undefined ) => {
    const data = {resumeId, languageId}
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
      <div className="language-form">
        <form onSubmit={handleSubmit( onSubmit )} className='mb-0' noValidate>
          {fields.map( ( field, index ) => {
            return (
              <div className="d-flex" key={field.id}>
                <DeleteButton onClick={() => {remove( index ); deleteLanguage( localStorage.getItem( 'resumeId' ), field._id )}} />
                <div className="row mb-4 w-100">
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary me-2">نام زبان</label>
                      <input className="text-input" type='text' {...register( `languageItem.${index}.languageName` as const )} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <Select label={'سطح'} options={levelOptions} setValue={( value ) => setValue( `languageItem.${index}.level` as const, value )} {...register( `languageItem.${index}.level` as const )} />
                    </div>
                  </div>
                </div>
              </div>
            )
          } )}
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="border-0 bg-transparent fw-bold p-0 text-primary"
              onClick={() =>
                append( {
                  languageName: '',
                  level: '',
                } )
              }
            >
              <TbPlus className="fw-bold ms-1" />
              زبان جدید
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

export default LanguageForm
