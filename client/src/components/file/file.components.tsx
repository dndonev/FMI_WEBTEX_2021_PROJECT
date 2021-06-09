import React, { useState } from 'react';
import './file.styles.scss';
import logo from '../../assets/file-2.png';

import { FileComponentProps } from './file.types';

const FileComponent: React.FC<FileComponentProps> = ({...props}) => {

	const { file } = props;

    return (
		<div className="file-box">
			<img src={logo} className="file-image" />
			<span><strong>{file.fileName}</strong></span>
			<span>{file.ownerId}</span>
		</div>
    );
};

export default FileComponent;