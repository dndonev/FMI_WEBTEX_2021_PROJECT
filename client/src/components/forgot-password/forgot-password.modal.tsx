import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ForgotPasswordTypes } from './forgot-password.types';
import { IResetToggles, IToggleForgotPassword, TModalReducerActions } from '../../redux/modal-visibility/modal.action';
import { Dispatch } from 'redux';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { connect } from 'react-redux';
import './forgot-password.styles.scss'

const ForgotPasswordModal: React.FC<ForgotPasswordTypes> = ({...props}) => {
    const {show, handleClose, resetTogglesModalAction, toggleForgotPasswordAction, handleHaveAnAccoutLink, handleDontHaveAnAccountLink} = props;
    const modalVisibilityClassName = show ? "modal display-none" : " modal display-block";

    const handleCloseForgotPassword = () => {
        resetTogglesModalAction();
        handleClose();
    }

    return (
        <div className={clsx("forgot-password-container", modalVisibilityClassName)} onSubmit={handleCloseForgotPassword}>
            <div className="base-container">
                <AiFillCloseCircle className='close-button' onClick={handleCloseForgotPassword} />

                <div className="forgot-password-header">
                    Personal Cloud
                </div>
                <div className="content">
                    <div className="form">
                        <div className="form-group">
                            <input type="email" name="email" placeholder="email"/>
                        </div>
                        <div>We will send you a recovery email</div>
                        <div className="footer">
                            <button type="button" className="send-button" >Send email</button>
                        </div>
                        <div className="links">
                            <div className="forgotten-password">
                               <div> Return to 
                                    <Link to='/' onClick={handleHaveAnAccoutLink}> the Sign in </Link>
                                    screen   
                                </div> 
                            </div>
                            <div className="dont-have-account-yet">
                                <Link to='/' onClick={handleDontHaveAnAccountLink}>Don't have an account yet?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch<TModalReducerActions>) => {
    return {
        resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.ResetTogglesModal }),
        toggleForgotPasswordAction: () => dispatch<IToggleForgotPassword>({type: ModalActionTypes.ToggleForgotPasswordModal})
    };
};

export default connect(null, mapDispatchToProps)(ForgotPasswordModal);