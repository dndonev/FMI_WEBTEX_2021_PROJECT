export enum ComponentActionTypes {
    ToogleUploadComponent = "TOOGLE_UPLOAD_COMPONENT",
    ToogleMyFilesComponent = "TOOGLE_MY_FILES_COMPONENT"
};

export interface ComponentState {
    toggleUploadComponent: boolean;
    toggleMyFilesComponent: boolean;
};