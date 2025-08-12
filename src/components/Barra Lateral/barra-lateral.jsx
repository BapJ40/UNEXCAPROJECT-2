import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Outlet, Link } from 'react-router';
import Divider from '@mui/material/Divider';


const drawerWidth = 240;

export default function BarraLateral() {

    const opciones = [
        { text: 'Inicio', icon: <HomeIcon />, link: '/' },
        { text: 'Gestion de Docentes', icon: <GroupsIcon />, link: '/gestion-docentes' },
        { text: 'Asistencias Docentes', icon: <GroupAddIcon />, link: '/asistencia-docentes' },
        { text: 'Gestion de Estudiantes', icon: <SchoolIcon />, link: '/gestion-estudiantes' },
        { text: 'Asistencia Estudiantil', icon: <PersonAddAlt1Icon />, link: '/asistencia-estudiantil' },
        { text: 'Reportes / Informes', icon: <DescriptionIcon /> }
    ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
        <ApartmentIcon />
        <Typography variant="h6"  component="div" sx={{ p: 2, textAlign: 'center', fontWeight: 'bold' }}> 
            UNEXCA
        </Typography>
        </Toolbar>
        <Divider />
        <List>
        <Typography variant="subtitle2" noWrap sx={{ mb: 2, p: 0, m: 0, marginLeft: 2,}}>
            Navegacion Principal
        </Typography>
          {opciones.map(item => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.link}>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', m: 0, p: 0, paddingLeft: 2, }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
