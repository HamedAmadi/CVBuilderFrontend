import './Select.scss'
import {forwardRef, useState} from "react";
import Backdrop from '../Backdrop/Backdrop';
import Skeleton from 'react-loading-skeleton';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  setValue: ( arg0: string ) => void
  label: string
  options: Option[]
  isLoading?: boolean
}

const Select = forwardRef<any, SelectProps>( ( {label, options, isLoading, setValue, ...rest}, ref ) => {
  const [optionsIsVisible, optionsToggleHandler] = useState<boolean>( false )

  let selectOptionsClasses = 'select-options'
  if ( optionsIsVisible ) {
    selectOptionsClasses = 'select-options show'
  }

  const toggleOptions = () => {
    optionsToggleHandler( !optionsIsVisible )
  }

  const select = ( value: string ) => {
    setValue( value )
    toggleOptions()
  }

  let backdrop;
  if ( optionsIsVisible ) {
    backdrop = <Backdrop close={toggleOptions} />;
  }

  return (
    <div className="custom-select">
      <label className="d-block fw-bold text-secondary mx-2">{label}</label>
      {isLoading ? <Skeleton height='37px' borderRadius='10px' /> : <input onClick={toggleOptions} className="text-input" ref={ref} type='text' {...rest} readOnly />}
      <div className={selectOptionsClasses}>
        <ul>
          {
            options.map( ( {label, value} ) => {
              return (
                <li key={value} onClick={() => select( value )}>
                  {label}
                </li>
              )
            } )
          }
        </ul>
      </div>
      {backdrop}
    </div>
  );
} );

export default Select;
