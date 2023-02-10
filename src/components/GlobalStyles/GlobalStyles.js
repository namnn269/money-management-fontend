import classNames from 'classnames/bind';

import './GlobalStyles.module.scss';
import styles from './GlobalStyles.module.scss';

const cx = classNames.bind(styles);
function GlobalStyles({ children }) {
  return <div className={cx('wrapper')}>{children}</div>;
}

export default GlobalStyles;