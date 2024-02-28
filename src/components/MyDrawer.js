import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Menu from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

function DrawerList({ toggleDrawer, main_ref, history_ref, stat_ref }) {

  return (<Box
    sx={{ width: 250 }}
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={() => {
          main_ref.current?.scrollIntoView({ behavior: 'smooth' })
        }}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={'main info'} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={() => {
          history_ref.current?.scrollIntoView({ behavior: 'smooth' })
        }}>
          <ListItemIcon>
            <FolderOpenIcon />
          </ListItemIcon>
          <ListItemText primary={'history'} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={() => {
          stat_ref.current?.scrollIntoView({ behavior: 'smooth' })
        }}>
          <ListItemIcon>
            <EqualizerIcon />
          </ListItemIcon>
          <ListItemText primary={'statistics'} />
        </ListItemButton>
      </ListItem>
    </List>
  </Box >);
}


export default function MyDrawer(props) {
  const [isOpened, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  return (
    <div>
      <div onClick={toggleDrawer(true)}>
        <Menu />
      </div>
      <Drawer
        main_ref={props.main_ref}
        history_ref={props.history_ref}
        stat_ref={props.stat_ref}
        anchor={'left'}
        open={isOpened}
        onClose={toggleDrawer(false)}
      >
        <DrawerList toggleDrawer={toggleDrawer} main_ref={props.main_ref} history_ref={props.history_ref} stat_ref={props.stat_ref} />
      </Drawer>
    </div>
  );
}
