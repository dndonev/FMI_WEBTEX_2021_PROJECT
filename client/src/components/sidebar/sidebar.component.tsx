import React from 'react'

import './sidebar.styles.scss'

const SideBarComponent = () => {
	return (
		<div className="container">
			<ul className="nav-list">
				<li>My Files</li>
				<li>Shared with me</li>
				<li>Upload File</li>
			</ul>
		</div>
	)
}

export default SideBarComponent;