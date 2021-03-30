import './main.styles.scss'

import SideBarComponent from './../sidebar/sidebar.component'
import HeaderComponent from './../header/header.component'
import SearchBoxComponent from './../search-box/search-box.component'
import FileComponent from './../file/file.components'

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
					<div className="file-container">
						<FileComponent />
						<FileComponent />
						<FileComponent />
						<FileComponent />
						<FileComponent />
						<FileComponent />
					</div>
				</div>

			</div>
		</div>
	)
}

export default MainComponent;