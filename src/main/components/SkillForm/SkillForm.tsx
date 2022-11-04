import {FC, Fragment, useEffect} from "react";
import {SubmitHandler, useForm, useFieldArray} from 'react-hook-form';
import {TbPlus} from "react-icons/tb";
import {useDeleteSkill, useGetSkill, useInsertSkill} from "../../services/hooks/skill-hooks";
import Button from "../Button/Button";
import DeleteButton from "../DeleteButton/DeleteButton";
import Select from "../Select/Select";
import toast from 'react-hot-toast';

export interface SkillItem {
  skillName: string
  level: string
  _id?: string
}

export interface Skill {
  skillItem: SkillItem[]
  resumeId: string | null
};

const levelOptions = [
  {value: 'درحال یادگیری', label: 'درحال یادگیری'},
  {value: 'کم تجربه', label: 'کم تجربه'},
  {value: 'تسلط نسبی', label: 'تسلط نسبی'},
  {value: 'تسلط کامل', label: 'تسلط کامل'},
  {value: 'حرفه ای', label: 'حرفه ای'},
]


const SkillForm: FC = () => {
  const resumeId = localStorage.getItem( 'resumeId' )
  const {data: skillItem, isLoading: getIsLoading} = useGetSkill( resumeId )
  const {mutate, isLoading: insertIsLoading} = useInsertSkill()
  const {mutate: Delete, isLoading: deleleteIsLoading} = useDeleteSkill()
  const {register, handleSubmit, setValue, reset, control} = useForm<Skill>( {
    mode: "onBlur"
  } );
  const {fields, append, remove} = useFieldArray( {
    name: "skillItem",
    control
  } );

  // console.log( skill )

  useEffect( () => {
    if ( !getIsLoading ) {
      if ( skillItem ) {
        reset()
        skillItem.map( ( skill: SkillItem ) => {
          append( {
            skillName: skill.skillName,
            level: skill.level,
            _id: skill._id
          }, {
            focusIndex: -1
          } )
        } )
      }
    }
  }, [skillItem] )

  const onSubmit: SubmitHandler<Skill> = ( data ) => {
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
  };

  const deleteSkill = ( resumeId: string | null, skillId: string | undefined ) => {
    const data = {resumeId, skillId}
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
      <div className="skill-form">
        <form onSubmit={handleSubmit( onSubmit )} className='mb-0' noValidate>
          {fields.map( ( field, index ) => {
            return (
              <div className="d-flex" key={field.id}>
                <DeleteButton onClick={() => {remove( index ); deleteSkill( localStorage.getItem( 'resumeId' ), field._id )}} />
                <div className="row mb-4 w-100">
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary me-2">نام مهارت</label>
                      <input className="text-input" type='text' {...register( `skillItem.${index}.skillName` as const )} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <Select label={'سطح'} options={levelOptions} setValue={( value ) => setValue( `skillItem.${index}.level` as const, value )} {...register( `skillItem.${index}.level` as const )} />
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
                  skillName: '',
                  level: '',
                } )
              }
            >
              <TbPlus className="fw-bold ms-1" />
              مهارت جدید
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

export default SkillForm
