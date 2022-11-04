import {useMutation, useQuery} from "react-query"
import {queryClient} from "../../.."
import * as api from "../apis/skill-api"

export const useInsertSkill = () => {
  return useMutation(api.insertSkill, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
      queryClient.invalidateQueries( ['skill'] )
    }
  }   )
}

export const useDeleteSkill = () => {
  return useMutation(api.deleteSkill, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
    }
  }   )
}

export const useGetSkill = ( id: string | null) => {
  return useQuery( ['skill', id], () => api.getSkill( id ) )
}
