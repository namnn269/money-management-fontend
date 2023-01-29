import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ItemButton.module.scss';

const cx = classNames.bind(styles);

export default function ItemButton({
  content,
  leftIcon,
  activeIcon,
  onClick = () => {},
  to,
  sx = 2,
}) {
  const handleOnclick = () => {
    onClick();
  };

  return (
    <NavLink
      className={(nav) => cx('wrapper', { active: nav.isActive })}
      to={to}
    >
      <ListItemButton sx={{ pl: sx }} onClick={() => handleOnclick()}>
        <ListItemIcon className={cx('icon')}>{leftIcon}</ListItemIcon>
        {activeIcon && (
          <ListItemIcon className={cx('active-icon')}>
            {activeIcon}
          </ListItemIcon>
        )}
        <div className={cx('text')}>{content}</div>
      </ListItemButton>
    </NavLink>
  );
}
