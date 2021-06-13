import { createSelector } from 'reselect';
import { StoreState } from '../root-reducer';

export const selectDirectory = (state: StoreState) => state.directory;

export const selectCurrentDirectory = createSelector (
    [selectDirectory],
    (directory) => directory.directory
);

export const selectChildDirectories = createSelector (
    [selectDirectory],
    (directory) => directory.childDirectories
);

export const selectDirectoryFiles = createSelector (
    [selectDirectory],
    (directory) => directory.files
);