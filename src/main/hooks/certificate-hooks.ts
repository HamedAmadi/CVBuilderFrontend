import {useMutation, useQuery} from "react-query"
import {queryClient} from "../.."
import * as api from "../services/certificate-api"

export const useInsertCertificate = () => {
  return useMutation(api.insertCertificate, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
      queryClient.invalidateQueries( ['certificate'] )
    }
  }   )
}

export const useDeleteCertificate = () => {
  return useMutation(api.deleteCertificate, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['resume'] )
    }
  }   )
}

export const useGetCertificate = ( id: string | undefined) => {
  return useQuery( ['certificate', id], () => api.getCertificate( id ))
}
