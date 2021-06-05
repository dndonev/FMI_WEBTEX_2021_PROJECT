import React from 'react';
import './login.styles.scss';
import loginImage from '../../assets/login.svg';
import { headers, LoginModalProps } from './login.types';
import { Dispatch } from 'redux';
import { IResetToggles, TModalReducerActions } from '../../redux/modal-visibility/modal.action';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { validationSchema } from './login.types';
import { useFormik } from 'formik';
import axios from 'axios';
import { LoginState, User, UserActionTypes } from '../../redux/user/user.types';
import { ILoginError, ILoginSuccess, TUserReducerActions } from '../../redux/user/user.actions';
import { push, CallHistoryMethodAction } from "connected-react-router";

const LoginComponent: React.FC<LoginModalProps> = ({ ...props }) => {
    const { resetTogglesModalAction, show, handleClose, handleDontHaveAnAccoutLink, handleOpenForgotPassword,
        loginSuccessAction, loginErrorAction,redirectToHome } = props;

    const modalVisibilityClassName = show ? "modal display-none" : " modal display-block";

    const handleLogin = (user: any) => {
        return axios
            .post('http://localhost:3001/api/auth/login', {
                email: user.email,
                password: user.password
            }, {headers: headers})
            .then((response: any) => {
                loginSuccessAction(user);
                redirectToHome();
                return response.data;
            })
            .catch((error: any) => {
                loginErrorAction(error);
            })
    }

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            const { email, password } = values;
            handleLogin(values);
        },
        validateOnBlur: true,
        validationSchema
    });

    const handleCloseLogin = () => {
        handleSubmit();
        redirectToHome();
        resetTogglesModalAction();
        handleClose();
    }

    return (
        <div className={clsx("login-container", modalVisibilityClassName)}>
            <div className="base-container">
                <AiFillCloseCircle className='close-button' onClick={handleCloseLogin} />

                <div className="login-header">
                    Personal Cloud
                </div>
                <div className="content">
                    <div className="image">
                        <img src={loginImage} />
                    </div>

                    <div className="form">
                        <form onSubmit={handleCloseLogin}>
                        <div className="form-group">
                            <input type="email" name="email" placeholder="email" onChange={handleChange} value={values.email} />
                        </div>

                        <div className="form-group">
                            <input type="password" name="password" placeholder="password" onChange={handleChange} value={values.password}/>
                        </div>

                        <div className="links">
                            <div className="forgotten-password">
                                <Link to='/' onClick={handleOpenForgotPassword}>Forgot password?</Link>
                            </div>
                            <div className="dont-have-account-yet">
                                <Link to='/' onClick={handleDontHaveAnAccoutLink}>Don't have an account yet?</Link>
                            </div>
                        </div>

                        <div className="footer">
                            <button type="submit" className="login-button">Login</button>
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
        loginSuccessAction: (data: User) => dispatch<ILoginSuccess>({ type: UserActionTypes.LoginSuccess, data: data }),
        loginErrorAction: (error: any) => dispatch<ILoginError>({type: UserActionTypes.LoginError, data: error}),
        redirectToHome: () => dispatch(push('/main')),
    };
};

export default connect(null, mapDispatchToProps)(LoginComponent);