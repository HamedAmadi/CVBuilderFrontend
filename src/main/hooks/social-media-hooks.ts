import {useMutation, useQuery} from "react-query"
import {queryClient} from "../.."
import * as api from "../services/social-media-api"

export const useInsertSocialMedia = () => {
  return useMutation(api.insertSocialMedia, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
      queryClient.invalidateQueries( ['socialMedia'] )
    }
  }   )
}

export const useDeleteSocialMedia = () => {
  return useMutation(api.deleteSocialMedia, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
    }
  }   )
}

export const useGetSocialMedia = ( id: string | undefined) => {
  return useQuery( ['socialMedia', id], () => api.getSocialMedia( id ) )
}
