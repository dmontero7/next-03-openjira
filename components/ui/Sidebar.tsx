import React, { useContext } from 'react'
import { Drawer, Box, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Divider } from '@mui/material';
import { InboxOutlined, MailOutline, MailOutlined } from '@mui/icons-material';
import { UIContext } from '@/context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor='left' open={sidemenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: '250' }}>
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant='h4'>Menu</Typography>
        </Box>
        <List>
          {
            menuItems.map((text, index) => (
              <ListItemButton key={text}>
                <ListItemIcon>
                  {index % 2 ? <InboxOutlined /> : <MailOutlined />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            ))
          }
        </List>
        <Divider />
        <List>
          {
            menuItems.map((text, index) => (
              <ListItemButton key={text}>
                <ListItemIcon>
                  {index % 2 ? <InboxOutlined /> : <MailOutlined />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            ))
          }
        </List>
      </Box>
    </Drawer>
  )
}
