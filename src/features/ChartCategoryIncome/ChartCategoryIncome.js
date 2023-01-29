/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@nextui-org/react';
import { Space } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';

import CircleButton from '~/components/CircleButton';
import PieChart from '~/components/PieChart';
import { convertDateBeforeFetch, dateFormat } from '~/configs/datetime';
import chartApi from '~/api/chartApi';
import { useDispatch, useSelector } from 'react-redux';

const { RangePicker } = DatePicker;

const examplePieData = [
  {
    categoryid: 1,
    categoryStatus: 1,
    categoryName: 'Example 1',
    categoryTotalAmount: 300,
    categoryColor: '#30bf56',
  },
  {
    categoryid: 2,
    categoryStatus: 1,
    categoryName: 'Example 2',
    categoryTotalAmount: 150,
    categoryColor: '#1976bd',
  },
];

function ChartCategoryIncome() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const today = moment(new Date()).format(dateFormat);
  const aWeekAgo = moment(new Date()).subtract(1, 'weeks').format(dateFormat);
  const [categoriesData2, setCategoriesData2] = useState(examplePieData);
  const [searchValue, setSearchValue] = useState({
    startDate: aWeekAgo,
    endDate: today,
    categoryStatusId: 1,
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
      endDate: convertDateBeforeFetch(data?.dateFromTo[1].$d),
    });
  };

  useEffect(() => {
    user &&
      (async () => {
        const pieChartData = await chartApi.pieChart(
          searchValue,
          user,
          dispatch
        );
        pieChartData && setCategoriesData2(pieChartData);
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
        categoriesData={categoriesData2}
        title="The comparison of categories in income"
        colorTitle="green"
        label="Income"
      />
    </Fragment>
  );
}

export default ChartCategoryIncome;
