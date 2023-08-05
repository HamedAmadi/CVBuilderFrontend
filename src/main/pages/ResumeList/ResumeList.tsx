import './ResumeList.scss'
import {FC} from "react";
import {Link} from "react-router-dom";
import Button from "../../UI Component/Button/Button";
import {useGetResumeList} from '../../hooks/resume-hooks';
import {useUserContext} from '../../context/UserContext';
import {Resume} from '../../PDF Templates/PDFTemplate6/PDFTemplate6';
import {TbPlus} from "react-icons/tb";
import Loading from '../../UI Component/Loading/Loading';
import ResumeCard from '../../components/ResumeCard/ResumeCard';

const ResumeList: FC = () => {
  const {state} = useUserContext()
  const {data, isLoading: ResumeListIsLoading} = useGetResumeList()
  console.log( 'resumeList' )
  console.log( data )
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
          <Link to='/choose-templates'><Button size={"small"} style={"solid"} borderRadius={"normal"}><TbPlus className="fw-bold ms-1" />ساخت رزومه جدید</Button></Link>
        </div>
        <div className="row">
          {
            data ? data.map( ( resume: Resume ) => {
              return (
                <div key={resume._id} className="col-lg-4 col-md-6 px-lg-4 my-4">
                  <ResumeCard resume={resume} />
                </div>
              )
            } )
              :
              <Loading />
          }
        </div>
      </div>
    </div>
  );
};

export default ResumeList;
