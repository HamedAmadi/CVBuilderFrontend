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
    return data
}

export const deleteLanguage = async (_data: {resumeId: string | undefined, languageId: string | undefined}) => {
  const {data} = await client.post( `/deleteLanguage/${_data.resumeId}/${_data.languageId}`, {}, {withCredentials: true} )
  return data
}

export const getLanguage = async ( id: string | undefined) => {
  const {data} = await client.get( `getLanguage/${id}`, {withCredentials: true} )
  return data.data
}
