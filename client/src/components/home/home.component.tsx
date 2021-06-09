import React, { useState } from 'react';
import './home.styles.scss';
import logo from '../../assets/logo.png';
import RegisterModal from '../register/register.componet';
import LoginComponent from '../login/login.component';

import { HomeComponentProps } from './home.types';
import { IResetToggles, IToggleLogin, IToggleRegister, TModalReducerActions } from '../../redux/modal-visibility/modal.action';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { connect } from "react-redux";
import { Dispatch } from "redux";

const HomeComponent: React.FC<HomeComponentProps> = ({ ...props }) => {
    const { toggleLogin, toggleRegister, resetTogglesModalAction } = props;
    const [loginVisibility, setLoginVisibility] = useState(true);
    const [registerVisibility, setRegisterVisibility] = useState(true);

    const handleOpenLogin = () => {
        setLoginVisibility(false);
        toggleLogin();
        setRegisterVisibility(true);
    }
    const handleOpenRegister = () => {
        setRegisterVisibility(false);
        toggleRegister();
        setLoginVisibility(true);
    }

    const handleClose = () => {
        setLoginVisibility(true);
        setRegisterVisibility(true);
        resetTogglesModalAction();
    }

    return (
        <div className='home-container'>
            <LoginComponent show={loginVisibility} handleClose={handleClose} />
            <RegisterModal show={registerVisibility} handleClose={handleClose} />
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
        toggleLogin: () => dispatch<IToggleLogin>({ type: ModalActionTypes.ToggleLoginModal }),
        toggleRegister: () => dispatch<IToggleRegister>({ type: ModalActionTypes.ToggleRegisterModal }),
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.ResetTogglesModal })
    }
}

export default connect(null, mapDispatchToProps)(HomeComponent);