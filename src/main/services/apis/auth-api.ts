import axios, {AxiosError} from "axios"
import {ChangePassword} from "../../components/ChangePassword/ChangePassword"
import {UserInfo} from "../../components/UserInfo/UserInfo"
import {SignIn} from "../../pages/SignIn/SignIn"
import {SignUp} from "../../pages/SignUp/SignUp"

const client = axios.create( {
  baseURL: "https://api.rezoomesaz.ir/auth/",
} )

export const signUp = async ( _data: SignUp ) => {
    const {data} = await client.post( '/signup', _data, {withCredentials: true} )
    return data
}

export const signIn = async ( _data: SignIn ) => {
  const {data} = await client.post( '/signIn', _data, {withCredentials: true} )
  console.log(data)
  return data
}

export const checkSignIn = async () => {
  const {data} = await client.get( '/checkSignIn', {withCredentials: true} )
  console.log(data)
  return data
}

export const sendEmailForSignIn = async ( _data: SignIn ) => {
  const {data} = await client.post( '/sendEmailForSignin', _data, {withCredentials: true} )

  return data
}

export const signInWithoutPassword = async (token?: string ) => {
  const {data} = await client.get( `/signInWithoutPassword/${token}`, {withCredentials: true} )
  console.log(data)
  return data
}


export const changePassword = async ( _data: ChangePassword ) => {
  const {data} = await client.post( '/changePassword', _data, {withCredentials: true})

  console.log( data )
  return data
}

export const sendVerifyEmail = async () => {
  const {data} = await client.post( '/sendVerifyEmail', {}, {withCredentials: true})

  return data
}

export const verifyEmail = async ( token?: string ) => {
  console.log('verifyEmail')
  const {data} = await client.get( `/verifyEmail/${token}/` )
  console.log(data)
  return data
}

export const getUserInfo = async () => {
  const {data} = await client.get( `/getUserInfo`, {withCredentials: true} )
  console.log(data)
  return data.data
}

export const completeProfile = async ( _data: UserInfo ) => {
  const {data} = await client.post( `/completeProfile`, _data, {withCredentials: true} )
  console.log(data)
  return data
}

export const logout = async () => {
  const {data} = await client.get( `/logout`, {withCredentials: true} )
  console.log(data)
  return data
}
