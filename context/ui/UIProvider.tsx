import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging:boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging:false
}

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({ type: 'UI openMenubar' })
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI closeMenubar' })
    }

    const setAddingEntry = (isAdding: boolean) => {
        dispatch({ type: 'UI addingEntry', payload: isAdding });
    }

    const draggingCard = (isDragging: boolean) => {
        dispatch({ type: 'UI draggingCard', payload: isDragging });
    }
    return (
        <UIContext.Provider value={{
            ...state,
            openSideMenu,
            closeSideMenu,
            setAddingEntry,
            draggingCard
        }}>
            {children}
        </UIContext.Provider>
    )
}