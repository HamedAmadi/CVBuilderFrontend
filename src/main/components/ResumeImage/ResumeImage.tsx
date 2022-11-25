import './ResumeImage.scss'
import {FC, Fragment, useState} from "react";
import Skeleton from 'react-loading-skeleton';

type Props = {
  src: string
}

const ResumeImage: FC<Props> = ( {src} ) => {
  const [loading, setLoading] = useState( true );

  const imageClasses = loading ? 'template-img d-none' : 'template-img'
  const skeletonClasses = loading ? 'img-skeleton' : 'd-none'

  return (
    <Fragment>
      <div className={skeletonClasses}>
        <Skeleton height='100%' />
      </div>
      <div className={imageClasses}>
        <img className='w-100 m-auto' src={src} alt="template" onLoad={() => setLoading( false )} />
      </div>
    </Fragment>
  );
};

export default ResumeImage;
