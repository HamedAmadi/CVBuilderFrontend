import {FC, Fragment, useEffect} from "react";
import {SubmitHandler, useForm, useFieldArray} from 'react-hook-form';
import {TbPlus} from "react-icons/tb";
import {useDeleteProject, useGetProject, useInsertProject} from "../../hooks/project-hooks";
import Button from "../../UI Component/Button/Button";
import DeleteButton from "../../UI Component/DeleteButton/DeleteButton";
import SelectDate from '../../UI Component/SelectDate/SelectDate';
import toast from 'react-hot-toast';
import {useParams} from "react-router-dom";

export interface ProjectItem {
  title: string
  employer: string
  link: string
  startDate: string
  endDate: string
  description?: string
  _id?: string
}

export interface Project {
  projectItem: ProjectItem[]
  resumeId?: string
};

const ProjectForm: FC = () => {
  const {resumeId} = useParams()
  const {data: projectItem, isLoading: getIsLoading} = useGetProject( resumeId )
  const {mutate, isLoading: insertIsLoading} = useInsertProject()
  const {mutate: Delete, isLoading: deleleteIsLoading} = useDeleteProject()
  const {register, handleSubmit, reset, control, setValue} = useForm<Project>( {
    mode: "onBlur"
  } );
  const {fields, append, remove} = useFieldArray( {
    name: "projectItem",
    control
  } );

  useEffect( () => {
    if ( !getIsLoading ) {
      if ( projectItem ) {
        reset()
        projectItem.map( ( project: ProjectItem ) => {
          append( {
            title: project.title,
            employer: project.employer,
            link: project.link,
            startDate: project.startDate,
            endDate: project.endDate,
            description: project.description,
            _id: project._id
          }, {
            focusIndex: -1
          } )
        } )
      }
    }
  }, [projectItem] )

  const onSubmit: SubmitHandler<Project> = ( data ) => {
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

  const deleteProject = ( resumeId: string | undefined, projectId: string | undefined ) => {
    const data = {resumeId, projectId}
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
                <DeleteButton onClick={() => {remove( index ); deleteProject( resumeId, field._id )}} />
                <div className="row mb-4">
                  <div className="col-12">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary">عنوان</label>
                      <input className="text-input" type={'text'} {...register( `projectItem.${index}.title` as const )} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary">کارفرما</label>
                      <input className="text-input" type={'text'} {...register( `projectItem.${index}.employer` as const )} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary">لینک</label>
                      <input className="text-input" type={'text'} {...register( `projectItem.${index}.link` as const )} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary">تاریخ شروع پروژه</label>
                      <div className="d-flex justify-content-between">
                        <SelectDate setValue={( value ) => setValue( `projectItem.${index}.startDate`, value )} {...register( `projectItem.${index}.startDate` as const )} placeholder='ار تاریخ' />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary">تاریخ پایان پروژه</label>
                      <div className="d-flex justify-content-between">
                        <SelectDate setValue={( value ) => setValue( `projectItem.${index}.endDate`, value )} {...register( `projectItem.${index}.endDate` as const )} placeholder='تا تاریخ' />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className='input-wrapper'>
                      <label className="d-block fw-bold text-secondary">توضیحات</label>
                      <textarea className="text-input" {...register( `projectItem.${index}.description` as const )} rows={5} />
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
                  employer: '',
                  link: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                } )
              }
            >
              <TbPlus className="fw-bold ms-1" />
              پروژه جدید
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

export default ProjectForm
