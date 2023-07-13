import { UIState } from './';

type UIType = { type: 'UI openMenubar'; } | { type: 'UI closeMenubar'; }

export const uiReducer = (state: UIState, action: UIType): UIState => {
    switch (action.type) {
        case 'UI openMenubar':
            return {
                ...state,
                sidemenuOpen: true
            }
        case 'UI closeMenubar':
            return {
                ...state,
                sidemenuOpen: false
            }
        default:
            return state;
    }
}