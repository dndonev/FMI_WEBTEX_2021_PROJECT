import SearchBoxComponent from './../search-box/search-box.component';
import FileComponent from './../file/file.components';
import React from 'react';
import { FileComponentProps } from './files.types';
const FilesContainerComponent: React.FC<FileComponentProps> = ({ ...props }) => {
    return (
        <div className="main-files-container">
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
                <FileComponent />
				<FileComponent />
				<FileComponent />
				<FileComponent />
				<FileComponent />
				<FileComponent />
                <FileComponent />
                <FileComponent />
			</div>
        </div>
    )
}

export default FilesContainerComponent;