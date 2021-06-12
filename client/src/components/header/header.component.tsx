import axios from 'axios';
import { CallHistoryMethodAction, push } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ILogoutError, ILogoutSucces, TUserReducerActions } from '../../redux/user/user.actions';
import { UserActionTypes } from '../../redux/user/user.types';
import { headers } from '../login/login.types';
import UserInfoComponent from '../user-info/userinfo.component';
import './header.styles.scss';
import { HeaderTypes } from './header.types';

const HeaderComponent:React.FC<HeaderTypes> = ({...props}) => {

	const {logoutUserSuccessAction, logoutUserErrorAction, redirectToHome} = props;

	const handleLogout = () => {
		const refreshToken = localStorage.getItem('refreshToken')
		return axios
            .post('http://localhost:3001/api/auth/logout', {
                token: refreshToken
            }, {headers: headers})
            .then((response: any) => {
				logoutUserSuccessAction();
				redirectToHome();
            })
            .catch((error: any) => {
				logoutUserErrorAction(error);
            });
	}
	return (
		<div className = "header">
			<UserInfoComponent>
				<button className="user-information" type="button">User information</button>
			</UserInfoComponent>
			<button className = "logout-button" type = "button" onClick={handleLogout}> log out </button>
		</div>
	);
};

const mapDispatchToProps = (dispatch: Dispatch<TUserReducerActions | CallHistoryMethodAction>) => {
    return {
		logoutUserSuccessAction: () => dispatch<ILogoutSucces>({type: UserActionTypes.LogoutSuccess}),
		logoutUserErrorAction: (data: string) => dispatch<ILogoutError>({type: UserActionTypes.LogoutError, data: data}),
        redirectToHome: () => dispatch(push('/')),
    };
};

export default connect(null,mapDispatchToProps)(HeaderComponent);