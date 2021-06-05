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
import { RegisterState, User, UserActionTypes } from "../../redux/user/user.types";
import { ILoginSuccess, IRegisterError, IRegisterSuccess, IRegisterUser, TUserReducerActions } from "../../redux/user/user.actions";
import { push, CallHistoryMethodAction } from "connected-react-router";
import { Link } from "react-router-dom";

const RegisterModal: React.FC<RegisterModalProps> = ({ ...props }) => {
    const { show, handleClose, resetTogglesModalAction,
        registerUserAction, registerUserSuccess, loginSuccessAction, registerUserError, handleHaveAccountLink, handleOpenForgotPassword } = props;

    const modalVisibilityClassName = show ? "modal display-none" : "modal display-block";

    const handleCloseRegister = () => {
        resetTogglesModalAction();
        handleClose();
    }

    return (
        <form autoComplete='on'>
            <div className={clsx("register-container", modalVisibilityClassName)} onSubmit={handleCloseRegister}>
                <div className="base-container">
                    <AiFillCloseCircle className='close-button-register' onClick={handleCloseRegister} />

                    <div className="register-header">
                        Personal Cloud
                    </div>
                    <div className="content">
                        <div className="form">
                            <div className="form-group">
                                <input type="text" name="username" placeholder="username" />
                            </div>

                            <div className="form-group">
                                <input type="email" name="email" placeholder="email" />
                            </div>

                            <div className="form-group">
                                <input type="password" name="password" placeholder="password" />
                            </div>

                            <div className="form-group">
                                <input type="password" name="password" placeholder="Confirm password" />
                            </div>

                            <div className="form-group">
                                <input type="text" name="firstName" placeholder="First name" />
                            </div>

                            <div className="form-group">
                                <input type="text" name="lastName" placeholder="Last name" />
                            </div>

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
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions | TUserReducerActions | CallHistoryMethodAction>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.ResetTogglesModal }),
        registerUserAction: (data: RegisterState) => dispatch<IRegisterUser>({ type: UserActionTypes.RegisterUser, data: data }),
        registerUserSuccess: () => {
            dispatch<IRegisterSuccess>({ type: UserActionTypes.RegisterSuccess });
            dispatch<IResetToggles>({ type: ModalActionTypes.ResetTogglesModal });
        },
        registerUserError: (message: string) => dispatch<IRegisterError>({ type: UserActionTypes.RegisterError, data: message }),
        loginUserSuccess: (data: User) => dispatch<ILoginSuccess>({ type: UserActionTypes.LoginSuccess, data: data }),
        redirectToHome: () => dispatch(push('/main')),
    };
};

export default connect(null, mapDispatchToProps)(RegisterModal);