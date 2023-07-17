import { Layout } from '@/components'
import { Entry, EntryStatus } from '@/interfaces';
import { DeleteOutline, DeleteOutlined, SaveOutlined } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField, capitalize } from '@mui/material';
import { isValidObjectId } from 'mongoose';
import { GetServerSideProps } from 'next';
import { NextServer } from 'next/dist/server/next';
import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { dbEntries } from '../../database';
import { EntriesContext } from '@/context/entries';
import { useRouter } from 'next/router';
import { dateFunctions } from '@/utils';


const validStatus: EntryStatus[] = ['pending','in-progress','finished' ];

interface Props {
    entry: Entry
}


const EntryPage: FC<Props> = ({ entry }) => {
    const context = useContext(EntriesContext);
    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);
    const router = useRouter();
    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue])
    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus)
    }

    const onSave = () => {
        if (inputValue.trim().length === 0) return;
        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }
        context.onUpdateEntry(updatedEntry,true);
        router.push('/');
    }

    return (
        <Layout title={inputValue.substring(0.20) + '...'}>
            <Grid container
                justifyContent='center'
                sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader title={`Entrada:`}
                            subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`} />
                        <CardContent>
                            <TextField sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="Nueva Entrada"
                                autoFocus
                                multiline
                                label="Nueva Entrada"
                                value={inputValue}
                                onChange={onTextFieldChange}
                                helperText={isNotValid && 'Ingrese un valor'}
                                onBlur={() => setTouched(true)}
                                error={isNotValid} />
                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup row value={status} onChange={onStatusChange}>
                                    {
                                        validStatus.map(option => (
                                            <FormControlLabel key={option}
                                                value={option}
                                                control={<Radio />}
                                                label={capitalize(option)} />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button startIcon={<SaveOutlined />}
                                variant='contained'
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}>
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

            </Grid>
            <IconButton sx={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'error.dark'
            }}>
                <DeleteOutlined />
            </IconButton>
        </Layout >
    )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };


    if (!isValidObjectId(id)) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    const entry = await dbEntries.getEntryById(id);
    return {
        props: {
            entry
        }
    }
}

export default EntryPage;