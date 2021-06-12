import { TModalReducerActions } from "./modal.action";
import { ModalActionTypes, ModalState } from "./modal.types";

const InitialState: ModalState = {
    toggleLoginModal: false,
    toggleRegisterModal: false,
    toggleForgotPasswordModal: false
};

export const modalReducer = (state = InitialState, action: TModalReducerActions): ModalState => {
    switch (action.type) {
        case ModalActionTypes.ToggleRegisterModal:
            return {
                toggleRegisterModal: true,
                toggleLoginModal: false,
                toggleForgotPasswordModal: false
            };
        case ModalActionTypes.ToggleLoginModal:
            return {
                toggleRegisterModal: false,
                toggleLoginModal: true,
                toggleForgotPasswordModal: false
            };
        case ModalActionTypes.ToggleForgotPasswordModal:
            return {
                toggleRegisterModal: false,
                toggleLoginModal: false,
                toggleForgotPasswordModal: true
            }
        case ModalActionTypes.ResetTogglesModal:
            return InitialState;
        default:
            return state;
    }
}

export default modalReducer;