import {UserStateType} from "./UserContext"

export type ActionType =
  | {type: 'signIn', payload: boolean}
  | {type: 'signOut'}
  | {type: 'verify', payload: boolean}
  | {type: 'setEmail', payload: string}
  | {type: 'setFirstName', payload: string}
  | {type: 'setLastName', payload: string}
  | {type: 'reset'}

  export const UserReducer = (state: UserStateType, action: ActionType) => {
  switch (action.type) {
    case 'signIn': {
      return {...state, isSignIn: action.payload}
    }
    case 'signOut': {
      return {...state, isSignIn: false}
    }
    case 'verify': {
      return {...state, isVerified: action.payload}
    }
    case 'setEmail': {
      return {...state, email: action.payload}
    }
    case 'setFirstName': {
      return {...state, firstName: action.payload}
    }
    case 'setLastName': {
      return {...state, lastName: action.payload}
    }
    case 'reset': {
      return {
        isSignIn: false,
        isVerified: null,
        email: null,
        firstName: null,
        lastName: null
      }
    }
    default: return state
  }
}
