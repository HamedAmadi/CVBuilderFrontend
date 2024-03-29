import {useMutation, useQuery} from "react-query"
import {queryClient} from "../.."
import * as api from "../services/resume-api"

export const useCreateResume = () => {
  return useMutation(api.createResume, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resumeList'] )
    }
  } )
}

export const useGetResume = ( id: string | undefined ) => {
  return useQuery( ['resume', id], () => api.getResume( id ))
}

export const useGetResumeList = () => {
  return useQuery( ['resumeList'], api.getResumeList)
}

export const useDeleteResume = () => {
  return useMutation( api.deleteResume, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resumeList'] )
    }
  })
}

export const useChangeTemplate = () => {
  return useMutation( api.changeTemplate, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
      queryClient.invalidateQueries( ['resumeList'] )
    }
  })
}
