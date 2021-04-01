import { TModalReducerActions } from "./modal.action";
import { ModalActionTypes, ModalState } from "./modal.types";

const InitialState: ModalState = {
    toggleLoginModal: false,
    toggleRegisterModal: false
}

export const modalReducer = ( state = InitialState, action: TModalReducerActions) : ModalState => {
    switch(action.type) {
        case ModalActionTypes.ToggleRegisterModal:
            return {
                toggleRegisterModal: true,
                toggleLoginModal: false,
            };
        case ModalActionTypes.ToggleLoginModal:
            return {
                toggleRegisterModal: false,
                toggleLoginModal: true
            };
        case ModalActionTypes.ResetTogglesModal:
            return InitialState;
        default:
            return state;
    }
}

export default modalReducer;