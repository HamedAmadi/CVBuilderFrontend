import React, {FC, Fragment, useEffect} from "react";
import {useUserContext} from "../context/UserContext";
import {useCheckSignIn} from "../hooks/user-hooks";

const CheckSignIn: FC = () => {
  const {data: userDetail, isLoading} = useCheckSignIn()
  const {dispatch} = useUserContext()


  useEffect( () => {
    if ( userDetail ) {
      if ( userDetail.isSuccess ) {
        dispatch( {type: 'signIn', payload: true} )
        dispatch( {type: 'setEmail', payload: userDetail.email} )
        dispatch( {type: 'verify', payload: userDetail.verified} )
        if ( userDetail.firstName ) {
          dispatch( {type: 'setFirstName', payload: userDetail.firstName} )
        }
        if ( userDetail.lastName ) {
          dispatch( {type: 'setLastName', payload: userDetail.lastName} )
        }
      }
      else if ( !userDetail.isSuccess ) {
        dispatch( {type: 'signIn', payload: false} )
      }
    }
  }, [userDetail] );
  return ( <Fragment></Fragment> );
};

export default CheckSignIn;
