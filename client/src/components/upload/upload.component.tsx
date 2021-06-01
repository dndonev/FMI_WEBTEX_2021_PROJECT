import './upload.styles.scss';
import logo from '../../assets/upload-logo.png';


const UploadComponent = () => {

    return (
        // <div className="upload-main-container">
		// 	<HeaderComponent />
		// 	<div className="upload-middle-container">
		// 		<div className="upload-sidebar">
		// 			<SideBarComponent />
		// 		</div>
				<div className="upload-files-container">
                    <div className="drop-files">
						<div className="drop-logo">
							<img src={logo} className='upload-image' />
						</div>
                        <div className="drop-message">
							<p>Drag and Drop files</p>
						</div>
                    </div>
				</div>

		// 	</div>
		// </div>
    )
}

export default UploadComponent;