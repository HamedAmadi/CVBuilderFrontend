import './Input.scss'
import {forwardRef, Fragment} from "react";
import {FieldErrorsImpl, FieldValues, useForm} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
  errors?: FieldErrorsImpl
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
                // console.log( messages )
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
                // console.log( messages )
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
                // console.log( messages )
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
    // case 'select': return (
    //   <Fragment>
    //     <div className='input-wrapper'>
    //       <label className="d-block fw-bold text-secondary mx-2">{label}</label>
    //       {/* <input className="text-input" ref={ref} name={name} {...rest} type="text" /> */}
    //       <select className="text-input" ref={ref} name={name} {...rest}>
    //         {options && options.map( ( {label, value} ) => (
    //           <option key={value} value={value}>
    //             {label}
    //           </option>
    //         ) )}
    //       </select>
    //     </div>
    //   </Fragment>
    // );
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

// const Input: React.FC<InputProps> = ( {type, error, name, register, label, notice} ) => {

//   switch ( type ) {
//     case 'text': return (
//       <Fragment>
//         <div className='input-wrapper'>
//           <label className="d-block fw-bold text-secondary">{label}</label>
//           {/* <input className="text-input" type="text" name={name} id={id} /> */}
//           <input className="text-input" />
//           {error && <span className='notice'>{notice}</span>}
//           {notice && <span className='notice'>{notice}</span>}
//         </div>
//       </Fragment>
//     );
//     case 'email': return (
//       <Fragment>
//         <div className='input-wrapper'>
//           <label className="d-block fw-bold text-secondary">{label}</label>
//           <input className="text-input" />
//           <span className='notice'>{notice}</span>
//         </div>
//       </Fragment>
//     )
//     case 'password': return (
//       <Fragment>
//         <div className='input-wrapper'>
//           <label className="d-block fw-bold text-secondary">{label}</label>
//           <input className="text-input" />
//           <span className='notice'>{notice}</span>
//         </div>
//       </Fragment>
//     )
//     default: return null
//   }
// };

export default Input;
