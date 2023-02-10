import styles from './LoadingIcon.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function LoadingIcon() {
  return (
    <div className={cx('loading')}>
      <div className={cx('loading-icon')}></div>
    </div>
  );
}

export default LoadingIcon;
