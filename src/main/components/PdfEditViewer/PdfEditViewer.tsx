import './PdfEditViewer.scss'
import {BlobProvider, PDFDownloadLink} from "@react-pdf/renderer";
import {FC, Fragment, memo, useCallback, useMemo, useState} from "react";
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack5';
import PDFTemplate1 from '../../PDF Templates/PDFTemplate1/PDFTemplate1';
import PDFTemplate2 from '../../PDF Templates/PDFTemplate2/PDFTemplate2';
import PDFTemplate3 from '../../PDF Templates/PDFTemplate3/PDFTemplate3';
import PDFTemplate4 from "../../PDF Templates/PDFTemplate4/PDFTemplate4";
import PDFTemplate5 from '../../PDF Templates/PDFTemplate5/PDFTemplate5';
import PDFTemplate6 from "../../PDF Templates/PDFTemplate6/PDFTemplate6";
import Button from '../../UI Component/Button/Button';
import {TbChevronRight, TbChevronLeft, TbMaximize} from 'react-icons/tb';
import {Link, useParams} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import {useGetResume} from '../../services/hooks/resume-hooks';



type PdfAsImageProps = {
  width: number
  isChangeTemplate: boolean
}

const PdfEditViewer: FC<PdfAsImageProps> = ( props ) => {
  const {resumeId} = useParams()
  const {data: resume, isLoading: getIsLoading} = useGetResume( resumeId )
  const [numPages, setNumPages] = useState<number>( 1 );
  const [pageNumber, setPageNumber] = useState( 1 );

  const onDocumentLoadSuccess = ( {numPages}: any ) => {
    setNumPages( numPages )
  }

  const previousPage = () => {
    setPageNumber( pageNumber - 1 );
  }

  const nextPage = () => {
    setPageNumber( pageNumber + 1 );
  }
  const components = [
    <PDFTemplate1 resume={resume} />,
    <PDFTemplate2 resume={resume} />,
    <PDFTemplate3 resume={resume} />,
    <PDFTemplate4 resume={resume} />,
    <PDFTemplate5 resume={resume} />,
    <PDFTemplate6 resume={resume} />,
  ]

  const Component = resume && components[resume.templateNumber - 1]



  if ( getIsLoading ) return <Skeleton style={{borderRadius: 0, lineHeight: 'unset'}} baseColor='#6c7d6d' highlightColor='#59665a' height='100%' />

  return (
    <Fragment>
      <div className="pdf-edit-viewer">
        <div className="container h-100">
          <div className="d-flex mt-3 justify-content-between">
            <Link className='change-template-btn' to={`/change-template/${resumeId}`}>
              <Button size={'small'} style={'solid'} borderRadius={'normal'}>تغییر قالب</Button>
            </Link>
            {resume &&
              <PDFDownloadLink className='me-auto ms-0' document={Component} fileName="Resume.pdf">
                <Button size={'small'} style={'solid'} borderRadius={'normal'}>دانلود</Button>
              </PDFDownloadLink>}
          </div>
          <div className="pdf-wrapper-x">
            <div className='pdf-arrow-buttons d-flex mb-2'>
              <div className="d-flex mx-auto">
                <button
                  type="button"
                  disabled={pageNumber >= numPages}
                  onClick={nextPage}
                >
                  <TbChevronRight className="" />
                </button>
                <div className="page-number">
                  {numPages} / {pageNumber}
                </div>
                <button
                  type="button"
                  disabled={pageNumber <= 1}
                  onClick={previousPage}
                >
                  <TbChevronLeft className="" />
                </button>
              </div>
            </div>
            {resume &&
              <BlobProvider document={Component}>
                {( {url} ) => {
                  return (
                    <Fragment>
                      <Document
                        file={url}
                        loading={<div className='pdf-skeleton'><Skeleton height='100%' /></div>}
                        noData={<div className='pdf-skeleton'><Skeleton height='100%' /></div>}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        {
                          !props.isChangeTemplate &&
                          <Link to={`/change-template/${resumeId}`}>
                            <div className='pdf-view-button mx-auto'>
                              <div className="svg-wrapper">
                                <TbMaximize />
                              </div>
                            </div>
                          </Link>
                        }
                        <Page width={props.width}
                          renderAnnotationLayer={false}
                          renderTextLayer={false}
                          pageNumber={pageNumber}
                        />
                      </Document>
                    </Fragment>
                  )
                }}
              </BlobProvider>
            }
          </div>
        </div>

      </div>
    </Fragment>
  );
}

export default memo( PdfEditViewer );
