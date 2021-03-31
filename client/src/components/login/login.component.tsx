import React, { useState } from 'react';
import './login.styles.scss';
import loginImage from '../../assets/login.svg';
import { LoginModalProps } from './login.types'
import RegisterModal from '../register/register.componet';
import { Dispatch } from 'redux';
import { IResetToggles, IToggleLogin, IToggleRegister, TModalReducerActions } from '../../redux/modal-visibility/modal.action';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { StoreState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import clsx from 'clsx'
import { AiFillCloseCircle } from "react-icons/ai"
import { IconButton } from '@material-ui/core';
const LoginComponent: React.FC<LoginModalProps> = ({ ...props }) => {
    const { toggleRegisterModal, toggleLoginModal, resetTogglesModalAction, toggleLogin, toggleRegister, show, handleClose } = props;

    const modalVisibilityClassName = show ? "modal display-none" : " modal display-block";
    const handleCloseLogin = () => {
        resetTogglesModalAction();
        handleClose()
    }

    return (
        <div className={clsx("login-container", modalVisibilityClassName)} onSubmit={handleCloseLogin}>
            <div className="base-container">
                    <AiFillCloseCircle className='close-button' onClick={handleCloseLogin}/>
                
                <div className="header">
                    Login
                </div>
                <div className="content">
                    <div className="image">
                        <img src={loginImage} />
                    </div>

                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="password" placeholder="password" />
                        </div>

                        <div className="links">
                            <div className="forgotten-password">
                                <a href="url">Forgotten password</a>
                            </div>
                            <div className="dont-have-account-yet">
                                <a href="url">Don't have an account yet?</a>
                            </div>
                        </div>

                        <div className="footer">
                            <button type="button" className="btn">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state: StoreState): { toggleLoginModal: boolean, toggleRegisterModal: boolean } => {
    return {
        toggleLoginModal: state.modal.toggleLoginModal,
        toggleRegisterModal: state.modal.toggleRegisterModal
    }
}
const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.ResetTogglesModal }),
        toggleLogin: () => dispatch<IToggleLogin>({ type: ModalActionTypes.ToggleLoginModal }),
        toggleRegister: () => dispatch<IToggleRegister>({ type: ModalActionTypes.ToggleRegisterModal })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);