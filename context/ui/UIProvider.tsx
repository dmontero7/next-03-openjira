import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sidemenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
}

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu =  () => {
        dispatch({type:'UI openMenubar'})
    }

    const closeSideMenu =  () => {
        dispatch({type:'UI closeMenubar'})
    }
    return (
        <UIContext.Provider value={{
            ...state,
            openSideMenu,
            closeSideMenu
        }}>
            {children}
        </UIContext.Provider>
    )
}