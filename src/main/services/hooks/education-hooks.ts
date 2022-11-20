import {useMutation, useQuery} from "react-query"
import {queryClient} from "../../.."
import * as api from "../apis/education-api"

export const useInsertEducation = () => {
  return useMutation(api.insertEducation, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
      queryClient.invalidateQueries( ['education'] )
    }
  }   )
}

export const useDeleteEducation = () => {
  return useMutation(api.deleteEducation, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
    }
  }   )
}

export const useGetEducation = ( id: string | undefined) => {
  return useQuery( ['education', id], () => api.getEducation( id ) )
}
