import React, { useState } from 'react';
import Axios from 'axios';
import {File} from'../../../../server/interfaces/file';
import './main.styles.scss';

import SideBarComponent from './../sidebar/sidebar.component';
import HeaderComponent from './../header/header.component';
import FileContainerComponent from '../files-container/files.container.component';
import UploadComponent from '../upload/upload.component';
import SharedComponent from '../shared/shared.component';

import { IToggleUpload, IToggleMyFiles, TComponentReducerActions, IToggleShared } from './../../redux/component-visibility/component.action';
import { ComponentActionTypes } from './../../redux/component-visibility/component.types';
import { selectUploadComponent, selectMyFilesComponent, selectSharedComponent } from './../../redux/component-visibility/component.selectors';

import { connect } from "react-redux";
import { Dispatch } from "redux";

import { MainComponentProps } from './main.types';
import { StoreState } from '../../redux/root-reducer';

const MainComponent: React.FC<MainComponentProps> = ({ ...props }) => {

	const {
		toggleUploadComponent,
		toggleMyFilesComponent,
		toggleSharedComponent,
		file,
	} = props;

	let showSelectedComponent;

	if (toggleMyFilesComponent) {
		showSelectedComponent = 
			<FileContainerComponent 
				fileName={ file.fileName }
			 	ownerId={ file.ownerId }
			 	directory={ file.directory }
			 	created={ file.created }
				type={ file.type }
				id={ file.id }
			 />;
	}

	if (toggleUploadComponent) {
		showSelectedComponent = <UploadComponent />;
	}

	if (toggleSharedComponent) {
		showSelectedComponent = 
		<SharedComponent fileName={ file.fileName }
			ownerId={ file.ownerId }
			directory={ file.directory }
			created={ file.created }
			type={ file.type }
			id={ file.id }
		/>
	}

	return (
		<div className="main-container">
			<HeaderComponent />
			<div className="middle-container">
				<div className="sidebar">	
					<SideBarComponent/>
				</div>
				<div className="files-container">
					{ showSelectedComponent }
				</div>

			</div>
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
		toggleSharedComponentAction: () => dispatch<IToggleShared>({ type: ComponentActionTypes.ToggleSharedComponent })
	}
}

export default connect(mapStateToProps, mapDispatchToComponentProps)(MainComponent);