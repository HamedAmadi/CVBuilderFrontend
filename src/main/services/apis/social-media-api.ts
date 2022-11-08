import axios from "axios"
import {SocialMedia} from "../../components/SocialMediaForm/SocialMediaForm"


const client = axios.create( {
  baseURL: "https://api.rezoomesaz.ir/socialMedia/",
  headers: {
    'Content-Type': 'application/json'
  }
} )

export const insertSocialMedia = async ( _data: SocialMedia ) => {
  const {data} = await client.post( `/insertSocialMedia/${_data.resumeId}`, _data, {
    withCredentials: true
  } )
  return data
}

export const deleteSocialMedia = async (_data: {resumeId: string | null, socialMediaId: string | undefined}) => {
  const {data} = await client.post( `/deleteSocialMedia/${_data.resumeId}/${_data.socialMediaId}`, {}, {withCredentials: true} )
  return data
}

export const getSocialMedia = async ( id: string | null) => {
  const {data} = await client.get( `getSocialMedia/${id}`, {withCredentials: true} )
  return data.data
}
