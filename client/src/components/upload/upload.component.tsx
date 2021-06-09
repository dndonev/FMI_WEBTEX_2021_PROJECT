import './upload.styles.scss';
import logo from '../../assets/upload-logo.png';
import React from 'react';
import { UploadComponentProps } from './upload.types';

const UploadComponent: React.FC<UploadComponentProps> = ({ ...props }) => {

    return (
				<div className="upload-files-container">
                    <div className="drop-files">
						<div className="drop-logo">
							<img src={logo} className='upload-image' />
						</div>
                        <div className="drop-message">
							<p>Drag and Drop files</p>
						</div>
						<button className='browse-button'>Browse</button>
                    </div>
				</div>

		// 	</div>
		// </div>
    )
}

export default UploadComponent;