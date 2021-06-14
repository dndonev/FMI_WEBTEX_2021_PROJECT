import { Directory } from '../../interfaces/directory';
import { File } from '../../interfaces/file';
export interface FileComponentProps extends File {
    clicked: any;
    toggleShareWithModalAction: () => void;
}