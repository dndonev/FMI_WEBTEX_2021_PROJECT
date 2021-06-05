import { LoginState, RegisterState, User, UserActionTypes } from "./user.types";

export interface IUserBaseAction {
    type: UserActionTypes;
}

export interface IRegisterUser extends IUserBaseAction {
    type: UserActionTypes.RegisterUser;
    data: RegisterState;
}

export interface IRegisterSuccess extends IUserBaseAction {
    type: UserActionTypes.RegisterSuccess;
}

export interface IRegisterError extends IUserBaseAction {
    type: UserActionTypes.RegisterError;
    data: string;
}

export interface ILoginUser extends IUserBaseAction {
    type: UserActionTypes.LoginUser;
    data: LoginState;
}

export interface ILoginSuccess extends IUserBaseAction {
    type: UserActionTypes.LoginSuccess;
    data: User;
}
export interface ILoginError extends IUserBaseAction {
    type: UserActionTypes.LoginError;
    data: string;
}

export interface ILogoutUser extends IUserBaseAction {
    type: UserActionTypes.LogoutUser;
}

export interface ILogoutSucces extends IUserBaseAction {
    type: UserActionTypes.LogoutSuccess;
}

export interface ILogoutError extends IUserBaseAction {
    type: UserActionTypes.LogoutError;
    data: string;
}

export type TUserReducerActions = IRegisterUser | IRegisterSuccess | IRegisterError
                                | ILoginUser | ILoginSuccess | ILoginError 
                                | ILogoutUser | ILogoutSucces | ILogoutError;