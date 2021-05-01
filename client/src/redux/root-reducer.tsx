import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import modalReducer from './modal-visibility/modal.reducer';
import { ModalState } from './modal-visibility/modal.types';
import userReducer from './user/user.reducer';
import { UserState } from './user/user.types';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';

export interface StoreState {
    router: RouterState;
    modal: ModalState;
    user: UserState & PersistPartial;
};

const userConfig = {
    key: 'user',
    storage: storage
}

export const rootReducer = (history: any) => combineReducers<StoreState>({
    router: connectRouter(history),
    modal: modalReducer,
    user: persistReducer(userConfig, userReducer)
});

export type RootState = ReturnType<typeof rootReducer>;