import axios from "axios"

const client = axios.create( {
  baseURL: "https://api.rezoomesaz.ir/resume/",
  headers: {
    'Content-Type': 'application/json'
  }
} )

export const createResume = async (templateNumber: string) => {
    const {data} = await client.post( `createResume/${templateNumber}`, {}, {withCredentials: true} )
    return data
}

export const getResume = async ( id: string | undefined ) => {
    const {data} = await client.get( `getResume/${id}`,{withCredentials: true})
    return data.data
}


export const getResumeList = async () => {
    const {data} = await client.get( `/getResumeList`, {withCredentials: true, } )
    return data.data
}

export const deleteResume = async (id: string) => {
    const {data} = await client.delete( `/deleteResume/${id}`, {withCredentials: true} )
    return data
}

export const changeTemplate = async (_data: {resumeId: string | undefined, templateNumber: string}) => {
    const {data} = await client.post( `/changeTemplate/${_data.resumeId}/${_data.templateNumber}`, {}, {withCredentials: true} )
    return data
}
