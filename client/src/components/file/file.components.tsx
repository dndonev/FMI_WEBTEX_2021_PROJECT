import React, { useState } from 'react';

import './file.styles.scss';

import fileLogo from '../../assets/file-2.png';
import folderLogo from '../../assets/directory-logo.png';
import imageLogo from '../../assets/image-file-logo.png'
import pdfLogo from '../../assets/pdf-file-logo.png';
import excelLogo from '../../assets/excel-file-logo.png';
import presentationLogo from '../../assets/presentation-file-logo.png';

import { FileComponentProps } from './file.types';

const FileComponent: React.FC<FileComponentProps> = ({...props}) => {

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

    return (
		<div className="file-box">
			<img src={ logo } className="file-image" />
			<span className="file-name"><strong>{file.fileName}</strong></span>
			{/* <span>{file.ownerId}</span> */}
		</div>
    );
};

export default FileComponent;