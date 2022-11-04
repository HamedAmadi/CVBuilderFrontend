import {createContext, ReactNode, useContext, useReducer} from "react";
import {ActionType, UserReducer} from "./UserReducer";

type UserContextType = {
  state: UserStateType;
  dispatch: ( action: ActionType ) => void
}

export type UserStateType = {
  isSignIn: boolean
  isVerified: boolean
  email: string | null
  firstName: string | null
  lastName: string | null
}

type UserProviderProps = {
  children: React.ReactNode
}

export const initialUserState: UserStateType = {
  isSignIn: false,
  isVerified: false,
  email: null,
  firstName: null,
  lastName: null,
}

const UserContext = createContext<UserContextType>( {
  state: initialUserState,
  dispatch: () => undefined
} )


const UserContextProvider = ( {children}: UserProviderProps ) => {
  const [state, dispatch] = useReducer( UserReducer, initialUserState )
  const value = {state, dispatch}

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => {
  const context = useContext( UserContext )
  if ( context === undefined ) {
    throw new Error( 'useCount must be used within a CountProvider' )
  }
  return context
}

export {UserContextProvider, useUserContext}
