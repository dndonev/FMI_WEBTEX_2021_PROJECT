export enum ModalActionTypes {
    ToggleLoginModal = "TOGGLE_LOGIN_MODAL",
    ToggleRegisterModal = "TOGGLE_REGISTER_MODAL",
    ResetTogglesModal = "RESET_TOGGLES_MODAL"
};

export interface ModalState {
    toggleRegisterModal: boolean;
    toggleLoginModal: boolean;
};