import React from 'react'

import './main.styles.scss'

import SideBarComponent from './../sidebar/sidebar.component'

const MainComponent = () => {
	return (
		<div className="main-container">
			<div className="header">
				<button className="login-button" type="button">log out</button>
			</div>
			<div className="middle-container">
				<div className="sidebar">
					<SideBarComponent />
				</div>
				<div className="files-container">
					<div className="search-box">to be component</div>
					<div className="file-container"></div>
				</div>

			</div>
		</div>
	)
}

export default MainComponent;