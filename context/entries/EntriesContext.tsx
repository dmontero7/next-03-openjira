import { Entry } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
    entries: Entry[];
    //methods
    addNewEntry: (description: string) => void;
    onUpdateEntry: (entry: Entry, showShackBar?: boolean) => void;
}

export const EntriesContext = createContext({} as ContextProps);