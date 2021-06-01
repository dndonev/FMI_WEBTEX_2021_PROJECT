import React, { useState } from 'react';

import './sidebar.styles.scss';

import { SidebarComponentProps } from './sidebar.types';

import { IToggleUpload, IToggleMyFiles, TComponentReducerActions } from './../../redux/component-visibility/component.action';
import { ComponentActionTypes } from './../../redux/component-visibility/component.types';

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from '../../redux/root-reducer';
import { selectUploadComponent, selectMyFilesComponent } from '../../redux/component-visibility/component.selectors';

const SideBarComponent: React.FC<SidebarComponentProps> = ({ ...props }) => {

	const { toggleUploadComponent, toggleMyFilesComponent, toggleUpload, toggleMyFiles, show } = props;
    
    const handleLoadUpload = () => {
        toggleUpload();
	}

	const handleLoadMyFiles = () => {
		toggleMyFiles();
	}

	const showSelectedComponent = () => {
		if (toggleUploadComponent) {
			toggleUpload();
		} else if (toggleMyFilesComponent) {
			toggleMyFiles();
		}
	}

	return (
		<div className="container">
			<ul className="nav-list">
				<li onClick={showSelectedComponent}>My Files</li>
				<li>Shared with me</li>
				<li onClick={showSelectedComponent}>Upload File</li>
			</ul>
		</div>
	);
};

const mapStateToProps = (state: StoreState): { toggleUploadComponent: boolean, toggleMyFilesComponent: boolean } => {
	return {
		toggleUploadComponent: selectUploadComponent(state),
		toggleMyFilesComponent: selectMyFilesComponent(state)
	};
};

const mapDispatchToComponentProps = (dispatch: Dispatch<TComponentReducerActions>) => {
	return {
		toggleUpload: () => dispatch<IToggleUpload>({ type: ComponentActionTypes.ToogleUploadComponent }),
		toggleMyFiles: () => dispatch<IToggleMyFiles>({ type: ComponentActionTypes.ToogleMyFilesComponent })
	}
}

export default connect(mapStateToProps, mapDispatchToComponentProps)(SideBarComponent);