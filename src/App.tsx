import './App.scss'
import "bootstrap/scss/bootstrap.scss";
import MainLayout from "./main/layout/MainLayout"
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from './main/pages/Home/Home';
import ResumeCompletion from './main/pages/ResumeCompletion/ResumeCompletion';
import ChooseTemplates from './main/pages/ChooseTemplates/ChooseTemplates';
import SignUp from './main/pages/SignUp/SignUp';
import SignIn from './main/pages/SignIn/SignIn';
import ResumeList from './main/pages/ResumeList/ResumeList';
import PdfAsImage from './main/components/PdfEditViewer/PdfEditViewer';
import SendEmail from './main/pages/SendEmail/SendEmail';
import SignInWithoutPassword from './main/components/SignInWithoutPassword/SignInWithoutPassword';
import UserSetting from './main/pages/UserSetting/UserSetting';
import VerifyEmail from './main/components/VerifyEmail/VerifyEmail';
import {useUserContext} from './main/context/UserContext';
import {useCheckSignIn} from './main/services/hooks/user-hooks';
import {FC, lazy, Suspense, useEffect} from 'react';
// import PdfWrapper from './main/pages/PdfWrapper/PdfWrapper';
import ChangeTemplate from './main/pages/ChangeTemplate/ChangeTemplate';
import SendEmailForLogin from './main/pages/SendEmailForLogin/SendEmailForLogin';
// import {checkSignIn} from './main/services/apis/auth-api';
// const ResumeCompletion = lazy( () => import( './main/pages/ResumeCompletion/ResumeCompletion' ) );
// const ChooseTemplates = lazy( () => import( './main/pages/ChooseTemplates/ChooseTemplates' ) );
// const SignUp = lazy( () => import( './main/pages/SignUp/SignUp' ) );
// const SignIn = lazy( () => import( './main/pages/SignIn/SignIn' ) );
// const ResumeList = lazy( () => import( './main/pages/ResumeList/ResumeList' ) );
// const SendEmail = lazy( () => import( './main/pages/SendEmail/SendEmail' ) );
// const SignInWithoutPassword = lazy( () => import( './main/components/SignInWithoutPassword/SignInWithoutPassword' ) );
// const UserSetting = lazy( () => import( './main/pages/UserSetting/UserSetting' ) );
// const VerifyEmail = lazy( () => import( './main/components/VerifyEmail/VerifyEmail' ) );

// be mola ke

const App: FC = () => {
  const {data: userDetail, isLoading} = useCheckSignIn()
  const {state, dispatch} = useUserContext()

  console.log( userDetail )
  console.log( state )
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
        // </Suspense>
        :
        // <Suspense fallback={<div>Loading...</div>}>
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
    </BrowserRouter>
  )
}

export default App
