import React, { useState } from 'react';
import Axios from 'axios';

import { UploadComponentProps } from './upload.types';
import { File } from '../../interfaces/file';

import './upload.styles.scss';
import logo from '../../assets/upload-logo.png';
import { Directory } from '../../interfaces/directory';
import { headers } from '../login/login.types';

const UploadComponent: React.FC<UploadComponentProps> = ({ ...props }) => {

	const { file } = props;

	const [fileToUpload, setFile] = React.useState<any>({});
	const [filename, setFileName] = useState('No file selected');

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files!;

		setFileName(fileList[0].name);
		console.log(filename);

		setFile(fileList[0]);
		console.log(fileToUpload);
		
	}

	const fileUploadURL = "http://localhost:3001/api/files/upload";

	const getRootDir = 'http://localhost:3001/api/directories/root';

	const token = sessionStorage.getItem('accessToken');	
	
	const headersDBUpload = { 
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		  }
		};

	const headersLocalUpload = { 
		headers: {
			'Content-Type': 'multipart/form-data',
			'Authorization': `Bearer ${token}`
		  }
		};

	const onSubmit = async () => {
		const formData = new FormData();
		formData.append('file', fileToUpload);

		let root: Directory;
		let tempFile: File;
		let uploadedFile: File;

		try { 
			root = (await Axios.get<Directory>(getRootDir, headersDBUpload)).data;
			
			const nameSplit = filename.split('.');
			const extention = nameSplit.splice(-1,1).pop();

			tempFile = ( await Axios.post<File>(fileUploadURL, {
				fileName: filename,
				directoryId: root.id, 
				extention: extention
			}, headersDBUpload)).data;

			let fileID = tempFile.id;

			const fileUploadLocalURL = `http://localhost:3001/api/files/upload/${tempFile.id}`;

			uploadedFile = await (await (Axios.post<File>(fileUploadLocalURL, formData, headersDBUpload))).data;
		} catch (err) {
			console.log(err);
		}		
	}

    return (
			<div className="upload-files-container">
        		<div className="drop-files">
					<div className="drop-logo">
						<img src={logo} className='upload-image' />
					</div>
					<div className="file-status">
						<label className="file-name-path">
							{ filename }
						</label>
					</div>
					<div className="choose-file">
						<input accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" type="file" id="file" onChange={onChange} hidden/>
						<label htmlFor='file' className="browse-button" id="file"> 
							Choose file
						</label>
					</div>
					<div className="file-upload">
						<button className='upload-button' onClick={onSubmit}>Upload</button>
					</div>
               	</div>
			</div>
    )
}

export default UploadComponent;