import React from 'react'

import './main.styles.scss'

import SideBarComponent from './../sidebar/sidebar.component'
import HeaderComponent from './../header/header.component'

const MainComponent = () => {
	return (
		<div className="main-container">
			<HeaderComponent />
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