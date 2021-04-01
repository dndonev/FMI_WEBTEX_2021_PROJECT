export interface LoginModalProps {
    show: boolean;
    handleClose:()=>void;
    toggleRegisterModal?: boolean;
    toggleLoginModal?: boolean;
    resetTogglesModalAction: () => void;
    toggleLogin?: () => void;
    toggleRegister?: () => void;
}