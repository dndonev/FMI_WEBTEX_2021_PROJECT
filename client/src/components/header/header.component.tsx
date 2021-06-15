import axios from 'axios';
import { CallHistoryMethodAction, push } from 'connected-react-router';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IResetToggles, IToggleUserInfo, TModalReducerActions } from '../../redux/modal-visibility/modal.action';
import { ModalActionTypes } from '../../redux/modal-visibility/modal.types';
import { StoreState } from '../../redux/root-reducer';
import { ILogoutError, ILogoutSucces, TUserReducerActions } from '../../redux/user/user.actions';
import { selectCurrentUser, selectRegisteredUser } from '../../redux/user/user.selectors';
import { User, UserActionTypes } from '../../redux/user/user.types';
import { headers } from '../login/login.types';
import UserInfoComponent from '../user-info/userinfo.component';
import './header.styles.scss';
import { HeaderTypes } from './header.types';

const HeaderComponent: React.FC<HeaderTypes> = ({ ...props }) => {

	const { currentUser, logoutUserSuccessAction, logoutUserErrorAction, redirectToHome, toggleUserInfoModalAction, resetTogglesModalAction, registeredUser } = props;
	const [modalVisibillity, setModalVisibillity] = useState(true);
	const handleLogout = () => {
		const refreshToken = localStorage.getItem('refreshToken')
		return axios
			.post(`${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : 'http://localhost:3001'}/api/auth/logout`, {
				token: refreshToken
			}, { headers: headers })
			.then((response: any) => {
				logoutUserSuccessAction();
				localStorage.clear();
				redirectToHome();
			})
			.catch((error: any) => {
				logoutUserErrorAction(error);
			});
	}

	const handleOpenUserInfo = () => {
		setModalVisibillity(false);
		toggleUserInfoModalAction();
	}

	const handleClose = () => {
		setModalVisibillity(true);
		resetTogglesModalAction();
	}
	return (
		<React.Fragment>
			<div className="header">
				<UserInfoComponent  show={modalVisibillity} handleClose={handleClose} />
				<button className="user-information" type="button" onClick={handleOpenUserInfo}>User information</button>
				<button className="logout-button" type="button" onClick={handleLogout}> log out </button>
			</div>
		</React.Fragment>

	);
};

const mapStateToProps = (state: StoreState): { currentUser: User, registeredUser: boolean } => {
	return {
		currentUser: selectCurrentUser(state),
		registeredUser: selectRegisteredUser(state)
	}
}

const mapDispatchToProps = (dispatch: Dispatch<TUserReducerActions | CallHistoryMethodAction | TModalReducerActions>) => {
	return {
		logoutUserSuccessAction: () => dispatch<ILogoutSucces>({ type: UserActionTypes.LogoutSuccess }),
		logoutUserErrorAction: (data: string) => dispatch<ILogoutError>({ type: UserActionTypes.LogoutError, data: data }),
		redirectToHome: () => dispatch(push('/')),
		resetTogglesModalAction: () => dispatch<IResetToggles>({ type: ModalActionTypes.ResetTogglesModal }),
		toggleUserInfoModalAction: () => dispatch<IToggleUserInfo>({ type: ModalActionTypes.ToggleUserInfoModal })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);