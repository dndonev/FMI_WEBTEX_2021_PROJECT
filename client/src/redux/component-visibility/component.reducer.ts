import { TComponentReducerActions } from './component.action';
import { ComponentActionTypes,  ComponentState} from './component.types';

const InitialState: ComponentState = {
    toggleUploadComponent: false,
    toggleMyFilesComponent: false
};

export const componentReducer = (state = InitialState, action: TComponentReducerActions): ComponentState => {
    switch(action.type) {
        case ComponentActionTypes.ToogleUploadComponent:
            return {
                toggleUploadComponent: true,
                toggleMyFilesComponent: false
            };
        case ComponentActionTypes.ToogleMyFilesComponent:
            return {
                toggleUploadComponent: false,
                toggleMyFilesComponent: true
            };
        default: 
            return state;
    }
}

export default componentReducer;