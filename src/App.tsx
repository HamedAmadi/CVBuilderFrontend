import './App.scss'
import "bootstrap/scss/bootstrap.scss";
import 'react-loading-skeleton/dist/skeleton.css'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {FC, Suspense, lazy} from 'react';
import MainLayout from "./main/layout/MainLayout"
import Home from './main/pages/Home/Home';
import Loading from './main/UI Component/Loading/Loading';
import PrivateRoutes from './main/util/PrivateRoutes';
import {Toaster} from 'react-hot-toast';
import {useCheckSignIn} from './main/hooks/user-hooks';
const ResumeCompletion = lazy( () => import( './main/pages/ResumeCompletion/ResumeCompletion' ) );
const ChooseTemplates = lazy( () => import( './main/pages/ChooseTemplates/ChooseTemplates' ) );
const SignUp = lazy( () => import( './main/pages/SignUp/SignUp' ) );
const SignIn = lazy( () => import( './main/pages/SignIn/SignIn' ) );
const ResumeList = lazy( () => import( './main/pages/ResumeList/ResumeList' ) );
const SendEmail = lazy( () => import( './main/pages/SendEmail/SendEmail' ) );
const SignInWithoutPassword = lazy( () => import( './main/components/SignInWithoutPassword/SignInWithoutPassword' ) );
const UserSetting = lazy( () => import( './main/pages/UserSetting/UserSetting' ) );
const VerifyEmail = lazy( () => import( './main/components/VerifyEmail/VerifyEmail' ) );
const ChangeTemplate = lazy( () => import( './main/pages/ChangeTemplate/ChangeTemplate' ) );
const SendEmailForLogin = lazy( () => import( './main/pages/SendEmailForLogin/SendEmailForLogin' ) );

const App: FC = () => {
  useCheckSignIn()

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Suspense fallback={<Loading />}><Home /></Suspense>} />
          <Route path='/choose-templates' element={<Suspense fallback={<Loading />}><ChooseTemplates /></Suspense>} />
          <Route path='/signup' element={<Suspense fallback={<Loading />}><SignUp /></Suspense>} />
          <Route path='/signin' element={<Suspense fallback={<Loading />}><SignIn /></Suspense>} />
          <Route path='/send-email' element={<Suspense fallback={<Loading />}><SendEmail /></Suspense>} />
          <Route path='/send-email-for-login' element={<Suspense fallback={<Loading />}><SendEmailForLogin /></Suspense>} />
          <Route path='/signin-without-password/:token' element={<Suspense fallback={<Loading />}><SignInWithoutPassword /></Suspense>} />
          <Route element={<PrivateRoutes />}>
            <Route path='/resume-list' element={<Suspense fallback={<Loading />}><ResumeList /></Suspense>} />
            <Route path='/user-setting' element={<Suspense fallback={<Loading />}><UserSetting /></Suspense>} />
            <Route path='/verify-email/:token' element={<Suspense fallback={<Loading />}><VerifyEmail /></Suspense>} />
          </Route>
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/resume-completion/:resumeId' element={<Suspense fallback={<Loading />}><ResumeCompletion /></Suspense>} />
          <Route path='/change-template/:resumeId' element={<Suspense fallback={<Loading />}><ChangeTemplate /></Suspense>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
