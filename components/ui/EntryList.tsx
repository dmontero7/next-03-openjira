import { List, Paper } from '@mui/material'
import React, { FC, useContext, useMemo } from 'react'
import { EntryCard } from './EntryCard'
import { Entry, EntryStatus } from '@/interfaces'
import { EntriesContext } from '@/context/entries';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
    const { entries } = useContext(EntriesContext);

    const entriesByStatus = entries.filter( entry => entry.status === status );
    //useMemo( () => , [ entries ]);

    return (
        <div>
            <Paper sx={{ height: 'calc(100vh - 200px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '3px 5px' }}>
                <List sx={{ opacity: 1 }}>
                    {
                        entriesByStatus.map(entry => (
                            <EntryCard entry={entry} key={entry._id} />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}
