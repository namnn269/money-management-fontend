import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import ItemButton from '~/components/ItemButton';

export default function CollapseButton() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        <span>{open ? <ExpandLess /> : <ExpandMore />}</span>
      </ListItemButton>
      <Collapse in={open} timeout={500} unmountOnExit={false}>
        <List component="div" disablePadding>
          <ItemButton leftIcon={<StarBorder />} content="Star" sx={4} />
        </List>
      </Collapse>
    </>
  );
}
