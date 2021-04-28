import React, { useState } from 'react';
import './login.styles.scss';
import loginImage from '../../assets/login.svg';
import { LoginModalProps } from './login.types';
import { Dispatch } from 'redux';
import { IResetToggles, IToggleLogin, IToggleRegister, TModalReducerActions } from '../../redux/modal-visibility/modal.action';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { StoreState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { AiFillCloseCircle } from "react-icons/ai";
import { selectLoginModal, selectRegisterModal } from '../../redux/modal-visibility/modal.selectors';
import { Link } from 'react-router-dom';
import RegisterModal from '../register/register.componet'

const LoginComponent: React.FC<LoginModalProps> = ({ ...props }) => {
    const { toggleRegisterModal, toggleLoginModal, resetTogglesModalAction, toggleLogin, toggleRegister, show, handleClose } = props;
    
    const modalVisibilityClassName = show ? "modal display-none" : " modal display-block";

    const handleCloseLogin = () => {
        resetTogglesModalAction();
        handleClose();
    }


    return (
        <div className={clsx("login-container", modalVisibilityClassName)} onSubmit={handleCloseLogin}>
            <div className="base-container">
                <AiFillCloseCircle className='close-button' onClick={handleCloseLogin} />

                <div className="login-header">
                    Login
                </div>
                <div className="content">
                    <div className="image">
                        <img src={loginImage} />
                    </div>

                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="email"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="password" />
                        </div>

                        <div className="links">
                            <div className="forgotten-password">
                                <Link to='/'>Forgot password?</Link>
                            </div>
                            <div className="dont-have-account-yet">
                                <Link to='/'>Don't have an account yet?</Link>
                            </div>
                        </div>

                        <div className="footer">
                            <button type="button" className="login-button" >Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: StoreState): { toggleLoginModal: boolean, toggleRegisterModal: boolean } => {
    return {
        toggleLoginModal: selectLoginModal(state),
        toggleRegisterModal: selectRegisterModal(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.ResetTogglesModal }),
        toggleLogin: () => dispatch<IToggleLogin>({ type: ModalActionTypes.ToggleLoginModal }),
        toggleRegister: () => dispatch<IToggleRegister>({ type: ModalActionTypes.ToggleRegisterModal })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);