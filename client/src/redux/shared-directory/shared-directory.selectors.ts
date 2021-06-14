import { createSelector } from 'reselect';
import { StoreState } from '../root-reducer';

export const selectDirectory = (state: StoreState) => state.sharedDirectory;

export const selectCurrentDirectory = createSelector (
    [selectDirectory],
    (sharedDirectory) => sharedDirectory.directory
);

export const selectChildDirectories = createSelector (
    [selectDirectory],
    (sharedDirectory) => sharedDirectory.childDirectories
);

export const selectDirectoryFiles = createSelector (
    [selectDirectory],
    (sharedDirectory) => sharedDirectory.files
);