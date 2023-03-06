import './PdfViewerAsImage.scss';
import {BlobProvider} from "@react-pdf/renderer";
import {FC, useCallback} from "react";
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack5';
import PDFTemplate1 from '../../PDF Templates/PDFTemplate1/PDFTemplate1';
import PDFTemplate2 from '../../PDF Templates/PDFTemplate2/PDFTemplate2';
import PDFTemplate3 from '../../PDF Templates/PDFTemplate3/PDFTemplate3';
import PDFTemplate4 from "../../PDF Templates/PDFTemplate4/PDFTemplate4";
import PDFTemplate5 from '../../PDF Templates/PDFTemplate5/PDFTemplate5';
import PDFTemplate6, {Resume} from "../../PDF Templates/PDFTemplate6/PDFTemplate6";
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

  const Component = components[( props.templateNumber ) - 1]

  return (
    <div className="pdf-viewer-as-image h-100">
      <BlobProvider document={Component}>
        {( {url} ) => {
          return (
            <Document
              file={url}
              loading={<div className='pdf-skeleton'> <Skeleton borderRadius={0} height='100%' /></div>}
              noData={<div className='pdf-skeleton'> <Skeleton borderRadius={0} height='100%' /></div>}
            >
              <Page width={props.width}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                pageNumber={1} />
            </Document>
          )
        }}
      </BlobProvider>
    </div>
  );
};

export default PdfViewerAsImage;
