import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SearchBoxComponent from './../search-box/search-box.component';
import FileComponent from './../file/file.components';

import { Directory } from '../../interfaces/directory';
import { File } from '../../interfaces/file';
import { SharedContainerProps } from './shared.types';
import { StoreState } from '../../redux/root-reducer';
import { SharedDirectoryActionTypes, SharedDirectoryState } from '../../redux/shared-directory/shared-directory.types';
import { selectChildDirectories, selectCurrentDirectory, selectDirectoryFiles } from '../../redux/shared-directory/shared-directory.selectors';
import { ISharedDirectory, ISharedDirectoryError, ISharedDirectorySuccess, TSharedDirectoryReducerActions } from '../../redux/shared-directory/shared-directory.actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const SharedComponent: React.FC<SharedContainerProps> = ({ ...props }) => {

	const {
		getSharedDirectoryAction,
		getSharedDirectoryActionSuccess,
		getSharedDirectoryActionError,
		directory,
		childDirectories,
		files
	} = props;

	const getSharedDirUrl = `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : 'http://localhost:3001'}/api/directories/shared-with-me`;
	const headers = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
		}
	};

	const getSharedDir = async () => {
		let root: Directory;
		try {
			getSharedDirectoryAction();
			root = (await Axios.post<Directory>(getSharedDirUrl, {}, headers)).data;
			getSharedDirectoryActionSuccess(root);
		} catch (e) {
			getSharedDirectoryActionError();
		}
	}

	useEffect(() => {
		getSharedDir();
	}, []);

	const renderSharedFiles = files && files.length && files.map((file: File) => {
		return (
			<FileComponent clicked={null}
				fileName={file.fileName}
				ownerId={file.ownerId}
				extention={file.extention}
				id={file.id}
				directory={file.directory}
				type={file.type}
				created={file.created}
			/>
		)
	});

	return (
		<div className="main-files-container">
			<h1>{directory.directoryName}</h1>
			<div className="file-container">
				{renderSharedFiles}
			</div>
		</div>
	)
}

const mapStateToProps = (state: StoreState): SharedDirectoryState => {
	return {
		files: selectDirectoryFiles(state),
		childDirectories: selectChildDirectories(state),
		directory: selectCurrentDirectory(state)
	};
};


const mapDispatchToComponentProps = (dispatch: Dispatch<TSharedDirectoryReducerActions>) => {
	return {
		getSharedDirectoryAction: () => dispatch<ISharedDirectory>({ type: SharedDirectoryActionTypes.GetSharedDirectory }),
		getSharedDirectoryActionSuccess: (data: Directory) => dispatch<ISharedDirectorySuccess>({ type: SharedDirectoryActionTypes.GetSharedDirectorySuccess, data: data }),
		getSharedDirectoryActionError: () => dispatch<ISharedDirectoryError>({ type: SharedDirectoryActionTypes.GetSharedDirectoryError })
	}
}

export default connect(mapStateToProps, mapDispatchToComponentProps)(SharedComponent);