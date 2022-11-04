import {useMutation, useQuery} from "react-query"
import {queryClient} from "../../.."
import * as api from "../apis/information-api"

export const useInsertBasicInformation = () => {
  return useMutation( api.insertBasicInformation, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
      queryClient.invalidateQueries( ['basicInformation'] )
    }
  } )
}

export const useGetBasicInformation = ( id: string | null) => {
  return useQuery( ['basicInformation', id], () => api.getBasicInformation( id ))
}
