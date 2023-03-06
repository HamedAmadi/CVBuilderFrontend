import {useMutation, useQuery} from "react-query"
import {queryClient} from "../.."
import * as api from "../services/information-api"

export const useInsertBasicInformation = () => {
  return useMutation( api.insertBasicInformation, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
      queryClient.invalidateQueries( ['basicInformation'] )
    }
  } )
}

export const useGetBasicInformation = ( id: string | undefined) => {
  return useQuery( ['basicInformation', id], () => api.getBasicInformation( id ))
}
