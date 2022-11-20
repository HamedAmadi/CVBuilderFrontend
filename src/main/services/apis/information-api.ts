import axios from "axios"
import {BasicInformation} from "../../components/PersonalInfo/PersonalInfo"


const client = axios.create( {
  baseURL: "https://api.rezoomesaz.ir/basicInformation/",
  headers: {
    'Content-Type': 'application/json'
  }
} )

export const insertBasicInformation = async ( _data: BasicInformation ) => {
    const {data} = await client.post( `insertBasicInformation/${_data.resumeId}`, _data, {withCredentials: true} )
    return data
}

export const getBasicInformation = async ( id: string | undefined) => {
    const {data} = await client.get( `getBasicInformation/${id}`, {withCredentials: true} )
      return data.data
}
