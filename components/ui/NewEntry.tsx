import { AddCircleOutline, SaveOutlined } from '@mui/icons-material'
import { Box, Button, TextField } from '@mui/material'
import React from 'react'

export const NewEntry = () => {
    return (
        <Box sx={{marginBottom:2, paddingX:2}}>
            <Button startIcon={<AddCircleOutline />}
                fullWidth
                variant='outlined'>
                Agregar Tarea
            </Button>
            <TextField fullWidth sx={{ marginTop: 2, marginBottom: 1 }}
                placeholder='Nueva entrada' autoFocus multiline label='Nueva Entrada' helperText='Ingrese un valor' />
            <Box display='flex' justifyContent='space-between'>
                <Button variant='text'>
                    Cancelar
                </Button>

                <Button variant='outlined' color='secondary' endIcon={<SaveOutlined />}>
                    Guardar
                </Button>
            </Box>
        </Box>
    )
}
