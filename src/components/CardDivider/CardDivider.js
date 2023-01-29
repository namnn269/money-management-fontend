import classNames from 'classnames/bind';
import { Card, Text } from '@nextui-org/react';

import styles from './CardDivider.module.scss';

const cx = classNames.bind(styles);

export default function CardDivider({ colorHeader, icon, textHeader, money }) {
  return (
    <Card css={{ w: '200px' }}>
      <Card.Header color="#fff" style={{ backgroundColor: colorHeader }}>
        <Text className={cx('text-header')}>{textHeader}</Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body css={{ py: '$10', height: '110px' }}>{icon}</Card.Body>
      <Card.Divider />
      <Card.Footer className={cx('footer')}>
        <Text style={{ color: colorHeader }} className={cx('text')}>
          {money}d
        </Text>
      </Card.Footer>
    </Card>
  );
}
