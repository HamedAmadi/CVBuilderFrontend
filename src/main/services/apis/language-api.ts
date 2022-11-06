import axios from "axios"
import {Language} from "../../components/LanguageForm/LanguageForm"


const client = axios.create( {
  baseURL: "https://api.rezoomesaz.ir/language/",
  headers: {
    'Content-Type': 'application/json'
  }
} )

export const insertLanguage = async ( _data: Language ) => {
  const {data} = await client.post( `/insertLanguage/${_data.resumeId}`, _data, {withCredentials: true} )
  console.log(data)
    return data
}

export const deleteLanguage = async (_data: {resumeId: string | null, languageId: string | undefined}) => {
  const {data} = await client.post( `/deleteLanguage/${_data.resumeId}/${_data.languageId}`, {}, {withCredentials: true} )
  return data
}

export const getLanguage = async ( id: string | null) => {
  const {data} = await client.get( `getLanguage/${id}`, {withCredentials: true} )
    console.log(data)
  return data.data
}
