import { ModalActionTypes } from "./modal.types";

export interface IModalBaseAction {
    type: ModalActionTypes;
}

export interface IToggleRegister extends IModalBaseAction {
    type: ModalActionTypes.ToggleRegisterModal;
}

export interface IToggleLogin extends IModalBaseAction {
    type: ModalActionTypes.ToggleLoginModal;
}

export interface IToggleForgotPassword extends IModalBaseAction {
    type: ModalActionTypes.ToggleForgotPasswordModal;
}
export interface IResetToggles extends IModalBaseAction {
    type: ModalActionTypes.ResetTogglesModal;
}

export type TModalReducerActions = IToggleLogin | IToggleRegister | IResetToggles | IToggleForgotPassword;