import { User } from "../../redux/user/user.types";

export interface HeaderTypes {
    currentUser: User;
    registeredUser: boolean;
    logoutUserSuccessAction: () => void;
    logoutUserErrorAction: (data: string) => void;
    toggleUserInfoModalAction: () => void;
    resetTogglesModalAction:() => void;
    redirectToHome: () => void;
}