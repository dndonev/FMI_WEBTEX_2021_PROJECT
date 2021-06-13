import React, { useState, useEffect}from 'react';
import Axios from 'axios';

import SearchBoxComponent from './../search-box/search-box.component';
import FileComponent from './../file/file.components';

import { FileContainerProps } from './files.types';
import { Directory } from '../../interfaces/directory';

const FilesContainerComponent: React.FC<FileContainerProps> = ({ ...props }) => {
	
	const [files, setFiles] = useState<FileContainerProps[]>([]);

	const [error, setError]: [string, (error: string) => void] = useState('');

	const getRootDir = 'http://localhost:3001/api/directories/root';
	const createRootDir = 'http://localhost:3001/api/directories/root';
	const headers = {
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
		}};

	const getCurrentDir = async () => {
		let root: Directory;
		try {
			root = (await Axios.get<Directory>(getRootDir, headers)).data;
			if (!root) {
				root = (await Axios.post<Directory>(createRootDir, headers)).data;
			}
			setFiles(root.files)
		} catch (e) {
			setError(e);
		}
	}

	useEffect(() => {
		getCurrentDir();
	}, [files]);

	const renderFiles = files.map(file => {
		return (
			<FileComponent file={file}/>
		)
	})

    return (
        <div className='main-files-container'>
            <div className='search-box-container'>
				<SearchBoxComponent />
			</div>
		    <div className='file-container'>
				{ renderFiles }
			</div>
        </div>
    )
}

export default FilesContainerComponent;