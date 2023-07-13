
import { EntriesState } from './';

type EntriesType = { type:'Add - entry' }

export const entriesReducer = (state: EntriesState, action: EntriesType): EntriesState => {
    switch (action.type) {
        case 'Add - entry':
            return {
                ...state,
            }
        default:
            return state;
    }
}