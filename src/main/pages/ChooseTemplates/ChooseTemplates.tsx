import './ChooseTemplates.scss'
import {Fragment, useState, useCallback} from "react";
import TemplateImage1 from '../../../assets/1-1.webp'
import TemplateImage2 from '../../../assets/2-1.webp'
import TemplateImage3 from '../../../assets/3-1.webp'
import TemplateImage4 from '../../../assets/4-1.webp'
import TemplateImage5 from '../../../assets/5-1.webp'
import TemplateImage6 from '../../../assets/6-1.webp'
import Button from "../../components/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import {useUserContext} from '../../context/UserContext';
import {useCreateResume} from '../../services/hooks/resume-hooks';
import toast from 'react-hot-toast';

const images = [
  TemplateImage1,
  TemplateImage2,
  TemplateImage3,
  TemplateImage4,
  TemplateImage5,
  TemplateImage6
];

const ChooseTemplates: React.FC = () => {
  const {state} = useUserContext()
  const navigate = useNavigate()
  const {mutate: crResume, isLoading: createResumeIsLoading} = useCreateResume()

  const selectTemplateHandler = ( templateId: number ) => {
    if ( !state.isSignIn ) {
      localStorage.setItem( 'templateNumber', templateId.toString() )
      navigate( '/signup' )
    }
    else {
      const templateNumber: string = templateId.toString()
      crResume( templateNumber, {
        onSuccess: ( res ) => {
          if ( res.isSuccess ) {
            localStorage.setItem( 'resumeId', res.resumeId )
            navigate( '/resume-completion' )
          }
          else {
            toast.error( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
          }
        }
      } )
    }
  }

  return (
    <Fragment>
      <div className="choose-templates">
        <div className="container">
          <h4 className="text-center mb-1 fw-bold">قالب رزومه خود را انتخاب کنید</h4>
          <p className="text-center mb-1">همچنین می توانید هنگام تکمیل رزومه و بعد از تکمیل رزومه قالب را تغییر دهید</p>
          <div className="row p-4">
            {
              images.map( ( src: string, index: number ) => (
                <div className="col-lg-4 col-md-6 px-lg-4 my-4" key={index}>
                  {/* <Link to='/signup' > */}
                  <div className="template-img" onClick={() => selectTemplateHandler( index + 1 )}>
                    <img className="w-100 m-auto" src={src} alt="template" />
                  </div>
                  {/* </Link> */}
                </div>
              ) )
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChooseTemplates;
