import './TemplatesView.scss'
import {Fragment, FC, useState, useCallback} from "react";
import ImageViewer from 'react-simple-image-viewer';
import TemplateImage1 from '../../../assets/1-1.png'
import TemplateImage2 from '../../../assets/2-1.png'
import TemplateImage3 from '../../../assets/3-1.png'
import TemplateImage4 from '../../../assets/4-1.png'
import TemplateImage5 from '../../../assets/5-1.png'
import TemplateImage6 from '../../../assets/6-1.png'
import Button from "../../components/Button/Button";
import {Link} from "react-router-dom";

const TemplatesView: FC = () => {
  const [currentImage, setCurrentImage] = useState( 0 );
  const [isViewerOpen, setIsViewerOpen] = useState( false );

  const openImageViewer = useCallback( ( index: number ) => {
    setCurrentImage( index );
    setIsViewerOpen( true );
  }, [] );

  const closeImageViewer = () => {
    setCurrentImage( 0 );
    setIsViewerOpen( false );
  };
  const images = [
    TemplateImage1,
    TemplateImage2,
    TemplateImage3,
    TemplateImage4,
    TemplateImage5,
    TemplateImage6
  ];
  return (

    <Fragment>
      <div className="templates">
        <div className="container">
          <h2 className="m-4 text-center fw-bolder mb-2">قالب های رزومه</h2>
          <p className="text-center mb-1">قالب خود را انتخاب کنید و رزومه دلخواهتان را بسازید</p>
          <p className="text-center mb-1">همچنین می توانید هنگام تکمیل رزومه و بعد از تکمیل رزومه قالب را تغییر دهید</p>
          <div className="row mt-3">
            {
              images.map( ( src: string, index: number ) => (
                <div className="col-lg-4 col-md-6 px-lg-4 my-3" key={index}>
                  <div className="template-img shadow">
                    <img className="w-100 py-3 px-4 m-auto bg-secondary" src={src} alt="template" />
                    <div className="d-flex justify-content-around py-3">
                      <Button size={"small"} style={"solid"} borderRadius={"rounded-pill"} onClick={() => openImageViewer( index )}>مشاهده قالب</Button>
                      <Link to="/signup">
                        <Button size={"small"} style={"outline"} borderRadius={"rounded-pill"}>استفاده از قالب</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) )
            }
          </div>
        </div>
      </div>
      <div dir="ltr">
        {isViewerOpen && (
          <ImageViewer
            src={images}
            currentIndex={currentImage}
            disableScroll={true}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />
        )}
      </div>
    </Fragment>
  )
};

export default TemplatesView;
