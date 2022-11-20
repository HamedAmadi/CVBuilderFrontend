import './BirthDate.scss'
import {forwardRef, useState} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import {TbChevronLeft, TbChevronRight, TbChevronDown} from 'react-icons/tb';
import Skeleton from 'react-loading-skeleton';

type BirthDateProps = {
  setValue: ( arg0: string ) => void
  isLoading?: boolean
}

const monthList = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]

const BirthDate = forwardRef<any, BirthDateProps>( ( {setValue, isLoading, ...rest}, ref ) => {
  const [dateIsVisible, dateVisibleToggleHandler] = useState<boolean>( false )
  const [yearsIsVisible, yearVisibleToggleHandler] = useState<boolean>( false )
  const [year, yearHandler] = useState<number>( 1401 )

  let selectDataModalClasses = 'select-birth-date'
  if ( dateIsVisible ) {
    selectDataModalClasses = 'select-birth-date show'
  }
  const toggleDate = () => {
    dateVisibleToggleHandler( !dateIsVisible )
  }

  let selectYearModalClasses = 'select-year'
  if ( yearsIsVisible ) {
    selectYearModalClasses = 'select-year show'
  }
  const toggleYears = () => {
    yearVisibleToggleHandler( yearsIsVisible => !yearsIsVisible )
  }

  let backdrop;
  if ( dateIsVisible ) {
    backdrop = <Backdrop close={toggleDate} />;
  }

  const yearIncrease = () => {
    yearHandler( year => year + 1 )
  }
  const yearDecrease = () => {
    yearHandler( year => year - 1 )
  }

  const setYear = ( year: number ) => {
    yearHandler( year )
    toggleYears()
  }

  const setDate = ( month: string ) => {
    setValue( month + ' ' + year.toString() )
    toggleDate()
  }

  const yearList = Array.from( Array( 100 ).keys() ).map( i => (
    <div className='col-3' key={i}>
      <div className='years' onClick={() => setYear( 1401 - i )}>
        {1401 - i}
      </div>
    </div>
  ) )

  return (
    <div className="birth-date-wrapper">
      <label className="d-block fw-bold text-secondary mx-2">تاریخ تولد</label>
      {isLoading ? <Skeleton height='37px' borderRadius='10px' /> : <input onClick={toggleDate} className="text-input date-input" ref={ref} type='text' autoComplete="off" {...rest} />}
      <div className={selectDataModalClasses}>
        <div className="year-header d-flex justify-content-between w-100 border-bottom">
          <div className="d-flex justify-content-around mx-3">
            <div className='right-icon mx-2'>
              <TbChevronRight className="my-auto h-100" onClick={yearIncrease} />
            </div>
            <div className='left-icon mx-2'>
              <TbChevronLeft className="my-auto h-100" onClick={yearDecrease} />
            </div>
          </div>
          <div className="year mx-3" onClick={toggleYears}>
            {year}
            <TbChevronDown className="my-auto" />
          </div>
        </div>
        <div className={selectYearModalClasses}>
          <div className="row mx-0">
            {yearList}
          </div>
        </div>
        <div className="row mx-0">
          {
            monthList.map( month => (
              <div key={month} className="col-4 px-1">
                <div className="month text-center" onClick={() => setDate( month )}>
                  {month}
                </div>
              </div>
            ) )
          }
        </div>
      </div>
      {backdrop}
    </div>
  )
} )

export default BirthDate;
