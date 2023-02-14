import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import AppsIcon from '@mui/icons-material/Apps';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import PaidIcon from '@mui/icons-material/Paid';
import HistoryIcon from '@mui/icons-material/History';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';

import ItemButton from '~/components/ItemButton';
import routePaths from '~/routePaths';
import { useSelector } from 'react-redux';

export default function ListItemsSidebar() {
  const user = useSelector((state) => state.auth?.login?.currentUser);
  return (
    <List
      sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        ></ListSubheader>
      }
    >
      <ItemButton
        to={routePaths.home}
        content="Home"
        leftIcon={<AppsIcon />}
        activeIcon={<AppRegistrationRoundedIcon color="primary" />}
      />
      <ItemButton
        to={routePaths.transaction}
        content="New transaction"
        leftIcon={<PaidOutlinedIcon />}
        activeIcon={<PaidIcon color="primary" />}
      />
      <ItemButton
        to={routePaths.analysis}
        content={'Analysis Chart'}
        leftIcon={<TimelineRoundedIcon />}
        activeIcon={<AutoGraphIcon color="primary" />}
      />
      <ItemButton
        to={routePaths.history}
        content={'Your transactions'}
        leftIcon={<HistoryIcon />}
        activeIcon={<ManageHistoryIcon color="primary" />}
      />
      {user && (
        <ItemButton
          to={routePaths.account}
          content={'Account'}
          leftIcon={<AccountCircleOutlinedIcon />}
          activeIcon={<AccountCircleIcon color="primary" />}
        />
      )}
    </List>
  );
}
