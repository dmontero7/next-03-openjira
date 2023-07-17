import { createContext } from 'react';

interface ContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging:boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setAddingEntry: (isAdding: boolean) => void;
    draggingCard: (isDragging: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);