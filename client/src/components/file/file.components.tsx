import React, { useState } from 'react';
import Axios from 'axios';
import FileSaver, { saveAs } from 'file-saver';

import './file.styles.scss';

import fileLogo from '../../assets/file-2.png';
import folderLogo from '../../assets/directory-logo.png';
import imageLogo from '../../assets/image-file-logo.png'
import pdfLogo from '../../assets/pdf-file-logo.png';
import excelLogo from '../../assets/excel-file-logo.png';
import presentationLogo from '../../assets/presentation-file-logo.png';

import { FileComponentProps } from './file.types';

const FileComponent: React.FC<FileComponentProps> = ({ ...props }) => {

	const file = props;

	let logo = fileLogo;

	if (file.type === 'file') {
		if (file.extention === 'jpg' || file.extention === 'png' || file.extention === 'jpeg') {
			logo = imageLogo;
		} else if (file.extention === 'pdf') {
			logo = pdfLogo;
		} else if (file.extention === 'xlsx') {
			logo = excelLogo;
		} else if (file.extention === 'pptx') {
			logo = presentationLogo;
		} else {
			logo = fileLogo;
		}
	} else if (file.type === 'folder') {
		logo = folderLogo;
	}


	const downloadUrl = `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : 'http://localhost:3001'}/api/files/${file.fileName}/${file.id}`;
	const token = sessionStorage.getItem('accessToken');

	const headers = {
		headers: {
			'Authorization': `Bearer ${token}`,
			responeType: 'blob'
		}
	};

	let newFile: File;

	const handleDownload = async () => {
		try {
			newFile = (await Axios.get<File>(downloadUrl, headers,)).data;
			let downloadedFile = new Blob([newFile], { type: 'image/png' });
			FileSaver.saveAs(downloadedFile, file.fileName);
			console.log(file.fileName);
		} catch (err) {
			console.log(err);
		}
	}

	const onClick = file.clicked;

	return (
		<div className="file-box" onClick={handleDownload}>
			<img src={logo} className="file-image" />
			<span className="file-name"><strong>{file.fileName.length > 10 ? file.fileName.substring(0, 10) + "..." : file.fileName}</strong></span>
			{/* <span>{file.ownerId}</span> */}
		</div>
	);
};

export default FileComponent;