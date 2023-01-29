import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import MenuIcon from '@mui/icons-material/Menu';

function SidebarDrawer() {
  const [state, setState] = useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    )
      return;

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer('left', true)}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor="left"
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        <Sidebar />
      </Drawer>
    </div>
  );
}

export default SidebarDrawer;
