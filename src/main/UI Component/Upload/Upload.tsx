import './Upload.scss'
import {Fragment, useCallback, useRef, useState} from 'react'
import BaseModalWrapper from '../Modal/BaseModalWrapper/BaseModalWrapper'
import Cropper from 'react-easy-crop'
import {Point, Area} from 'react-easy-crop/types'
import {getCroppedImg} from './CanvasUtils'
import Resizer from "react-image-file-resizer";
import Button from '../Button/Button'
import {TbX} from 'react-icons/tb';
import toast from 'react-hot-toast'
interface Props {
  shape: 'rect' | 'round'
  widthRate: number
  heightRate: number
  width: number
  height: number
  setImage: ( image: string ) => void
}

const Upload: React.FC<Props> = ( props ) => {
  console.log( 'upload' )
  const [image, setImage] = useState<string>();
  const [crop, setCrop] = useState<Point>( {x: 0, y: 0} )
  const [rotation, setRotation] = useState( 0 )
  const [zoom, setZoom] = useState( 1 )
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>( null )
  const imgRef = useRef<any>( null )
  const [isModalVisible, setIsModalVisible] = useState( false )
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
      toast.error( 'فقط فرمت های png، jpeg، jpg' )
    } else {
      let files: any;
      files = e.target.files;
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

  const handleClick = () => {
    imgRef.current.click();
  };

  return (
    <Fragment>
      <input ref={imgRef} onChange={onChange} type="file" accept="image/*" hidden />
      <Button onClick={handleClick} size={'small'} style={'solid'} borderRadius={'normal'}>آپلود</Button>
      <BaseModalWrapper isModalVisible={isModalVisible} onBackdropClick={() => {}} >
        <div className="crop-modal p-4">
          <div className="fm-header d-flex justify-content-between border-bottom mb-1">
            <div className='d-flex'>
              <h6>تنظیمات</h6>
            </div>
            <TbX onClick={toggleModalOff} />
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
    </Fragment>
  )
}

export default Upload
