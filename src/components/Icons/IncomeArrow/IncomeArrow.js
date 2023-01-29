import classNames from 'classnames/bind';

import styles from './IncomeArrow.module.scss';
const cx = classNames.bind(styles);

function IncomeArrow() {
  return (
    <svg
      className={cx('svg')}
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
    >
      <g transform="translate(0 -1026.362)">
        <circle
          cx="13"
          cy="1039.362"
          r="13"
          fill="#50b748"
          fillRule="evenodd"
        />
        <path
          // style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal"
          fill="#10a711"
          d="M16.902 25.398a13 13 0 0 0 1.16-.423 13 13 0 0 0 1.17-.567 13 13 0 0 0 1.108-.68 13 13 0 0 0 1.035-.785 13 13 0 0 0 .951-.886 13 13 0 0 0 .858-.977 13 13 0 0 0 .755-1.057 13 13 0 0 0 .647-1.127 13 13 0 0 0 .236-.525l-6.826-6.826a.5.5 0 0 0-.119-.371l7.023 7.021a13 13 0 0 0 .153-.34L13.359 6.162a.5.5 0 0 0-.353-.166.5.5 0 0 0-.049 0 .5.5 0 0 0-.342.166v.002l-4.488 5.002v.002A.5.5 0 0 0 8.5 12l2.502 2.502.002 5a.5.5 0 0 0 .5.498l5.398 5.398z"
          color="#000"
          fontFamily="sans-serif"
          fontWeight="400"
          transform="translate(0 1026.362)"
        />
        <path
          // style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal"
          fill="#fff"
          d="M8.006.996a.5.5 0 0 0-.049.002.5.5 0 0 0-.342.166L3.127 6.168A.5.5 0 0 0 3.5 7H6l.004 7.502a.5.5 0 0 0 .5.498H9.5a.5.5 0 0 0 .5-.5V7h2.5a.5.5 0 0 0 .371-.834L8.36 1.162a.5.5 0 0 0-.353-.166Zm-.018 1.248L11.375 6H9.5a.5.5 0 0 0-.5.5v7.498H7.004L7 6.498a.5.5 0 0 0-.5-.5H4.621l3.367-3.754z"
          color="#000"
          fontFamily="sans-serif"
          fontWeight="400"
          overflow="visible"
          transform="translate(5 1031.364)"
        />
      </g>
    </svg>
  );
}

export default IncomeArrow;
