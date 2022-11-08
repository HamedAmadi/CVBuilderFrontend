import axios from "axios"
import {Skill} from "../../components/SkillForm/SkillForm"


const client = axios.create( {
  baseURL: "https://api.rezoomesaz.ir/skill/",
  headers: {
    'Content-Type': 'application/json'
  }
} )

export const insertSkill = async ( _data: Skill ) => {
  const {data} = await client.post( `/insertSkill/${_data.resumeId}`, _data, {withCredentials: true} )
    return data
}

export const deleteSkill = async (_data: {resumeId: string | null, skillId: string | undefined}) => {
  const {data} = await client.post( `/deleteSkill/${_data.resumeId}/${_data.skillId}`, {}, {withCredentials: true} )
  return data
}

export const getSkill = async ( id: string | null) => {
  const {data} = await client.get( `getSkill/${id}`, {withCredentials: true} )
  return data.data
}
