/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@nextui-org/react';
import { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { Space, DatePicker } from 'antd';
import moment from 'moment/moment';

import CircleButton from '~/components/CircleButton';
import PieChart from '~/components/PieChart';
import { dateFormat, convertDateBeforeFetch } from '~/configs/datetime';
import { useDispatch, useSelector } from 'react-redux';
import chartApi from '~/api/chartApi';

const { RangePicker } = DatePicker;

const examplePieData = [
  {
    categoryid: 1,
    categoryStatus: 1,
    categoryName: 'Example 1',
    categoryTotalAmount: 250,
    categoryColor: '#c41f14',
  },
  {
    categoryid: 2,
    categoryStatus: 1,
    categoryName: 'Example 2',
    categoryTotalAmount: 150,
    categoryColor: '#bd8419',
  },
];

/////////////////////////////////////////////////////////
function ChartCategoryExpense() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const today = moment(new Date()).format(dateFormat);
  const aWeekAgo = moment(new Date()).subtract(1, 'weeks').format(dateFormat);
  const [categoriesData, setCategoriesData] = useState(examplePieData);
  const [searchValue, setSearchValue] = useState({
    startDate: aWeekAgo,
    endDate: today,
    categoryStatusId: 2,
  });

  const { handleSubmit, control } = useForm({
    defaultValues: {
      dateFromTo: [dayjs(aWeekAgo, dateFormat), dayjs(today, dateFormat)],
    },
  });

  const handleOnsubmit = (data) => {
    setSearchValue({
      ...searchValue,
      startDate: convertDateBeforeFetch(data?.dateFromTo[0].$d),
      endDate: convertDateBeforeFetch(data.dateFromTo[1].$d),
    });
  };

  useEffect(() => {
    user &&
      (async () => {
        const pieData = await chartApi.pieChart(searchValue, user, dispatch);
        pieData && setCategoriesData(pieData);
      })();
  }, [searchValue]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(handleOnsubmit)}>
        <Container
          css={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <Controller
            control={control}
            name="dateFromTo"
            render={({ field }) => (
              <Space direction="vertical" size={12}>
                <RangePicker
                  {...field}
                  disabledDate={(current) => current > dayjs().endOf('day')}
                  format={dateFormat}
                />
              </Space>
            )}
          />
          <CircleButton size="30px" name="OK" />
        </Container>
      </form>

      <PieChart
        categoriesData={categoriesData}
        title="The comparison of categories in expense"
        colorTitle="red"
        label="Expense"
      />
    </Fragment>
  );
}

export default ChartCategoryExpense;
