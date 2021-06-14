import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Dispatch } from "redux";
import { IResetToggles, TModalReducerActions } from "../../redux/modal-visibility/modal.action";
import { ModalActionTypes } from "../../redux/modal-visibility/modal.types";
import "./register.styles.scss";
import { RegisterModalProps, validationSchema } from './register.types'
import { connect } from 'react-redux';
import clsx from "clsx";
import { useFormik } from 'formik'
import { User, UserActionTypes } from "../../redux/user/user.types";
import { ILoginSuccess, IRegisterError, IRegisterSuccess, TUserReducerActions } from "../../redux/user/user.actions";
import { push, CallHistoryMethodAction } from "connected-react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { headers } from "../login/login.types";

const RegisterModal: React.FC<RegisterModalProps> = ({ ...props }) => {
    const { show, handleClose, resetTogglesModalAction, redirectToHome,
        registerUserSuccess, loginSuccessAction, registerUserError, handleHaveAccountLink, handleOpenForgotPassword } = props;

    const modalVisibilityClassName = show ? "modal display-none" : "modal display-block";

    const handleCloseRegister = () => {
        resetTogglesModalAction();
        handleClose();
    }

    const handleRegister = (newUser: User) => {
        return axios
            .post('http://localhost:3001/api/auth/register', {
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }, { headers: headers })
            .then((response: any) => {
                sessionStorage.setItem('refreshToken', response.data.refreshToken);
                sessionStorage.setItem('accessToken', response.data.accessToken);
                registerUserSuccess();
                loginSuccessAction(newUser);
                redirectToHome();
                return response.data;
            })
            .catch((error: any) => {
                registerUserError(error);
            });
    }

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: ''
        },
        validateOnBlur: true,
        validationSchema,
        onSubmit: (values) => {
            const { username, email, password, confirmPassword, firstName, lastName } = values;
            handleRegister(values);
            handleClose();
            resetTogglesModalAction();
        }
    })

    return (
        <div className={clsx("register-container", modalVisibilityClassName)}>
            <div className="base-container">
                <AiFillCloseCircle className='close-button-register' onClick={handleCloseRegister} />

                <div className="register-header">
                    Personal Cloud
                </div>
                <div className="content">
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" name="username" placeholder="username" onChange={handleChange} value={values.username} />
                            </div>
                            {errors.username && <div className='error'>{errors.username}</div>}
                            <div className="form-group">
                                <input type="email" name="email" placeholder="email" onChange={handleChange} value={values.email} />
                            </div>
                            {errors.email && <div className='error'>{errors.email}</div>}
                            <div className="form-group">
                                <input type="password" name="password" placeholder="password" onChange={handleChange} value={values.password} />
                            </div>
                            {errors.password && <div className='error'>{errors.password}</div>}
                            <div className="form-group">
                                <input type="password" name="confirmPassword" placeholder="confirm password" onChange={handleChange} value={values.confirmPassword} />
                            </div>
                            {errors.confirmPassword && <div className='error'>{errors.confirmPassword}</div>}
                            <div className="form-group">
                                <input type="text" name="firstName" placeholder="first name" onChange={handleChange} value={values.firstName} />
                            </div>
                            {errors.firstName && <div className='error'>{errors.firstName}</div>}
                            <div className="form-group">
                                <input type="text" name="lastName" placeholder="last name" onChange={handleChange} value={values.lastName} />
                            </div>
                            {errors.lastName && <div className='error'>{errors.lastName}</div>}
                            <div className="links">
                                <div className="forgotten-password">
                                    <Link to='/' onClick={handleOpenForgotPassword}>Forgot password?</Link>
                                </div>
                                <div className="dont-have-account-yet">
                                    <Link to='/' onClick={handleHaveAccountLink}>Already have an account?</Link>
                                </div>
                            </div>

                            <div className="footer">
                                <button type="submit" className="register-button">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions | TUserReducerActions | CallHistoryMethodAction>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.ResetTogglesModal }),
        registerUserSuccess: () => {
            dispatch<IRegisterSuccess>({ type: UserActionTypes.RegisterSuccess });
            dispatch<IResetToggles>({ type: ModalActionTypes.ResetTogglesModal });
        },
        registerUserError: (message: string) => dispatch<IRegisterError>({ type: UserActionTypes.RegisterError, data: message }),
        loginSuccessAction: (data: User) => dispatch<ILoginSuccess>({ type: UserActionTypes.LoginSuccess, data: data }),
        redirectToHome: () => dispatch(push('/main')),
    };
};

export default connect(null, mapDispatchToProps)(RegisterModal);