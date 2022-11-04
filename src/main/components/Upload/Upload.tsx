import './Upload.scss'
import {Fragment, useCallback, useRef, useState} from 'react'
import BaseModalWrapper from '../Modal/BaseModalWrapper/BaseModalWrapper'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
// import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle'
import Cropper from 'react-easy-crop'
import {Point, Area} from 'react-easy-crop/types'
import {getCroppedImg} from './CanvasUtils'
import Resizer from "react-image-file-resizer";
import Button from '../Button/Button'
import {TbX} from 'react-icons/tb';
// import Button from '../Button/Button'
interface Props {
  shape: 'rect' | 'round'
  widthRate: number
  heightRate: number
  width: number
  height: number
  setImage: ( image: string ) => void
}

const Upload: React.FC<Props> = ( props ) => {
  const [image, setImage] = useState<string>();
  const [crop, setCrop] = useState<Point>( {x: 0, y: 0} )
  const [rotation, setRotation] = useState( 0 )
  const [zoom, setZoom] = useState( 1 )
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>( null )
  const imgRef = useRef<any>( null )
  const [isModalVisible, setIsModalVisible] = useState( false )
  const [imgTypeModal, setImgTypeModal] = useState( false )
  const [imageName, setImageName] = useState<string>( '' )
  const onCropComplete = useCallback(
    ( croppedArea: Area, croppedAreaPixels: Area ) => {
      setCroppedAreaPixels( croppedAreaPixels )
    },
    []
  );

  interface CropperFix extends React.Component {}
  const Cropped = ( Cropper as any ) as {
    new(): CropperFix;
  };

  const cropperProps: any = {
    image: image,
    cropShape: props.shape,
    crop: crop,
    zoom: zoom,
    aspect: props.widthRate / props.heightRate,
    minZoom: 1,
    zoomSpeed: .1,
    initialCroppedAreaPercentages: {width: 100, height: 100, x: 50, y: 50},
    onCropChange: setCrop,
    onZoomChange: setZoom,
    onCropComplete: onCropComplete,
    objectFit: "contain",
  }
  const toggleModalOn = () => {
    setIsModalVisible( true )
  }
  const toggleModalOff = () => {
    setIsModalVisible( false )
    imgRef.current.value = ""
  }

  const onChange = ( e: any ) => {
    if ( e.target.files[0].type !== 'image/png' && e.target.files[0].type !== 'image/jpeg' && e.target.files[0].type !== 'image/jpg' ) {
      setImgTypeModal( true )
    } else {
      let files: any;
      files = e.target.files;
      setImageName( files[0].name )
      const reader = new FileReader();
      reader.onload = () => {
        setImage( reader.result as any );
      };
      reader.readAsDataURL( files[0] );
      toggleModalOn()
    }
  };

  const showCroppedImage = useCallback( async () => {
    try {
      const croppedImage: any = await getCroppedImg(
        image,
        croppedAreaPixels,
      )
      Resizer.imageFileResizer(
        croppedImage,
        props.width,
        props.height,
        "png",
        100,
        0,
        ( uri ) => {
          props.setImage( uri.toString().slice( 22 ) )
        },
        "base64"
      );
    } catch ( e ) {
      console.error( e )
    }
  }, [image, croppedAreaPixels, rotation] )

  const toggleImageTypeModal = () => {
    setImgTypeModal( false )
  }

  const handleClick = () => {
    imgRef.current.click();
  };

  return (
    <Fragment>
      <input ref={imgRef} onChange={onChange} type="file" accept="image/*" hidden />
      <Button onClick={handleClick} size={'small'} style={'solid'} borderRadius={'normal'}>آپلود</Button>
      {/* {
        props.buttonType === 'main' ?
          <div className="upload">
            <div onClick={handleClick} className="d-flex justify-content-between">
              <div className=''>{props.children}</div>
              <div className='media-text'>
                {imageName}
              </div>
            </div>
          </div>
          :
          <div className="admin-upload">
            <div onClick={handleClick} className="admin-div text-center">
              <div className=''>
                {imageName ?
                  imageName
                  :
                  props.children
                }
              </div>
            </div>
          </div>
      } */}
      <BaseModalWrapper isModalVisible={isModalVisible} onBackdropClick={() => {}} >
        <div className="crop-modal p-4">
          <div className="fm-header d-flex justify-content-between border-bottom mb-1">
            <div className='d-flex'>
              <h6>تنظیمات</h6>
            </div>
            <TbX onClick={toggleModalOff} />
            {/* <FontAwesomeIcon onClick={toggleModalOff} className="fa" icon={faTimes} /> */}
          </div>
          <div className="fm-content">
            {
              <div className="crop-container d-block">
                <Cropped  {...cropperProps} />
              </div>
            }
          </div>
          <div className="d-flex mt-3 justify-content-between">
            <Button onClick={() => {showCroppedImage(); toggleModalOff()}} size={'small'} style={'solid'} borderRadius={'rounded-pill'}>تایید</Button>
            <Button onClick={toggleModalOff} size={'small'} style={'outline'} borderRadius={'rounded-pill'}>لغو</Button>
          </div>
        </div>
      </BaseModalWrapper>
      {/* <BaseModalWrapper isModalVisible={imgTypeModal} onBackdropClick={toggleImageTypeModal} small={true} >
        <div className="text-center m-3">
          <p className="mb-3">
            <FontAwesomeIcon className="ms-2 fa-lg text-danger" icon={faTimesCircle} />
            فقط فرمت های png، jpeg، jpg
          </p>
          <button onClick={toggleImageTypeModal} className="btn submit-buttun">
            متوجه ام
          </button>
        </div>
      </BaseModalWrapper> */}
    </Fragment>
  )
}

export default Upload
