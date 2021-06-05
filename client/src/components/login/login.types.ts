import * as Yup from 'yup'
import { User } from '../../redux/user/user.types'
export interface LoginModalProps {
    show: boolean;
    handleClose: () => void;
    resetTogglesModalAction: () => void;
    handleDontHaveAnAccoutLink: () => void;
    handleOpenForgotPassword: () => void;
    loginSuccessAction: (data: User) => void;
    loginErrorAction: (error: any) => void;
    redirectToHome: () => void;
}
export const headers = {
    'Content-Type' : 'application/json'
}

export const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required')
})