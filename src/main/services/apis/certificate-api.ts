import axios from "axios"
import {Certificate} from "../../components/CertificateForm/CertificateForm"


const client = axios.create( {
  baseURL: "https://api.rezoomesaz.ir/certificate/",
  headers: {
    'Content-Type': 'application/json'
  }
} )

export const insertCertificate = async ( _data: Certificate ) => {
  const {data} = await client.post( `/insertCertificate/${_data.resumeId}`, _data, {withCredentials: true} )
  return data
}

export const getCertificate = async ( id: string | undefined) => {
  const {data} = await client.get( `getCertificate/${id}`, {withCredentials: true} )
  return data.data
}

export const deleteCertificate = async (_data: {resumeId: string | undefined, certificateId: string | undefined}) => {
  const {data} = await client.post( `/deleteCertificate/${_data.resumeId}/${_data.certificateId}`, {}, {withCredentials: true} )
  return data
}
