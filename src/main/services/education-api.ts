import axios from "axios"
import {Education} from "../components/EducationForm/EducationForm"


const client = axios.create( {
  baseURL: "https://api.rezoomesaz.ir/education/",
  headers: {
    'Content-Type': 'application/json'
  }
} )

export const insertEducation = async ( _data: Education ) => {
  const {data} = await client.post( `/insertEducation/${_data.resumeId}`, _data, {withCredentials: true} )
  return data
}

export const deleteEducation = async (_data: {resumeId: string | undefined, educationId: string | undefined}) => {
  const {data} = await client.post( `/deleteEducation/${_data.resumeId}/${_data.educationId}`, {}, {withCredentials: true} )
  return data
}

export const getEducation = async ( id: string | undefined) => {
  const {data} = await client.get( `getEducation/${id}`, {withCredentials: true} )
  return data.data
}
