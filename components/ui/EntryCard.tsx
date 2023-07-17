import { UIContext } from '@/context/ui';
import { Entry } from '@/interfaces'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { FC, DragEvent, useContext } from 'react'

interface Props {
    entry: Entry;
}


export const EntryCard: FC<Props> = ({ entry }) => {

    const { isDragging, draggingCard } = useContext(UIContext);
    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', entry._id);
        draggingCard(true);
    }

    const onDragEnd = (event: DragEvent) => {
        console.log('termino el drag')
        draggingCard(false);
    }

    return (
        <Card sx={{ marginBottom: 1 }} draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>entry.createdAt</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
