import React, { useState } from 'react';

import './sidebar.styles.scss';

import { SidebarComponentProps } from './sidebar.types';

import { IToggleUpload, IToggleMyFiles, TComponentReducerActions, IToggleShared } from './../../redux/component-visibility/component.action';
import { ComponentActionTypes } from './../../redux/component-visibility/component.types';

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from '../../redux/root-reducer';
import { selectUploadComponent, selectMyFilesComponent, selectSharedComponent } from '../../redux/component-visibility/component.selectors';

const SideBarComponent: React.FC<SidebarComponentProps> = ({ ...props }) => {

	const { toggleUploadAction, toggleMyFilesAction, toggleSharedAction } = props;
    
	return (
		<div className="container">
			<ul className="nav-list">
				<li className="my-files" onClick={ toggleMyFilesAction }>My Files</li>
				<li className="shared-files" onClick={ toggleSharedAction }>Shared with me</li>
				<li className="upload-files" onClick={ toggleUploadAction }>Upload File</li>
			</ul>
		</div>
	);
};

const mapStateToProps = (state: StoreState): { toggleUploadComponent: boolean, toggleMyFilesComponent: boolean, toggleSharedComponent: boolean } => {
	return {
		toggleUploadComponent: selectUploadComponent(state),
		toggleMyFilesComponent: selectMyFilesComponent(state),
		toggleSharedComponent: selectSharedComponent(state)
	};
};

const mapDispatchToComponentProps = (dispatch: Dispatch<TComponentReducerActions>) => {
	return {
		toggleUploadAction: () => dispatch<IToggleUpload>({ type: ComponentActionTypes.ToogleUploadComponent }),
		toggleMyFilesAction: () => dispatch<IToggleMyFiles>({ type: ComponentActionTypes.ToogleMyFilesComponent }),
		toggleSharedAction: () => dispatch<IToggleShared>({ type: ComponentActionTypes.ToggleSharedComponent })
	}
}

export default connect(mapStateToProps, mapDispatchToComponentProps)(SideBarComponent);