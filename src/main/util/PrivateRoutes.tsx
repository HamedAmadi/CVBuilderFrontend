import {FC} from "react";
import {Navigate, Outlet} from 'react-router-dom'
import {useUserContext} from "../context/UserContext";
import Loading from "../UI Component/Loading/Loading";

const PrivateRoutes: FC = () => {
  const {state} = useUserContext()
  if ( state.isSignIn === null ) return <Loading />

  return (
    state.isSignIn ? <Outlet /> : <Navigate to='/' />
  );
};

export default PrivateRoutes;
