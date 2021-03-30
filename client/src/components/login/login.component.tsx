import React from 'react';
import './login.styles.scss';
import loginImage from '../../assets/login.svg';

const LoginComponent = () => {
    return (
        <div className="login-container">
            <div className="base-container">
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
                            <input type="email" name="email" placeholder="email"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="password" placeholder="password"/>
                        </div>

                        <div className="links">
                            <div className="forgotten-password">
                                <a href="url">Forgotten password</a>
                            </div>
                            <div className="dont-have-account-yet">
                             <a href="url">Don't have an account yet</a>
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

export default LoginComponent;