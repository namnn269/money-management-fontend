import { Spacer, Grid, Badge, Card, Text } from '@nextui-org/react';
import classNames from 'classnames/bind';

import CardDivider from '~/components/CardDivider';
import IncomeIcon from '~/components/Icons/Income/Income';
import ExpenseIcon from '~/components/Icons/ExpenseIcon';
import { Box } from '~/features/Navbar/Box';
import RecentTracsactions from '~/features/RecentTracsactions';
import styles from './HomePage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import categoryApi from '~/api/categoryApi';
import { useEffect, useState } from 'react';
import transactionApi from '~/api/transactionApi';

const cx = classNames.bind(styles);

//////////////////////////////////////
function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const categorySource = useSelector((state) => state.categories.list);
  const [listItems, setListItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState({
    totalIncome: 0,
    totalExpense: 0,
  });

  useEffect(() => {
    user &&
      (async () => {
        categorySource?.length === 0 &&
          (await categoryApi.getAllCategroies(user, dispatch));
        const totalAmount = await transactionApi.getTotalAmount(user, dispatch);
        const listItems = await transactionApi.getRecentTrans(
          5,
          user,
          dispatch
        );
        listItems && setListItems(listItems);
        totalAmount && setTotalAmount(totalAmount);
      })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx('wrapper')}>
      <Badge
        className={cx('badge')}
        css={{ display: 'block' }}
        size="xl"
        variant="bordered"
        enableShadow
        disableOutline
        color="primary"
      >
        Over view
      </Badge>
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          px: '$12',
          mt: '$8',
          '@xsMax': { px: '$10' },
        }}
      >
        <Box
          css={{
            maxWidth: '420px',
            height: '50px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text css={{ fontWeight: '700', fontSize: '24px', color: '#34ebde' }}>
            Manage your money better!
          </Text>
        </Box>
        <Spacer />
        <Grid.Container
          css={{ display: 'flex' }}
          className={cx('income-expense-wrapper')}
          gap={2}
        >
          <CardDivider
            textHeader="Total Income"
            colorHeader="green"
            money={`+${totalAmount.totalIncome}`}
            icon={<IncomeIcon />}
          />
          <CardDivider
            textHeader="Total Expense"
            colorHeader="#CD0404"
            money={`-${totalAmount.totalExpense}`}
            icon={<ExpenseIcon />}
          />
        </Grid.Container>
      </Box>
      <Spacer y={3} />
      <Card.Divider />
      <Spacer />
      <Box css={{ px: '$12', mt: '$8', '@xsMax': { px: '$10' } }}>
        <Badge
          className={cx('badge')}
          size="xl"
          variant="bordered"
          enableShadow
          disableOutline
          color="primary"
        >
          Recent Transactions
        </Badge>
        <div className={cx('recent-transaction')}>
          <RecentTracsactions
            listItems={listItems}
            categorySource={categorySource}
            className={cx('recent-transaction')}
          />
        </div>
      </Box>
    </div>
  );
}

export default HomePage;
