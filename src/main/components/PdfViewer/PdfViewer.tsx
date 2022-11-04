// import './pdfViewer.scss'
// import {Worker, Viewer, SpecialZoomLevel, ProgressBar} from '@react-pdf-viewer/core';
// import {pageNavigationPlugin, RenderGoToPageProps} from '@react-pdf-viewer/page-navigation';
// import {defaultLayoutPlugin, ToolbarProps, ToolbarSlot} from '@react-pdf-viewer/default-layout';
// import {RenderDownloadProps, getFilePlugin} from '@react-pdf-viewer/get-file';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// import disableScrollPlugin from './disableScrollPlugin';
// import {FC, Fragment, ReactElement, useEffect, useState} from 'react';
// import {BlobProvider, usePDF} from '@react-pdf/renderer';
// import PDFTemplate2 from '../PDFTemplate2/PDFTemplate2';
// import PDFTemplate6 from '../PDFTemplate6/PDFTemplate6';
// import {useGetResume} from '../../hooks/resume-hooks';

// // const style = {
// //   width: '70%',
// //   height: 'fit-content',
// //   margin: 'auto',
// //   position: 'relative',
// //   top: 'calc(50% - 50vh)',
// // } as React.CSSProperties;

// const PdfViewer: FC = () => {
//   const [image, setImage] = useState<any>();
//   const {data: resume, isLoading: getIsLoadin} = useGetResume( localStorage.getItem( 'resumeId' ) )
//   const disableScrollPluginInstance = disableScrollPlugin();
//   const pageNavigationPluginInstance = pageNavigationPlugin();
//   const getFilePluginInstance = getFilePlugin();
//   const {Download} = getFilePluginInstance;

//   const urlMaker = () => {

//   }
//   useEffect( () => {
//     if ( !getIsLoadin ) {
//       if ( resume ) {
//         urlMaker()
//       }
//     }
//   }, [resume] )

//   const renderToolbar = ( Toolbar: ( props: ToolbarProps ) => ReactElement ) => (
//     <Toolbar>
//       {( slots: ToolbarSlot ) => {
//         const {
//           CurrentPageLabel,
//           GoToNextPage,
//           GoToPreviousPage,
//           NumberOfPages,
//         } = slots;
//         return (
//           <div
//             style={{
//               width: '100%',
//               height: '50px',
//               display: 'flex',
//               justifyContent: 'space-between'
//             }}
//           >
//             <button
//               style={{
//                 margin: 'auto 8px',
//                 padding: '4px 8px',
//                 width: '100px',
//                 border: 'none',
//                 backgroundColor: 'var(--third-color)',
//                 color: 'white',
//               }}
//             // onClick={props.onClick}
//             >
//               تغییر قالب
//             </button>
//             <div style={{display: 'flex', color: 'white', marginTop: 'auto', fontSize: '16px', fontWeight: '600'}}>
//               <div style={{padding: '0px 2px'}}>
//                 <GoToNextPage>
//                   {( props ) => (
//                     <button
//                       style={{
//                         backgroundColor: 'transparent',
//                         color: props.isDisabled ? '#c7c7c7' : 'white',
//                         border: 'none',
//                         cursor: props.isDisabled ? 'not-allowed' : 'pointer',
//                       }}
//                       disabled={props.isDisabled}
//                       onClick={props.onClick}
//                     >
//                       {'<'}
//                     </button>
//                   )}
//                 </GoToNextPage>
//               </div>
//               <div style={{padding: '0px 2px'}}>
//                 <CurrentPageLabel />
//               </div>
//               <div style={{padding: '0px 2px'}}>
//                 / <NumberOfPages />
//               </div>
//               <div style={{padding: '0px 2px'}}>
//                 <GoToPreviousPage>
//                   {( props ) => (
//                     <button
//                       style={{
//                         backgroundColor: 'transparent',
//                         color: props.isDisabled ? '#c7c7c7' : 'white',
//                         border: 'none',
//                         cursor: props.isDisabled ? 'not-allowed' : 'pointer',
//                       }}
//                       disabled={props.isDisabled}
//                       onClick={props.onClick}
//                     >
//                       {'>'}
//                     </button>
//                   )}
//                 </GoToPreviousPage>
//               </div>
//             </div>
//             <Download>
//               {
//                 ( props: RenderDownloadProps ) => (
//                   <button
//                     style={{
//                       margin: 'auto 8px',
//                       padding: '4px 8px',
//                       width: '100px',
//                       border: 'none',
//                       backgroundColor: 'var(--third-color)',
//                       color: 'white',
//                     }}
//                     onClick={props.onClick}
//                   >
//                     دانلود
//                   </button>
//                 )
//               }
//             </Download>
//           </div>
//         );
//       }}
//     </Toolbar>
//   );

//   const defaultLayoutPluginInstance = defaultLayoutPlugin( {
//     renderToolbar,
//     sidebarTabs: ( defaultTabs ) => [],
//   } );


//   console.log( resume )

//   if ( !resume ) return ( <div className="text-center mt-4"> ...isLoading </div> )

//   return (
//     <Fragment>
//       < BlobProvider document={<PDFTemplate6 resume={resume} />} >
//         {( {url, blob} ) => {
//           console.log( blob )
//           console.log( url )
//           // if ( !url ) return <div className="text-center mt-4"> ...isLoading </div>
//           return (
//             <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
//               <div className='pdf-viewer'>
//                 {url && <Viewer fileUrl={url}
//                   plugins={[disableScrollPluginInstance, pageNavigationPluginInstance, defaultLayoutPluginInstance, getFilePluginInstance]}
//                   defaultScale={SpecialZoomLevel.PageFit}
//                 // scrollMode={ScrollMode.Horizontal}
//                 />}
//               </div>
//             </Worker>
//           );
//         }}
//       </BlobProvider >
//     </Fragment>
//   );
// };

// export default PdfViewer;
