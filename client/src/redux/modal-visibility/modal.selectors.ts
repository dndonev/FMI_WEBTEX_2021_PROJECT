import { StoreState } from '../root-reducer';
import { createSelector } from 'reselect'

const selectModal = (state: StoreState) => state.modal;

export const selectLoginModal = createSelector(
    [selectModal],
    (modal) => modal.toggleLoginModal
);

export const selectRegisterModal = createSelector(
    [selectModal],
    (modal) => modal.toggleRegisterModal
);

export const selectForgotPasswordModal = createSelector(
    [selectModal],
    (modal) => modal.toggleForgotPasswordModal
);