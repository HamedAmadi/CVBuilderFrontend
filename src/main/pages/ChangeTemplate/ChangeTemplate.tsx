import './ChangeTemplate.scss';
import {FC, useState} from 'react';
import TemplateImage1 from '../../../assets/MyTemplateImage1.png'
import TemplateImage2 from '../../../assets/2-1.png'
import TemplateImage3 from '../../../assets/3-1.png'
import TemplateImage4 from '../../../assets/4-1.png'
import TemplateImage5 from '../../../assets/5-1.png'
import TemplateImage6 from '../../../assets/6-1.png'
import PdfEditViewer from '../../components/PdfEditViewer/PdfEditViewer';
import {useChangeTemplate, useGetResume} from '../../services/hooks/resume-hooks';
import {TbX} from 'react-icons/tb';
import {Link, useNavigate} from 'react-router-dom';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Backdrop from '../../components/Backdrop/Backdrop';
import Button from '../../components/Button/Button';
import Skeleton from 'react-loading-skeleton';

const images = [
  TemplateImage1,
  TemplateImage2,
  TemplateImage3,
  TemplateImage4,
  TemplateImage5,
  TemplateImage6
];

const ChangeTemplate: FC = () => {
  const navigate = useNavigate()
  const [sideDrawerShow, setSideDrawerShow] = useState<boolean>( false );
  const {data: resume, isLoading: getIsLoading, isError} = useGetResume( localStorage.getItem( 'resumeId' ) )
  const {mutate: changeTemplate, isLoading: changeTemplateIsLoading} = useChangeTemplate()

  const sideDrawerToggle = () => {
    setSideDrawerShow( !sideDrawerShow )
  }

  const ChangeTemplateHandler = ( templateNumber: string ) => {
    setSideDrawerShow( false )
    const resumeId = localStorage.getItem( 'resumeId' )
    changeTemplate( {resumeId, templateNumber}, {
      onSuccess: ( res ) => {
        console.log( res )
      },
      onError: ( err ) => {
        console.log( err )
      }
    } )
  }

  let backdrop;
  if ( sideDrawerShow ) {
    backdrop = <Backdrop close={() => {setSideDrawerShow( false )}} />;
  }

  if ( localStorage.getItem( 'resumeId' ) === null || isError ) {
    navigate( '/resume-list' )
  }

  return (
    <div className="change-template">
      <div className="change-template-header">
        <div className="side-drawer-btn my-auto d-lg-none">
          <Button onClick={sideDrawerToggle} size={'small'} style={'solid'} borderRadius={'normal'}>قالب ها</Button>
        </div>
        <div className="close-btn">
          <Link to="/resume-completion"><TbX /></Link>
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
            {/* {getIsLoading ? <Skeleton borderRadius={0} width='100%' height='100%'></Skeleton> : <PdfEditViewer templateNumber={resume.templateNumber} resume={resume} width={1600} isChangeTemplate={true} />} */}
            {!getIsLoading && <PdfEditViewer templateNumber={resume.templateNumber} resume={resume} width={1600} isChangeTemplate={true} />}
            {/* <Skeleton borderRadius={0} width='100%' height='100%'></Skeleton> */}
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
