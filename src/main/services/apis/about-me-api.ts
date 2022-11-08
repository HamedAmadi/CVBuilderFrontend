import axios from "axios"
import {UserAboutUs} from "../../components/UserAboutUs/UserAboutUs"


const client = axios.create( {
  baseURL: "https://api.rezoomesaz.ir/aboutMe/",
  headers: {
    'Content-Type': 'application/json'
  }
} )

export const insertAboutMe = async ( _data: UserAboutUs ) => {
  const {data} = await client.post( `insertAboutMe/${_data.resumeId}`, _data, {withCredentials: true} )
    return data
}

export const getAboutMe = async ( id: string | null) => {
  const {data} = await client.get( `getAboutMe/${id}`, {withCredentials: true} )
  return data.data
}
