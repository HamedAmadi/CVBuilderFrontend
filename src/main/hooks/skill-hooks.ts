import {useMutation, useQuery} from "react-query"
import {queryClient} from "../.."
import * as api from "../services/skill-api"

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

export const useGetSkill = ( id: string | undefined) => {
  return useQuery( ['skill', id], () => api.getSkill( id ) )
}
