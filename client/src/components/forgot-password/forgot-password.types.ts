export interface ForgotPasswordTypes {
    show: boolean;
    handleClose: () => void;
    resetTogglesModalAction: () => void;
    toggleForgotPasswordAction: () => void;
    handleHaveAnAccoutLink: () => void;
    handleDontHaveAnAccountLink: () => void;
}