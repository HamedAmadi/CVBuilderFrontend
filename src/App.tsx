import './App.scss'
import "bootstrap/scss/bootstrap.scss";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {FC, lazy, Suspense, useEffect, ComponentType} from 'react';
import {useUserContext} from './main/context/UserContext';
import {useCheckSignIn} from './main/services/hooks/user-hooks';
import {checkSignIn} from './main/services/apis/auth-api';
import MainLayout from "./main/layout/MainLayout"
import Home from './main/pages/Home/Home';
// import ResumeCompletion from './main/pages/ResumeCompletion/ResumeCompletion';
// import ChooseTemplates from './main/pages/ChooseTemplates/ChooseTemplates';
// import SignUp from './main/pages/SignUp/SignUp';
// import SignIn from './main/pages/SignIn/SignIn';
// import ResumeList from './main/pages/ResumeList/ResumeList';
// import SendEmail from './main/pages/SendEmail/SendEmail';
// import SignInWithoutPassword from './main/components/SignInWithoutPassword/SignInWithoutPassword';
// import UserSetting from './main/pages/UserSetting/UserSetting';
// import VerifyEmail from './main/components/VerifyEmail/VerifyEmail';
// import ChangeTemplate from './main/pages/ChangeTemplate/ChangeTemplate';
// import SendEmailForLogin from './main/pages/SendEmailForLogin/SendEmailForLogin';
import {lazyWithPreload} from "react-lazy-with-preload";
import Loading from './main/components/Loading/Loading';
// const Home = lazyWithPreload( () => import( './main/pages/Home/Home' ) );
// const MainLayout = lazyWithPreload( () => import( './main/layout/MainLayout' ) );
const ResumeCompletion = lazyWithPreload( () => import( './main/pages/ResumeCompletion/ResumeCompletion' ) );
const ChooseTemplates = lazyWithPreload( () => import( './main/pages/ChooseTemplates/ChooseTemplates' ) );
const SignUp = lazyWithPreload( () => import( './main/pages/SignUp/SignUp' ) );
const SignIn = lazyWithPreload( () => import( './main/pages/SignIn/SignIn' ) );
const ResumeList = lazyWithPreload( () => import( './main/pages/ResumeList/ResumeList' ) );
const SendEmail = lazyWithPreload( () => import( './main/pages/SendEmail/SendEmail' ) );
const SignInWithoutPassword = lazyWithPreload( () => import( './main/components/SignInWithoutPassword/SignInWithoutPassword' ) );
const UserSetting = lazyWithPreload( () => import( './main/pages/UserSetting/UserSetting' ) );
const VerifyEmail = lazyWithPreload( () => import( './main/components/VerifyEmail/VerifyEmail' ) );
const ChangeTemplate = lazyWithPreload( () => import( './main/pages/ChangeTemplate/ChangeTemplate' ) );
const SendEmailForLogin = lazyWithPreload( () => import( './main/pages/SendEmailForLogin/SendEmailForLogin' ) );

const App: FC = () => {
  const {data: userDetail, isLoading} = useCheckSignIn()
  const {state, dispatch} = useUserContext()

  console.log( userDetail )
  console.log( state )
  useEffect( () => {
    ResumeCompletion.preload()
    ChooseTemplates.preload()
    SignUp.preload()
    SignIn.preload()
    ResumeList.preload()
    SendEmail.preload()
    SignInWithoutPassword.preload()
    UserSetting.preload()
    VerifyEmail.preload()
    ChangeTemplate.preload()
    SendEmailForLogin.preload()
  }, [] );

  useEffect( () => {
    if ( !isLoading ) {
      if ( userDetail.isSuccess ) {
        console.log( 'useEffect' )
        dispatch( {type: 'signIn'} )
        dispatch( {type: 'setEmail', payload: userDetail.email} )
        dispatch( {type: 'verify', payload: userDetail.verified} )
        if ( userDetail.firstName ) {
          dispatch( {type: 'setFirstName', payload: userDetail.firstName} )
        }
        if ( userDetail.lastName ) {
          dispatch( {type: 'setLastName', payload: userDetail.lastName} )
        }
      }
      else {
        console.log( 'user not signed in' )
      }
    }
  }, [userDetail] );

  // console.log( isLoading )
  // console.log( userDetail )

  if ( isLoading ) return null


  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        {userDetail.isSuccess || state.isSignIn ?
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/choose-templates' element={<ChooseTemplates />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/resume-list' element={<ResumeList />} />
              <Route path='/send-email' element={<SendEmail />} />
              <Route path='/send-email-for-login' element={<SendEmailForLogin />} />
              <Route path='/user-setting' element={<UserSetting />} />
              <Route path='/signin-without-password/:token' element={<SignInWithoutPassword />} />
              <Route path='/verify-email/:token' element={<VerifyEmail />} />
            </Route>
            <Route path='/resume-completion' element={<ResumeCompletion />} />
            <Route path='/change-template' element={<ChangeTemplate />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          :
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/choose-templates' element={<ChooseTemplates />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/send-email-for-login' element={<SendEmailForLogin />} />
              <Route path='/signin-without-password/:token' element={<SignInWithoutPassword />} />
              <Route path='*' element={<Navigate to="/" />} />
            </Route>
          </Routes>
        }
      </Suspense>
    </BrowserRouter>
  )
}

export default App
