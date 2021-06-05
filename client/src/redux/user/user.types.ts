export enum UserActionTypes {
    LoginUser = 'LOGIN_USER',
    LoginSuccess = 'LOGIN_SUCCESS',
    LoginError = 'LOGIN_ERROR',
    RegisterUser = 'REGISTER_USER',
    RegisterSuccess = 'REGISTER_SUCCESS',
    RegisterError = 'REGISTER_ERROR',
    LogoutUser = 'LOGOUT_USER',
    LogoutSuccess = 'LOGOUT_SUCCESS',
    LogoutError = 'LOGOUT_ERROR'
}

export interface RegisterState {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginState {
    email: string;
    password: string;
}

export interface UserState {
    awaitingAuthentication: boolean;
    authenticated: boolean;
    registeredUser: boolean;
    currentUser: User;
}

export interface User {
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
}