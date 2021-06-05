import { RegisterState } from "../../redux/user/user.types";
import * as Yup from 'yup'
export interface RegisterModalProps {
    show: boolean;
    handleClose: () => void;
    resetTogglesModalAction: () => void;
    registerUserAction?: (data: RegisterState) => void;
    registerUserSuccess?: () => any;
    registerUserError?: (message: any) => any;
    loginSuccessAction?: (email: string) => any;
    redirectToHome: () => void;
    handleHaveAccountLink: () => void;
    handleOpenForgotPassword: () => void;
}

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required').matches(
        PASSWORD_REGEX,
        "Field requires at least 8 Characters, one Uppercase letter, one Number and one special case Character"
    ),
    confirmPassword: Yup.string().when("password", {
        is: (val: any) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "The password must be the same"
        )
    })
})