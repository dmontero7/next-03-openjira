import { UIState } from './';

type UIType =
    { type: 'UI openMenubar'; }
    | { type: 'UI closeMenubar'; }
    | { type: 'UI addingEntry'; payload: boolean }
    | { type: 'UI draggingCard'; payload: boolean }

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
        case 'UI addingEntry':
            return {
                ...state,
                isAddingEntry: action.payload
            }
        case 'UI draggingCard':
            return {
                ...state,
                isDragging: action.payload
            }
        default:
            return state;
    }
}