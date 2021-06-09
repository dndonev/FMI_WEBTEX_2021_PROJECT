import React, { useState, useEffect}from 'react';
import Axios from 'axios';

import SearchBoxComponent from './../search-box/search-box.component';
import FileComponent from './../file/file.components';

import { File } from'../../../../server/interfaces/file';
import { FileContainerProps } from './../files-container/files.types';

const SharedComponent: React.FC<FileContainerProps> = ({ ...props }) => {
	
	const [files, setFiles]: [FileContainerProps[], (files: FileContainerProps[]) => void] = React.useState<FileContainerProps[]>([]);

	const [error, setError]: [string, (error: string) => void] = React.useState("");

	const sharedFilesUrl = "http://localhost:3001/api/files/";

	const getSharedFiles = () => {
		Axios.get<FileContainerProps[]>(sharedFilesUrl, {
			headers: {
			  "Content-Type": "application/json"
			}})
			.then((res) => {
				console.log(res.data);
                setFiles(res.data);
			})
			.catch(err => {
				const error = err.response.status === 404 ? "Source not found" : "Unexpected error";
				setError(error);
			})
	}

	React.useEffect(() => {
		getSharedFiles();
	}, []);


	const renderSharedFiles = files.length && files.map(file => {
		return (
		    <FileComponent file={file}/>
		)
	})

    return (
        <div className="main-files-container">
            <div className="search-box-container">
				<SearchBoxComponent />
			</div>
		    <div className="file-container">
				{ renderSharedFiles }
			</div>
        </div>
    )
}

export default SharedComponent;