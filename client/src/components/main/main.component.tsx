import './main.styles.scss'

import SideBarComponent from './../sidebar/sidebar.component'
import HeaderComponent from './../header/header.component'
import SearchBoxComponent from './../search-box/search-box.component'

const MainComponent = () => {
	return (
		<div className="main-container">
			<HeaderComponent />
			<div className="middle-container">
				<div className="sidebar">
					<SideBarComponent />
				</div>
				<div className="files-container">
					<div className="search-box-container">
						<SearchBoxComponent />
					</div>
					<div className="file-container"></div>
				</div>

			</div>
		</div>
	)
}

export default MainComponent;