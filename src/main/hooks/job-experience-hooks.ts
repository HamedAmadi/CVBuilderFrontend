import {useMutation, useQuery} from "react-query"
import {queryClient} from "../.."
import * as api from "../services/job-experience-api"

export const useInsertJobExperience = () => {
  return useMutation(api.insertJobExperience, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
      queryClient.invalidateQueries( ['jobExperience'] )
    }
  }   )
}

export const useDeleteJobExperience = () => {
  return useMutation(api.deleteJobExperience, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
    }
  }   )
}

export const useJobExperience = ( id: string | undefined) => {
  return useQuery( ['jobExperience', id], () => api.getJobExperience( id ) )
}
