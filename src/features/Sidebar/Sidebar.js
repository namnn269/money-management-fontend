import classNames from 'classnames/bind';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import styles from './Sidebar.module.scss';
import ItemOfList from '~/components/ListItemsSidebar';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <div>
      <Box className={cx('wrapper')} sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h8" color="inherit" component="div">
              Nam
            </Typography>
          </Toolbar>
        </AppBar>
        <ItemOfList />
      </Box>
    </div>
  );
}

export default Sidebar;
