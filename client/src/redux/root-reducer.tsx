import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';

import modalReducer from './modal-visibility/modal.reducer';
import componentReducer from './component-visibility/component.reducer';

import { ModalState } from './modal-visibility/modal.types';
import { ComponentState } from './component-visibility/component.types';

export interface StoreState {
    router: RouterState;
    modal: ModalState;
    component: ComponentState;
};

export const rootReducer = (history: any) => combineReducers<StoreState>({
    router: connectRouter(history),
    modal: modalReducer,
    component: componentReducer
});

export type RootState = ReturnType<typeof rootReducer>;