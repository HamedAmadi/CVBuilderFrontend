import './ChangeTemplate.scss';
import {FC, useState} from 'react';
import TemplateImage1 from '../../../assets/1-1.webp'
import TemplateImage2 from '../../../assets/2-1.webp'
import TemplateImage3 from '../../../assets/3-1.webp'
import TemplateImage4 from '../../../assets/4-1.webp'
import TemplateImage5 from '../../../assets/5-1.webp'
import TemplateImage6 from '../../../assets/6-1.webp'
import PdfEditViewer from '../../components/PdfEditViewer/PdfEditViewer';
import {useChangeTemplate} from '../../hooks/resume-hooks';
import {TbX} from 'react-icons/tb';
import {Link, useNavigate, useParams} from 'react-router-dom';
import SideDrawer from '../../UI Component/SideDrawer/SideDrawer';
import Backdrop from '../../UI Component/Backdrop/Backdrop';
import Button from '../../UI Component/Button/Button';
import toast, {Toaster} from 'react-hot-toast';

const images = [
  TemplateImage1,
  TemplateImage2,
  TemplateImage3,
  TemplateImage4,
  TemplateImage5,
  TemplateImage6
];

const ChangeTemplate: FC = () => {
  const {resumeId} = useParams()
  const [sideDrawerShow, setSideDrawerShow] = useState<boolean>( false );
  const {mutate: changeTemplate, isLoading: changeTemplateIsLoading} = useChangeTemplate()


  const sideDrawerToggle = () => {
    setSideDrawerShow( !sideDrawerShow )
  }

  const ChangeTemplateHandler = ( templateNumber: string ) => {
    setSideDrawerShow( false )
    changeTemplate( {resumeId, templateNumber}, {
      onSuccess: ( res ) => {
        if ( res.isSuccess ) {
          toast.success( res.message )
        }
        else {
          toast.error( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
        }
      },
      onError: ( err ) => {
        toast.error( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
      }
    } )
  }

  let backdrop;
  if ( sideDrawerShow ) {
    backdrop = <Backdrop close={() => {setSideDrawerShow( false )}} />;
  }

  return (
    <div className="change-template">
      {/* <Toaster /> */}
      <div className="change-template-header">
        <div className="side-drawer-btn my-auto d-lg-none">
          <Button onClick={sideDrawerToggle} size={'small'} style={'solid'} borderRadius={'normal'}>قالب ها</Button>
        </div>
        <div className="close-btn">
          <Link to={`/resume-completion/${resumeId}`}><TbX /></Link>
        </div>
      </div>
      <div className="change-template-body">
        <div className="right-section">
          <div className="row mx-0">
            {
              images.map( ( src: string, index: number ) => (
                <div className="col-6" key={index}>
                  <div className="template-img" onClick={() => ChangeTemplateHandler( ( index + 1 ).toString() )}>
                    <img className="w-100 m-auto" src={src} alt="template" />
                  </div>
                </div>
              ) )
            }
          </div>
        </div>
        <div className="left-section">
          <div className="pdf-wrapper">
            <PdfEditViewer width={1600} isChangeTemplate={true} />
          </div>
        </div>
      </div>
      <SideDrawer show={sideDrawerShow}>
        {
          images.map( ( src: string, index: number ) => (
            <div key={index}>
              <div className="template-img" onClick={() => ChangeTemplateHandler( ( index + 1 ).toString() )}>
                <img className="w-100 m-auto" src={src} alt="template" />
              </div>
            </div>
          ) )
        }
      </SideDrawer>
      {backdrop}
    </div>
  );
};

export default ChangeTemplate;
