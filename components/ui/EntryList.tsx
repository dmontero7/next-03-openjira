import { List, Paper } from '@mui/material'
import React, { FC, useContext, useMemo, DragEvent } from 'react'
import { EntryCard } from './EntryCard'
import { Entry, EntryStatus } from '@/interfaces'
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';

import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
    const { entries, onUpdateEntry } = useContext(EntriesContext);
    const { isDragging,draggingCard } = useContext(UIContext);

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text');
        console.log({ id });
        const entry = entries.find(e => e._id === id)!;
        entry.status = status;
        onUpdateEntry(entry);
        draggingCard(false);
    }

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}>
            <Paper sx={{ height: 'calc(100vh - 200px)', overflow: 'auto', backgroundColor: 'transparent', padding: '3px 5px' }}>
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
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
