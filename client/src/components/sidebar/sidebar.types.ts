export interface SidebarComponentProps {
    toggleUploadComponent: boolean;
    toggleMyFilesComponent: boolean;
    toggleSharedComponent: boolean;

    toggleUploadAction: () => void;
    toggleMyFilesAction: () => void;
    toggleSharedAction: () => void;
}