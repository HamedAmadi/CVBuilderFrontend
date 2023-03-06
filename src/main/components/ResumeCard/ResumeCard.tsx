import {FC} from "react";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import {Resume} from "../../PDF Templates/PDFTemplate6/PDFTemplate6";
import {useDeleteResume} from "../../hooks/resume-hooks";
import Button from "../../UI Component/Button/Button";
import PdfViewerAsImage from "../PdfViewerAsImage/PdfViewerAsImage";

type Props = {
  resume: Resume
}

const ResumeCard: FC<Props> = ( {resume} ) => {
  const {mutate: delResume, isLoading: deleteResumeIsLoading} = useDeleteResume()


  const deleteResume = ( resumeId: string ) => {
    delResume( resumeId, {
      onSuccess: ( res ) => {
        if ( res.isSuccess ) {
          toast.success( res.message )
        }
        else (
          toast.error( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
        )
      },
      onError: () => {
        toast.error( 'خطایی در سرور رخ داده است! لطفا مجددا تلاش کنید' )
      }
    } )
  }

  return (
    <div className="template-img mx-auto shadow">
      {/* {ResumeListIsLoading ? <Skeleton height='100%' width='100%' /> : <PdfViewerAsImage templateNumber={parseInt( resume.templateNumber )} resume={resume} width={600} />} */}
      <PdfViewerAsImage templateNumber={parseInt( resume.templateNumber )} resume={resume} width={600} />
      <div className="d-flex justify-content-around py-3">
        <Button disabled={deleteResumeIsLoading} onClick={() => deleteResume( resume._id )} size={"small"} style={"outline"} borderRadius={"rounded-pill"}>
          حذف
        </Button>
        <Link to={`/resume-completion/${resume._id}`}>
          <Button size={"small"} style={"solid"} borderRadius={"rounded-pill"}>ویرایش</Button>
        </Link>
      </div>
    </div>
  );
};

export default ResumeCard;
