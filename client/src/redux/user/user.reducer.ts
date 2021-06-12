import { TUserReducerActions } from "./user.actions";
import { User, UserActionTypes, UserState } from "./user.types";

const InitialState: UserState = {
    awaitingAuthentication: false,
    authenticated: false,
    registeredUser: false,
    currentUser: {} as User,
}

export const userReducer = (state = InitialState, action: TUserReducerActions): UserState => {
    switch(action.type) {
        case UserActionTypes.RegisterUser:
            return {
                ...state,
                awaitingAuthentication: true,
                currentUser: action.data
            };
        case UserActionTypes.RegisterSuccess:
            return  {
                ...state,
                awaitingAuthentication: false,
                registeredUser: true
            };
        case UserActionTypes.RegisterError:
            return {
                ...state,
                awaitingAuthentication: false,
                registeredUser: false
            };
        case UserActionTypes.LoginUser:
            return {
                ...state,
                awaitingAuthentication: true,
                registeredUser: false
            };
        case UserActionTypes.LoginSuccess:
            return {
                ...state,
                awaitingAuthentication: false,
                authenticated: true,
                currentUser: action.data
            };
        case UserActionTypes.LoginError:
            return {
                ...state,
                awaitingAuthentication: false,
                authenticated: false
            };
        case UserActionTypes.LogoutUser: 
            return {
                ...state,
                awaitingAuthentication: true
            }; 
        case UserActionTypes.LogoutSuccess:
            return {
                ...state,
                awaitingAuthentication: false,
                authenticated: false,
                registeredUser: false,
                currentUser: {} as User,
            };
        case UserActionTypes.LogoutError:
            return {
                ...state,
                awaitingAuthentication: false,
                authenticated: true
            };
        default:
            return state;
    }
}

export default userReducer;