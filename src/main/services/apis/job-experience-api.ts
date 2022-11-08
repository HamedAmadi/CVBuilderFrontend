import axios from "axios"
import {JobExperience} from "../../components/JobExperienceForm/JobExperienceForm"


const client = axios.create( {
  baseURL: "https://api.rezoomesaz.ir/jobExperience/",
  headers: {
    'Content-Type': 'application/json'
  }
} )

export const insertJobExperience = async ( _data: JobExperience ) => {
  const {data} = await client.post( `/insertjobExperience/${_data.resumeId}`, _data, {withCredentials: true} )
    return data
}

export const deleteJobExperience = async (_data: {resumeId: string | null, jobExperienceId: string | undefined}) => {
  const {data} = await client.post( `/deleteJobExperience/${_data.resumeId}/${_data.jobExperienceId}`, {}, {withCredentials: true} )
  return data
}

export const getJobExperience = async ( id: string | null) => {
  const {data} = await client.get( `getJobExperience/${id}`, {withCredentials: true} )
  return data.data
}
