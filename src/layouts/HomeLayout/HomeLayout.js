import classNames from 'classnames/bind';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import styles from './HomeLayout.module.scss';
import Sidebar from '~/features/Sidebar';
import NavbarTop from '~/features/Navbar/Navbar';
import SidebarDrawer from '~/features/SidebarDrawer';

const cx = classNames.bind(styles);

function HomeLayout({ children }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <div>
      <Grid className={cx('wrapper')} container spacing={2} columns={10}>
        <Grid item md={2} sx={{ display: { md: 'block', xs: 'none' } }}>
          <Item>{<Sidebar />}</Item>
        </Grid>
        <Grid
          sx={{
            display: {
              xs: 'block',
              md: 'none',
              position: 'fixed',
              zIndex: '1000',
              marginLeft: '20px',
              marginTop: '15px',
            },
          }}
        >
          <SidebarDrawer />
        </Grid>
        <Grid item xs={10} md={8}>
          <NavbarTop />
          {children}
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeLayout;
