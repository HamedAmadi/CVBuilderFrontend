import {useMutation, useQuery} from "react-query"
import {queryClient} from "../../.."
import * as api from "../apis/project-api"

export const useInsertProject = () => {
  return useMutation(api.insertProject, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
      queryClient.invalidateQueries( ['project'] )
    }
  }   )
}

export const useDeleteProject = () => {
  return useMutation(api.deleteProject, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
    }
  }   )
}

export const useGetProject = ( id?: string) => {
  return useQuery( ['project', id], () => api.getProject( id ) )
}
