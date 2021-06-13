import React, { useState, useEffect}from 'react';
import Axios from 'axios';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StoreState } from './../../redux/root-reducer';

import SearchBoxComponent from './../search-box/search-box.component';
import FileComponent from './../file/file.components';

import { FileContainerProps } from './files.types';
import { Directory } from '../../interfaces/directory';
import { File } from '../../interfaces/file';
import { IDirectory, IDirectoryError, IDirectorySuccess, TDirectoryReducerActions } from '../../redux/directory/directory.actions';
import { DirectoryActionTypes, DirectoryState } from '../../redux/directory/directory.types';
import { selectChildDirectories, selectCurrentDirectory, selectDirectoryFiles } from '../../redux/directory/directory.selectors';

const FilesContainerComponent: React.FC<FileContainerProps> = ({ ...props }) => {
	
	const { getCurrentDirectoryAction,
		getCurrentDirectoryActionSuccess,
		getCurrentDirectoryActionError,
		directory,
		childDirectories,
		files
	} = props;

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
			getCurrentDirectoryAction();
			root = (await Axios.get<Directory>(getRootDir, headers)).data;
			if (!root) {
				root = (await Axios.post<Directory>(createRootDir, headers)).data;
			}
			getCurrentDirectoryActionSuccess(root);
		} catch (e) {
			getCurrentDirectoryActionError();
		}
	}

	useEffect(() => {
		getCurrentDir();
	}, []);

	const renderFiles = files && files.length && files.map((file: File) => {
		return (
			<FileComponent 
				fileName={ file.fileName }
				ownerId={ file.ownerId}
				extention={ file.extention }
				id={ file.id}
				directory={ file.directory }
				type={ file.type }
				created={ file.created}
			/>
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

const mapStateToProps = (state: StoreState): DirectoryState => {
	return {
		files: selectDirectoryFiles(state),
		childDirectories: selectChildDirectories(state),
		directory: selectCurrentDirectory(state)
	};
};


const mapDispatchToComponentProps = (dispatch: Dispatch<TDirectoryReducerActions>) => {
	return {
		getCurrentDirectoryAction: () => dispatch<IDirectory>({ type: DirectoryActionTypes.GetDirectory }),
		getCurrentDirectoryActionSuccess: (data: Directory) => dispatch<IDirectorySuccess>({ type: DirectoryActionTypes.GetDirectorySuccess, data: data }),
		getCurrentDirectoryActionError: () => dispatch<IDirectoryError>({ type: DirectoryActionTypes.GetDirectoryError})
	}
}

export default connect(mapStateToProps, mapDispatchToComponentProps)(FilesContainerComponent);