import './ResumeCompletion.scss'
import {FC, Fragment, useRef} from 'react';
import {lazyWithPreload} from "react-lazy-with-preload";
// const ChangeTemplate = lazyWithPreload( () => import( '../ChangeTemplate/ChangeTemplate' ) );
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import UserAboutUs from '../../components/UserAboutUs/UserAboutUs';
import EducationForm from '../../components/EducationForm/EducationForm';
import JobExperienceForm from '../../components/JobExperienceForm/JobExperienceForm';
import SocialMediaForm from '../../components/SocialMediaForm/SocialMediaForm';
import SkillForm from '../../components/SkillForm/SkillForm';
import LanguageForm from '../../components/LanguageForm/LanguageForm';
import CertificateForm from '../../components/CertificateForm/CertificateForm';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import Button from '../../UI Component/Button/Button';
import {Link} from 'react-router-dom';
import PdfEditViewer from '../../components/PdfEditViewer/PdfEditViewer';
import {useUserContext} from '../../context/UserContext';


const ResumeCompletion: FC = () => {
  const ref = useRef<HTMLDivElement | null>( null )
  const {state} = useUserContext()

  // useEffect( () => {
  //   ChangeTemplate.preload()
  // }, [] );

  const showRefElement = () => {
    const span = ref.current
    if ( span ) {
      span.className = 'modal-view'
    }
  }

  const hideRefElement = () => {
    const span = ref.current
    if ( span ) {
      span.className = 'd-none d-lg-block left-section'
    }
  }


  return (
    <Fragment>
      <div className="resume-complation">
        <div className="d-flex">
          <div className="right-section">
            {
              !state.isVerified &&
              <div className="warning-banner">
                <p className='mb-0'>لطفا ایمیل حساب کاربری خود را تایید نمایید.</p>
                <p className='mb-0 me-2'><Link to='/user-setting'>تنظیمات</Link></p>
              </div>
            }
            <div className="container">
              <h2 className='fw-bold mt-4 mb-2 text-center rc-title'>تکمیل رزومه</h2>
              <div className='d-flex justify-content-end mx-3'>
                <Link to='/resume-list'>
                  <Button size={'small'} style={'outline'} borderRadius={'rounded-pill'}>لیست رزومه ها</Button>
                </Link>
              </div>
              <div className="mx-md-3">
                <h4 className='fw-bold form-title'>اطلاعات شخصی</h4>
                <div className="form-wrapper">
                  <PersonalInfo />
                </div>
              </div>
              <div className="mx-md-3 mt-5">
                <h4 className='fw-bold form-title'>درباره من</h4>
                <div className="form-wrapper">
                  <UserAboutUs />
                </div>
              </div>
              <div className="mx-md-3 mt-5">
                <h4 className='fw-bold form-title'>تحصیلات</h4>
                <div className="form-wrapper">
                  <EducationForm />
                </div>
              </div>
              <div className="mx-md-3 mt-5">
                <h4 className='fw-bold form-title'>سوابق شغلی</h4>
                <div className="form-wrapper">
                  <JobExperienceForm />
                </div>
              </div>
              <div className="mx-md-3 mt-5">
                <h4 className='fw-bold form-title'>وبسایت و شبکه اجتماعی</h4>
                <div className="form-wrapper">
                  <SocialMediaForm />
                </div>
              </div>
              <div className="mx-md-3 mt-5">
                <h4 className='fw-bold form-title'>مهارت های کلیدی</h4>
                <div className="form-wrapper">
                  <SkillForm />
                </div>
              </div>
              <div className="mx-md-3 mt-5">
                <h4 className='fw-bold form-title'>زبان</h4>
                <div className="form-wrapper">
                  <LanguageForm />
                </div>
              </div>
              <div className="mx-md-3 mt-5">
                <h4 className='fw-bold form-title'>دوره و گواهینامه</h4>
                <div className="form-wrapper">
                  <CertificateForm />
                </div>
              </div>
              <div className="mx-md-3 mt-5">
                <h4 className='fw-bold form-title'>پروژه</h4>
                <div className="form-wrapper">
                  <ProjectForm />
                </div>
              </div>
            </div>
          </div>
          <div ref={ref} className="d-none d-lg-block left-section">
            <PdfEditViewer width={600} isChangeTemplate={false} />
            <div className="review-button d-lg-none">
              <Button size={'small'} style={'solid'} onClick={hideRefElement} borderRadius={'rounded-pill'}>خروج</Button>
            </div>
          </div>
        </div>
        <div className="review-button d-lg-none">
          <Button size={'small'} style={'solid'} onClick={showRefElement} borderRadius={'rounded-pill'}>پیش نمایش و دانلود</Button>
        </div>
      </div>
    </Fragment >
  )
};

export default ResumeCompletion;
