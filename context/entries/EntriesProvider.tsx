import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';
import { enqueueSnackbar } from 'notistack';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

    const addNewEntry = async (description: string) => {
        const { data } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: 'Add - entry', payload: data });
    }

    const onUpdateEntry = async ({ _id, description, status }: Entry, showShackBar = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
            dispatch({ type: 'Update - entry', payload: data });
            if (showShackBar) {
                enqueueSnackbar('Actualizado con exito', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });
            }
        } catch (error) {
            console.log({ error })
        }

    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: 'Load - entry', payload: data })
    }

    useEffect(() => {
        refreshEntries();
    }, [])

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            onUpdateEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}