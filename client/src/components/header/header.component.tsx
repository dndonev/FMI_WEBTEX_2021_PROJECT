import React from 'react';
import './header.styles.scss';
import UserInfoComponent from '../user-info/userinfo.component';

const HeaderComponent = () => {

	return (
		<div className="header">
			<UserInfoComponent><button className="user-information" type="button">User information</button></UserInfoComponent>
			<button className="login-button" type="button"> log out </button>
		</div>
	);
};

export default HeaderComponent;