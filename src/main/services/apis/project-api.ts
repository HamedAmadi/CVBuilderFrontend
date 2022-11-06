import axios from "axios"
import {Project} from "../../components/ProjectForm/ProjectForm"


const client = axios.create( {
  baseURL: "https://api.rezoomesaz.ir/project/",
} )

export const insertProject = async ( _data: Project ) => {
  const {data} = await client.post( `/insertProject/${_data.resumeId}`, _data, {withCredentials: true} )
  return data
}

export const deleteProject = async (_data: {resumeId: string | null, projectId: string | undefined}) => {
  const {data} = await client.post( `/deleteProject/${_data.resumeId}/${_data.projectId}`, {}, {withCredentials: true} )
  console.log(data)
  return data
}

export const getProject = async ( id: string | null) => {
  const {data} = await client.get( `getProject/${id}`, {withCredentials: true} )
    console.log(data)
  return data.data
}
