import './ResumeList.scss'
import {FC} from "react";
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button";
import {useDeleteResume, useGetResumeList} from '../../services/hooks/resume-hooks';
import PdfViewerAsImage from '../../components/PdfViewerAsImage/PdfViewerAsImage';
import {useUserContext} from '../../context/UserContext';
import {Resume} from '../../components/PDFTemplate6/PDFTemplate6';
import Skeleton from 'react-loading-skeleton';


const ResumeList: FC = () => {
  const {state} = useUserContext()
  const {data, isLoading: ResumeListIsLoading} = useGetResumeList()
  const {mutate: delResume, isLoading: deleteResumeIsLoading} = useDeleteResume()

  const deleteResume = ( resumeId: string ) => {
    delResume( resumeId, {
      onSuccess: ( res ) => {
        console.log( res )
      },
      onError: ( err ) => {
        console.log( err )
      }
    } )
  }

  return (
    <div className="resume-list">
      {
        !state.isVerified &&
        <div className="warning-banner">
          <p className='mb-0'>لطفا ایمیل حساب کاربری خود را تایید نمایید.</p>
          <p className='mb-0 me-2'><Link to='/user-setting'>تنظیمات</Link></p>
        </div>
      }
      <div className="container">
        <div className="d-flex justify-content-between mt-4 mb-3 pb-2 border-bottom">
          <h3 className='fw-bold'>رزومه ها</h3>
          <Link to='/choose-templates'><Button size={"small"} style={"solid"} borderRadius={"normal"}>+ ساخت رزومه جدید</Button></Link>
        </div>
        <div className="row">
          {
            data && data.map( ( resume: Resume ) => {
              return (
                <div key={resume._id} className="col-lg-4 col-md-6 px-lg-4 my-3">
                  <div className="template-img mx-auto shadow">
                    {ResumeListIsLoading ? <Skeleton height='100%' width='100%' /> : <PdfViewerAsImage templateNumber={parseInt( resume.templateNumber )} resume={resume} width={600} />}
                    <div className="d-flex justify-content-around py-3">
                      <Button onClick={() => deleteResume( resume._id )} size={"small"} style={"outline"} borderRadius={"rounded-pill"}>حذف</Button>
                      <Link to="/resume-completion">
                        <Button size={"small"} style={"solid"} borderRadius={"rounded-pill"} onClick={() => {localStorage.setItem( 'resumeId', resume._id )}}>ویرایش</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            } )
          }
        </div>
      </div>
    </div>
  );
};

export default ResumeList;
