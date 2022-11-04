import {initialUserState, UserStateType} from "./UserContext"

export type ActionType =
  | {type: 'signIn'}
  | {type: 'signOut'}
  | {type: 'verify', payload: boolean}
  | {type: 'setEmail', payload: string}
  | {type: 'setFirstName', payload: string}
  | {type: 'setLastName', payload: string}
  | {type: 'reset'}

  export const UserReducer = (state: UserStateType, action: ActionType) => {
  switch (action.type) {
    case 'signIn': {
      return {...state, isSignIn: true}
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
      return initialUserState
    }
    default: return state
  }
}
