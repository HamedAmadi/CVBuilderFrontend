import {AxiosError, AxiosResponse} from "axios"
import {useMutation, useQuery} from "react-query"
import {queryClient} from "../../.."
import * as api from "../apis/auth-api"
import {ChangePassword} from "../../components/ChangePassword/ChangePassword"
import {UserInfo} from "../../components/UserInfo/UserInfo"
import {SignIn} from "../../pages/SignIn/SignIn"
import {SignUp} from "../../pages/SignUp/SignUp"

export const useSignUp = () => {
  return useMutation<any, AxiosError, SignUp, unknown>(api.signUp )
}

export const useSignIn = () => {
  return useMutation<any, AxiosError, SignIn, unknown>(api.signIn )
}

export const useCheckSignIn = () => {
  return useQuery<any, AxiosError>(['userDetail'], api.checkSignIn )
}

export const useSendEmailForSignIn = () => {
  return useMutation<any, AxiosError, SignIn, unknown>(api.sendEmailForSignIn )
}

export const useSignInWithoutPassword = ( token?: string ) => {
  console.log('useSignInWithoutPassword')
  return useQuery<any, AxiosError>( [, token], () => api.signInWithoutPassword(token))
}

export const useChangePassword = () => {
  return useMutation<any, AxiosError, ChangePassword, unknown>(api.changePassword)
}

export const useSendVerifyEmail = () => {
  return useMutation<any, AxiosError, {}, unknown>(api.sendVerifyEmail )
}

export const useVerifyEmail = (token?: string) => {
  return useQuery<any, AxiosError>( [, token], () => api.verifyEmail(token))
}


export const useGetUserInfo = () => {
  return useQuery<UserInfo, AxiosError>(['userInfo'], api.getUserInfo )
}

export const useCompleteProfile = () => {
  return useMutation<any, AxiosError, UserInfo, unknown>(api.completeProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries( ['userInfo'] )
    }
  })
}

export const useLogout = () => {
  return useMutation(api.logout)
}
