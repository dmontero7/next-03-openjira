import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';
import { AddCircleOutline, SaveOutlined } from '@mui/icons-material'
import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, useContext, useState } from 'react'

export const NewEntry = () => {

    const { addNewEntry } = useContext(EntriesContext);
    const {isAddingEntry,setAddingEntry} = useContext(UIContext);

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onSave = () => {
        addNewEntry(inputValue);
        setInputValue('');
        setAddingEntry(false);
        setTouched(false)
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }}>
            {
                isAddingEntry
                    ? (
                        <>
                            <TextField fullWidth sx={{ marginTop: 2, marginBottom: 1 }}
                                placeholder='Nueva entrada'
                                autoFocus multiline
                                label='Nueva Entrada'
                                helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
                                value={inputValue}
                                error={inputValue.length <= 0 && touched}
                                onBlur={() => setTouched(true)}
                                onChange={onTextFieldChange} />
                            <Box display='flex' justifyContent='space-between'>
                                <Button variant='text' onClick={() => { setAddingEntry(false); setTouched(false); setInputValue('') }}>
                                    Cancelar
                                </Button>

                                <Button variant='outlined' color='secondary' endIcon={<SaveOutlined />} onClick={onSave}>
                                    Guardar
                                </Button>

                            </Box>
                        </>
                    )
                    : (
                        <Button startIcon={<AddCircleOutline />}
                            fullWidth
                            variant='outlined'
                            onClick={() => setAddingEntry(true)}>
                            Agregar Tarea
                        </Button>
                    )
            }


        </Box>
    )
}
