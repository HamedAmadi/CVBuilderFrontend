import './PdfViewerAsImage.scss';
import {BlobProvider, PDFDownloadLink, usePDF} from "@react-pdf/renderer";
import {FC, Fragment, useState} from "react";
import {Document, Page, pdfjs} from 'react-pdf/dist/esm/entry.webpack5';
import PDFTemplate4 from "../PDFTemplate4/PDFTemplate4";
import PDFTemplate6, {Resume} from "../PDFTemplate6/PDFTemplate6";
import PDFTemplate1 from '../PDFTemplate1/PDFTemplate1';
import PDFTemplate2 from '../PDFTemplate2/PDFTemplate2';
import PDFTemplate3 from '../PDFTemplate3/PDFTemplate3';
import PDFTemplate5 from '../PDFTemplate5/PDFTemplate5';
import Skeleton from 'react-loading-skeleton';

type PdfAsImageProps = {
  templateNumber: number
  resume: Resume
  width: number
}

const PdfViewerAsImage: FC<PdfAsImageProps> = ( props ) => {

  const components = [
    <PDFTemplate1 resume={props.resume} />,
    <PDFTemplate2 resume={props.resume} />,
    <PDFTemplate3 resume={props.resume} />,
    <PDFTemplate4 resume={props.resume} />,
    <PDFTemplate5 resume={props.resume} />,
    <PDFTemplate6 resume={props.resume} />,
  ]

  const Component = components[props.templateNumber - 1]
  return (
    <div className="pdf-viewer-as-image h-100">
      <BlobProvider document={Component}>
        {( {url, loading} ) => {
          if ( loading )
            return (
              <div className='pdf-skeleton'> <Skeleton height='100%' /></div>
            )
          return (
            <Document
              file={url}
              loading={<div className='pdf-skeleton'> <Skeleton height='100%' /></div>}
              noData={<div className='pdf-skeleton'> <Skeleton height='100%' /></div>}
            >
              <Page width={props.width}
                loading={<div className='pdf-skeleton'> <Skeleton height='100%' /></div>}
                noData={<div className='pdf-skeleton'> <Skeleton height='100%' /></div>}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                pageNumber={1} />
            </Document>
          )
        }}
      </BlobProvider>
      {/* <Document
        file={instance.url}
        loading={<div className='pdf-skeleton'> <Skeleton height='100%' /></div>}
      >
        <Page
          renderAnnotationLayer={false}
          renderTextLayer={false}
          pageNumber={1} />
      </Document> */}
    </div>
  );
};

export default PdfViewerAsImage;
