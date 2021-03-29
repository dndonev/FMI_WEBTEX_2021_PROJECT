import React from 'react'

import './main.styles.scss'

const MainComponent = () => {
	return (
		<div className="main-container">
			<div className="header">
				<button className="login-button" type="button">log out</button>
			</div>
			<div className="siderbar"></div>
			<div className="files-container">
				<div className="search-box">to be component</div>
				<div className="file-container"></div>
			</div>
		</div>
	)
}

export default MainComponent;