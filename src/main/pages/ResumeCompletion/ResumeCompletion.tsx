import './ResumeCompletion.scss'
import {FC, Fragment, useState} from 'react';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import UserAboutUs from '../../components/UserAboutUs/UserAboutUs';
import EducationForm from '../../components/EducationForm/EducationForm';
import JobExperienceForm from '../../components/JobExperienceForm/JobExperienceForm';
import SocialMediaForm from '../../components/SocialMediaForm/SocialMediaForm';
import SkillForm from '../../components/SkillForm/SkillForm';
import LanguageForm from '../../components/LanguageForm/LanguageForm';
import CertificateForm from '../../components/CertificateForm/CertificateForm';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import BaseModalWrapper from '../../components/Modal/BaseModalWrapper/BaseModalWrapper';
import Button from '../../components/Button/Button';
import {Link, useNavigate} from 'react-router-dom';
import PdfEditViewer from '../../components/PdfEditViewer/PdfEditViewer';
import {useGetResume} from '../../services/hooks/resume-hooks';
import {useUserContext} from '../../context/UserContext';
import Skeleton from 'react-loading-skeleton';


const ResumeCompletion: FC = () => {
  const navigate = useNavigate()
  const {state} = useUserContext()
  const {data: resume, isLoading: getIsLoading, isError} = useGetResume( localStorage.getItem( 'resumeId' ) )
  const [isModalVisible, setIsModalVisible] = useState( false )

  const toggleModal = () => {
    setIsModalVisible( wasModalVisible => !wasModalVisible )
  }

  if ( localStorage.getItem( 'resumeId' ) === null || isError ) {
    navigate( '/resume-list' )
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
          <div className="d-none d-lg-block left-section">
            {getIsLoading ? <Skeleton borderRadius={0} className='left-section-skeleton' width='100%' height='100%'></Skeleton> : <PdfEditViewer templateNumber={resume.templateNumber} resume={resume} width={600} isChangeTemplate={false} />}
            {/* <Skeleton borderRadius={0} width='100%' height='100%'></Skeleton> */}
          </div>
        </div>
        <div className="review-button d-lg-none">
          <Button size={'small'} style={'solid'} onClick={toggleModal} borderRadius={'rounded-pill'}>پیش نمایش و دانلود</Button>
        </div>
        <BaseModalWrapper isModalVisible={isModalVisible} isPdfModal={true} onBackdropClick={toggleModal}>
          {getIsLoading ? <Skeleton borderRadius={0} width='100%' height='100%'></Skeleton> : <PdfEditViewer templateNumber={resume.templateNumber} resume={resume} width={600} isChangeTemplate={false} />}
          <div className="review-button d-lg-none">
            <Button size={'small'} style={'solid'} onClick={toggleModal} borderRadius={'rounded-pill'}>خروج</Button>
          </div>
        </BaseModalWrapper>
      </div>
    </Fragment >
  )
};

export default ResumeCompletion;
