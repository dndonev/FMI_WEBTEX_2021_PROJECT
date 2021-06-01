import React, { useState } from 'react';
import Axios from 'axios';
import {File} from'../../../../server/interfaces/file';
import './main.styles.scss';

import SideBarComponent from './../sidebar/sidebar.component';
import HeaderComponent from './../header/header.component';
import FileContainerComponent from '../files-container/files.container.component';
import UploadComponent from '../upload/upload.component';

import { IToggleUpload, IToggleMyFiles, TComponentReducerActions } from './../../redux/component-visibility/component.action';
import { ComponentActionTypes } from './../../redux/component-visibility/component.types';
import { selectUploadComponent, selectMyFilesComponent } from './../../redux/component-visibility/component.selectors';

import { connect } from "react-redux";
import { Dispatch } from "redux";

import { MainComponentProps } from './main.types';
import { StoreState } from '../../redux/root-reducer';

const MainComponent: React.FC<MainComponentProps> = ({ ...props }) => {

	const { toggleUploadComponent, toggleMyFilesComponent, toggleUpload, toggleMyFiles } = props;

	console.log(props);

	const showSelectedContainer = () => {
		if (toggleUploadComponent) {
			return <UploadComponent />
		} else if (toggleMyFilesComponent) {
			return <FileContainerComponent />
		}
	}

	return (
		<div className="main-container">
			<HeaderComponent />
			<div className="middle-container">
				<div className="sidebar">
					<SideBarComponent show={showSelectedContainer}/>
				</div>
				<div className="files-container">
					{ showSelectedContainer }
					{/* <FileContainerComponent /> */}
					{/* <UploadComponent /> */}
				</div>

			</div>
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

export default connect(mapStateToProps, mapDispatchToComponentProps)(MainComponent);