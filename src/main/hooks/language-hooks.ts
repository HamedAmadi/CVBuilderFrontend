import {useMutation, useQuery} from "react-query"
import {queryClient} from "../.."
import * as api from "../services/language-api"

export const useInsertLanguage = () => {
  return useMutation(api.insertLanguage, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
      queryClient.invalidateQueries( ['language'] )
    }
  }   )
}

export const useDeleteLanguage = () => {
  return useMutation(api.deleteLanguage, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
    }
  }   )
}

export const useGetLanguage = ( id: string | undefined) => {
  return useQuery( ['language', id], () => api.getLanguage( id ) )
}
