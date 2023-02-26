import './Input.scss'
import {forwardRef, Fragment} from "react";
import {FieldErrors, FieldErrorsImpl} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import Skeleton from 'react-loading-skeleton'


type Option = {
  label: string;
  value: string | number;
};

type InputProps = {
  type: string
  name: string
  label: string
  notice?: string
  reqMessage?: string
  patternMessage?: string
  errors: FieldErrors
  options?: Option[],
  isLoading?: boolean
}

const Input = forwardRef<any, InputProps>( ( {type, errors, name, label, notice, reqMessage, patternMessage, options, isLoading, ...rest}, ref ) => {
  switch ( type ) {
    case 'text': return (
      <Fragment>
        <div className='input-wrapper'>
          <div className="d-flex justify-content-between">
            <label className="d-block fw-bold text-secondary mx-2">{label}</label>
            <ErrorMessage
              errors={errors}
              name={name}
              render={( messages ) => {
                return (
                  <p className="error-message my-auto mx-0">{messages.message}</p>
                )
              }}
            />
          </div>
          {isLoading ? <Skeleton height='37px' borderRadius='10px' /> : <input className="text-input" ref={ref} type={'text'} name={name} {...rest} />}
        </div>
      </Fragment>
    );
    case 'email': return (
      <Fragment>
        <div className='input-wrapper'>
          <div className="d-flex justify-content-between">
            <label className="d-block fw-bold text-secondary mx-2">{label}</label>
            <ErrorMessage
              errors={errors}
              name={name}
              render={( messages ) => {
                return (
                  <p className="error-message my-auto mx-0">{messages.message}</p>
                )
              }}
            />
          </div>
          {isLoading ? <Skeleton height='37px' borderRadius='10px' /> : <input className="text-input" ref={ref} type={'email'} name={name} {...rest} />}
          {notice && <span className='notice'>{notice}</span>}
        </div>
      </Fragment>
    )
    case 'password': return (
      <Fragment>
        <div className='input-wrapper'>
          <div className="d-flex justify-content-between">
            <label className="d-block fw-bold text-secondary mx-2">{label}</label>
            <ErrorMessage
              errors={errors}
              name={name}
              render={( messages ) => {
                return (
                  <p className="error-message my-auto mx-0">{messages.message}</p>
                )
              }}
            />
          </div>
          {isLoading ? <Skeleton height='37px' borderRadius='10px' /> : <input className="text-input" ref={ref} type={'password'} name={name} {...rest} />}
          {notice && <span className='notice'>{notice}</span>}
        </div>
      </Fragment>
    )
    case 'textarea': return (
      <Fragment>
        <div className='input-wrapper'>
          <label className="d-block fw-bold text-secondary mx-2">{label}</label>
          {isLoading ? <Skeleton height='121px' borderRadius='10px' /> : <textarea className="text-input" ref={ref} name={name} {...rest} rows={5} />}
        </div>
      </Fragment>
    );
    default: return null
  }

} )

export default Input;
