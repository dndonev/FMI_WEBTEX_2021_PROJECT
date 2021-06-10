export interface HeaderTypes {
    logoutUserSuccessAction: () => void;
    logoutUserErrorAction: (data: string) =>void;
    redirectToHome: () => void;
}