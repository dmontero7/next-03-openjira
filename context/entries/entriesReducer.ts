
import { Entry } from '@/interfaces';
import { EntriesState } from './';

type EntriesType =
    { type: 'Add - entry', payload: Entry }
    | { type: 'Update - entry', payload: Entry }
    | { type: 'Load - entry', payload: Entry[] }

export const entriesReducer = (state: EntriesState, action: EntriesType): EntriesState => {
    switch (action.type) {
        case 'Add - entry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        case 'Update - entry':
            return {
                ...state,
                entries: state.entries.map(entry => {
                    if (entry._id === action.payload._id) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry;
                })
            }
        case 'Load - entry':
            return {
                ...state,
                entries: action.payload
            }
        default:
            return state;
    }
}