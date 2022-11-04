import {FC, Fragment, useEffect} from "react";
import {SubmitHandler, useForm, useFieldArray, FieldValues, FieldArray} from 'react-hook-form';
import {TbPlus} from "react-icons/tb";
import {useDeleteSocialMedia, useGetSocialMedia, useInsertSocialMedia} from "../../services/hooks/social-media-hooks";
import Button from "../Button/Button";
import DeleteButton from "../DeleteButton/DeleteButton";
import toast from 'react-hot-toast';

export interface SocialMediaItem {
  title: string
  link: string
  _id?: string
}

export interface SocialMedia {
  socialMediaItem: SocialMediaItem[]
  resumeId: string | null
};

const SocialMediaForm: FC = () => {
  const resumeId = localStorage.getItem( 'resumeId' )
  const {data: socialMediaItem, isLoading: getIsLoading} = useGetSocialMedia( resumeId )
  const {mutate, isLoading: insertIsLoading} = useInsertSocialMedia()
  const {mutate: Delete, isLoading: deleleteIsLoading} = useDeleteSocialMedia()
  const {register, handleSubmit, reset, control} = useForm<SocialMedia>( {
    mode: "onBlur"
  } );
  const {fields, append, remove} = useFieldArray( {
    name: "socialMediaItem",
    control
  } );

  // console.log( socialMedia )

  useEffect( () => {
    if ( !getIsLoading ) {
      reset()
      if ( socialMediaItem ) {
        socialMediaItem.map( ( socialMedia: SocialMediaItem ) => {
          append( {
            title: socialMedia.title,
            link: socialMedia.link,
            _id: socialMedia._id
          }, {
            focusIndex: -1
          } )
        } )
      }
    }
  }, [socialMediaItem] )

  const onSubmit: SubmitHandler<SocialMedia> = ( data ) => {
    const values = {...data, resumeId}
    mutate( values, {
      onSuccess: ( res ) => {
        if ( res.isSuccess ) {
          console.log( res )
          toast.success( res.message )
        }
        else {
          console.log( res )
          toast.error( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
        }
      }
    } )
    console.log( data )
  };

  const deleteSocialMedia = ( resumeId: string | null, socialMediaId: string | undefined ) => {
    const data = {resumeId, socialMediaId}
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
      <div className="social-media-form">
        <form onSubmit={handleSubmit( onSubmit )} className='mb-0' noValidate>
          {fields.map( ( field, index ) => {
            return (
              <div className="d-flex" key={field.id}>
                <DeleteButton onClick={() => {remove( index ); deleteSocialMedia( localStorage.getItem( 'resumeId' ), field._id )}} />
                <div className="row mb-4 w-100">
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary me-2">عنوان</label>
                      <input className="text-input" type='text' {...register( `socialMediaItem.${index}.title` as const )} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary me-2">لینک</label>
                      <input className="text-input" type='text' {...register( `socialMediaItem.${index}.link` as const )} />
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
                  title: '',
                  link: '',
                } )
              }
            >
              <TbPlus className="fw-bold ms-1" />
              شبکه اجتماعی جدید
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

export default SocialMediaForm
