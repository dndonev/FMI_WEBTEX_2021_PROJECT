import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Dispatch } from "redux";
import { IResetToggles, IToggleLogin, IToggleRegister, TModalReducerActions } from "../../redux/modal-visibility/modal.action";
import { ModalActionTypes } from "../../redux/modal-visibility/modal.types";
import { StoreState } from "../../redux/root-reducer";
import "./register.styles.scss";
import { RegisterModalProps } from './register.types'
import { connect } from 'react-redux';
import clsx from "clsx";

const RegisterModal: React.FC<RegisterModalProps> = ({ ...props }) => {
    const { show, handleClose, toggleRegisterModal, toggleLoginModal, resetTogglesModalAction, toggleLogin, toggleRegister } = props;

    const modalVisibilityClassName = show ? "modal display-none" : "modal display-block";

    const handleCloseRegister = () => {
        resetTogglesModalAction();
        handleClose();
    }
    
    return (
        <div className={clsx("register-container", modalVisibilityClassName)} onSubmit={handleCloseRegister}>
            <div className="base-container">
                <AiFillCloseCircle className='close-button-register' onClick={handleCloseRegister} />

                <div className="register-header">
                    Register
                </div>
                <div className="content">
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="username" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="password" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Confirm password</label>
                            <input type="password" name="password" placeholder="Confirm password" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="firstName">First name</label>
                            <input type="text" name="firstName" placeholder="First name" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last name</label>
                            <input type="text" name="lastName" placeholder="Last name" />
                        </div>

                        <div className="links">
                            <div className="forgotten-password">
                                <a href="url">Forgot password?</a>
                            </div>
                            <div className="dont-have-account-yet">
                                <a href="url">You already have an account?</a>
                            </div>
                        </div>

                        <div className="footer">
                            <button type="button" className="register-button">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

const mapStateToProps = (state: StoreState): { toggleLoginModal: boolean, toggleRegisterModal: boolean } => {
    return {
        toggleLoginModal: state.modal.toggleLoginModal,
        toggleRegisterModal: state.modal.toggleRegisterModal
    };
};

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.ResetTogglesModal }),
        toggleLogin: () => dispatch<IToggleLogin>({ type: ModalActionTypes.ToggleLoginModal }),
        toggleRegister: () => dispatch<IToggleRegister>({ type: ModalActionTypes.ToggleRegisterModal })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);