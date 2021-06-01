import {StoreState} from '../root-reducer';
import { createSelector } from 'reselect'

const selectComponent = (state: StoreState) => state.component;

export const selectUploadComponent = createSelector(
    [selectComponent],
    (component) => component.toggleUploadComponent
);

export const selectMyFilesComponent = createSelector(
    [selectComponent],
    (component) => component.toggleMyFilesComponent
)