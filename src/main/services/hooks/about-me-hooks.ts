import {useMutation, useQuery} from "react-query"
import {queryClient} from "../../.."
import * as api from "../apis/about-me-api"

export const useInsertAboutMe = () => {
  return useMutation(api.insertAboutMe, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
      queryClient.invalidateQueries( ['aboutMe'] )
    }
  }  )
}

export const useGetAboutMe = ( id: string | undefined) => {
  return useQuery( ['aboutMe', id], () => api.getAboutMe( id ) )
}
