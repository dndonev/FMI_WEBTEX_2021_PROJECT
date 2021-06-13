import React, { useState } from 'react';
import Axios from 'axios';

import { UploadComponentProps } from './upload.types';
import { File } from '../../interfaces/file';

import './upload.styles.scss';
import logo from '../../assets/upload-logo.png';

const UploadComponent: React.FC<UploadComponentProps> = ({ ...props }) => {

	const { file } = props;

	const [fileToBeUpload, setFile] = React.useState<any>({});
	const [filename, setFileName] = useState('No file selected');
	const [uploadedFile, setUploadedFile] = React.useState<any>({});
	const [fileID, setFileID] = React.useState<any>({});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files!;

		setFile(fileList[0]);
		console.log(file);
		
		setFileName(fileList[0].name);
		console.log(filename);
	}

	const fileUploadURL = "http://localhost:3001/api/files/upload";

	const token = localStorage.getItem('accessToken');	


	const onSubmit = async () => {
		const formData = new FormData();
		formData.append('file', fileToBeUpload);


		//const file = await Axios.post(fileUploadURL)
		// Axios.post<File>(fileUploadURL, formData, {
		// 		headers: {
		// 			"Authorization": `Bearer ${token}`,
		// 			"Content-Type": "multipart/form-data"
		// 		}})
		//     	.then(res => {
		// 			const { fileName, directory, type} = res.data;
		// 			setUploadedFile({ fileName, directory, type });
		// 			console.log(res.data);
		//     	})
		//     	.catch(err => {
		// 			if (err.status === 500) {
		// 				console.log("Server error");
		// 			}
		//     	});
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