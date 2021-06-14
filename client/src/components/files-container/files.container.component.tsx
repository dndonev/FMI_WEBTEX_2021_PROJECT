import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StoreState } from './../../redux/root-reducer';
import FileComponent from './../file/file.components';

import { FileContainerProps } from './files.types';
import { Directory } from '../../interfaces/directory';
import { File } from '../../interfaces/file';
import { IDirectory, IDirectoryError, IDirectorySuccess, TDirectoryReducerActions } from '../../redux/directory/directory.actions';
import { DirectoryActionTypes, DirectoryState } from '../../redux/directory/directory.types';
import { selectChildDirectories, selectCurrentDirectory, selectDirectoryFiles } from '../../redux/directory/directory.selectors';

const FilesContainerComponent: React.FC<FileContainerProps> = ({ ...props }) => {

	const {
		getCurrentDirectoryAction,
		getCurrentDirectoryActionSuccess,
		getCurrentDirectoryActionError,
		directory,
		childDirectories,
		files
	} = props;

	const getRootDir = `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : 'http://localhost:3001'}/api/directories/root`;
	const headers = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
		}
	};

	const getCurrentDir = async () => {
		let root: Directory;
		try {
			getCurrentDirectoryAction();
			root = (await Axios.post<Directory>(getRootDir, {}, headers)).data;
			getCurrentDirectoryActionSuccess(root);
		} catch (e) {
			getCurrentDirectoryActionError();
		}
	}

	useEffect(() => {
		getCurrentDir();
	}, []);

	const renderFiles = files && files.length !== 0 && files.map((file: File) => {
		return (
			<FileComponent clicked={null}
				fileName={file.fileName}
				ownerId={file.ownerId}
				extention={file.extention!}
				id={file.id}
				directory={file.directory}
				type={file.type}
				created={file.created}
			/>
		)
	});

	const onDirectoryClick: (directory: Directory) => void = (newDir: Directory) => {
		return function click() { return getCurrentDirectoryActionSuccess(newDir) }
	}

	const renderChildDirectories = childDirectories && childDirectories.length !== 0 && childDirectories.map((childDir: Directory) => {
		return (
			<FileComponent clicked={onDirectoryClick(childDir)}
				fileName={childDir.directoryName}
				ownerId={childDir.ownerId}
				created={childDir.created}
				id={childDir.id}
				directory={directory}
				type={childDir.type}
			/>
		)
	});


	return (
		<div className='main-files-container'>
			<h1>{directory.directoryName}</h1>
			<div className='file-container'>
				{renderChildDirectories}
				{renderFiles}
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
		getCurrentDirectoryActionError: () => dispatch<IDirectoryError>({ type: DirectoryActionTypes.GetDirectoryError })
	}
}

export default connect(mapStateToProps, mapDispatchToComponentProps)(FilesContainerComponent);