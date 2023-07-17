import React, { useContext } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material'
import { MenuOutlined } from '@mui/icons-material'
import { UIContext } from '@/context/ui'
import NextLink from 'next/link'

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);
  return (
    <AppBar position='sticky' elevation={0}>
      <Toolbar>
        <IconButton size='large' edge='start' onClick={openSideMenu}>
          <MenuOutlined />
        </IconButton>
        <NextLink legacyBehavior href='/' passHref>
          <Link underline='none' color='white'>
            <Typography variant='h6'>Open Jira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}
