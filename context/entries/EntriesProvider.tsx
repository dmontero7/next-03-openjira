import { FC, PropsWithChildren, useReducer } from 'react';
import { EntriesContext,entriesReducer } from './';
import { Entry } from '@/interfaces';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
    {
        _id:uuidv4(),
        description:"Hacer cafe",
        status:'pending',
        createdAt:Date.now()
    },
    {
        _id:uuidv4(),
        description:"Llamar a Ruben",
        status:'in-progress',
        createdAt:Date.now() -1000000
    },
    {
        _id:uuidv4(),
        description:"jugar minecraft",
        status:'finished',
        createdAt:Date.now()-100000
    }
    ],
}

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

    return (
        <EntriesContext.Provider value={{
            ...state
        }}>
            {children}
        </EntriesContext.Provider>
    )
}