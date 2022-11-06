import './PdfEditViewer.scss'
import {BlobProvider, PDFDownloadLink} from "@react-pdf/renderer";
import {FC, Fragment, useEffect, useState} from "react";
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack5';
import PDFTemplate4 from "../PDFTemplate4/PDFTemplate4";
import PDFTemplate6, {Resume} from "../PDFTemplate6/PDFTemplate6";
import PDFTemplate1 from '../PDFTemplate1/PDFTemplate1';
import PDFTemplate2 from '../PDFTemplate2/PDFTemplate2';
import PDFTemplate3 from '../PDFTemplate3/PDFTemplate3';
import PDFTemplate5 from '../PDFTemplate5/PDFTemplate5';
import Button from '../Button/Button';
import {TbChevronRight, TbChevronLeft, TbMaximize} from 'react-icons/tb';
import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';



type PdfAsImageProps = {
  templateNumber: number
  resume: Resume
  width: number
  isChangeTemplate: boolean
}

const PdfEditViewer: FC<PdfAsImageProps> = ( props ) => {
  const [numPages, setNumPages] = useState<number>( 1 );
  const [pageNumber, setPageNumber] = useState( 1 );

  const components = [
    <PDFTemplate1 resume={props.resume} />,
    <PDFTemplate2 resume={props.resume} />,
    <PDFTemplate3 resume={props.resume} />,
    <PDFTemplate4 resume={props.resume} />,
    <PDFTemplate5 resume={props.resume} />,
    <PDFTemplate6 resume={props.resume} />,
  ]

  const Component = components[props.templateNumber - 1]

  const onDocumentLoadSuccess = ( {numPages}: any ) => {
    console.log( 'rneder' )
    setNumPages( numPages )
  }

  const previousPage = () => {
    setPageNumber( pageNumber - 1 );
  }

  const nextPage = () => {
    setPageNumber( pageNumber + 1 );
  }

  return (
    <Fragment>
      <div className="pdf-edit-viewer">
        <div className="container h-100">
          <div className="d-flex mt-3 justify-content-between">
            <Link className='change-template-btn' to='/change-template'>
              <Button size={'small'} style={'solid'} borderRadius={'normal'}>تغییر قالب</Button>
            </Link>
            <PDFDownloadLink className='me-auto ms-0' document={Component} fileName="ResumeSaz.pdf">
              {( {loading} ) =>
                <Button disabled={loading} size={'small'} style={'solid'} borderRadius={'normal'}>دانلود</Button>
              }
            </PDFDownloadLink>
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
            <BlobProvider document={Component}>
              {( {url, loading} ) => {
                // if ( loading )
                //   return (
                //     <div className='pdf-skeleton'> <Skeleton height='100%' /></div>
                //   )
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
                        <Link to='/change-template'>

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
                        pageNumber={pageNumber} />
                    </Document>
                  </Fragment>
                )
              }}
            </BlobProvider>
          </div>
        </div>

      </div>
    </Fragment>
  );
}

export default PdfEditViewer;
