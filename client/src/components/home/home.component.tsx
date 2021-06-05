import React, { useState } from 'react';
import './home.styles.scss';
import logo from '../../assets/logo.png';
import RegisterModal from '../register/register.componet';
import LoginComponent from '../login/login.component';
import { HomeComponentProps } from './home.types';
import { IResetToggles, IToggleForgotPassword, IToggleLogin, IToggleRegister, TModalReducerActions } from '../../redux/modal-visibility/modal.action';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import ForgotPasswordModal from '../forgot-password/forgot-password.modal';

const HomeComponent: React.FC<HomeComponentProps> = ({ ...props }) => {
    const { toggleLoginAction, toggleRegisterAction, resetTogglesModalAction, toggleForgotPasswordAction } = props;

    const [loginVisibility, setLoginVisibility] = useState(true);
    const [registerVisibility, setRegisterVisibility] = useState(true);
    const [forgotPasswordVisibility, setForgotPasswordVisibility] = useState(true);

    const handleOpenLogin = () => {
        setLoginVisibility(false);
        toggleLoginAction();
        setRegisterVisibility(true);
        setForgotPasswordVisibility(true);
    }
    const handleOpenRegister = () => {
        setRegisterVisibility(false);
        toggleRegisterAction();
        setLoginVisibility(true);
        setForgotPasswordVisibility(true);
    }

    const handleOpenForgotPassword = () => {
        setLoginVisibility(true);
        setRegisterVisibility(true);
        setForgotPasswordVisibility(false);
    }

    const handleClose = () => {
        setLoginVisibility(true);
        setRegisterVisibility(true);
        setForgotPasswordVisibility(true);
        resetTogglesModalAction();
    }

    return (
        <div className='home-container'>
            <LoginComponent show={loginVisibility} handleClose={handleClose} handleDontHaveAnAccoutLink={handleOpenRegister} handleOpenForgotPassword={handleOpenForgotPassword}/>
            <RegisterModal show={registerVisibility} handleClose={handleClose} handleHaveAccountLink={handleOpenLogin} handleOpenForgotPassword={handleOpenForgotPassword}/>
            <ForgotPasswordModal show={forgotPasswordVisibility} handleClose={handleClose} handleHaveAnAccoutLink={handleOpenLogin} handleDontHaveAnAccountLink={handleOpenRegister}/>
            <div className='main-container'>
                <div className='logo-container'>
                    <img className='logo-image' src={logo} />
                    <span className='logo-sign'>Personal Cloud</span>
                </div>
                <div className='button-container'>

                    <button className='sign-button' onClick={handleOpenLogin}>log in</button>
                    <button className='sign-button' onClick={handleOpenRegister}>register</button>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        toggleLoginAction: () => dispatch<IToggleLogin>({ type: ModalActionTypes.ToggleLoginModal }),
        toggleRegisterAction: () => dispatch<IToggleRegister>({ type: ModalActionTypes.ToggleRegisterModal }),
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.ResetTogglesModal }),
        toggleForgotPasswordAction: () => dispatch<IToggleForgotPassword>({type: ModalActionTypes.ToggleForgotPasswordModal})
    }
}

export default connect(null, mapDispatchToProps)(HomeComponent);