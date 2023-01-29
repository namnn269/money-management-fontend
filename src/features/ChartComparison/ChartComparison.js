/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Container, Spacer } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { Space, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment/moment';

import CircleButton from '~/components/CircleButton';
import { dateFormat, convertDateBeforeFetch } from '~/configs/datetime';
import chartApi from '~/api/chartApi';
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const { RangePicker } = DatePicker;
const m = moment();
const today = m.clone().format(dateFormat);
const aWeekAgo = m.clone().subtract(2, 'weeks').format(dateFormat);

const mapperFromResToChartData = (res) => {
  const labels = [];
  const incomeData = [];
  const expenseData = [];
  res?.chartData.forEach((el) => {
    labels.push(el.timePoint);
    incomeData.push(el.incomeAmount);
    expenseData.push(el.expenseAmount);
  });
  return { labels, incomeData, expenseData };
};

///////////////////////////////////////////////////////////////////
function ChartComparison() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState({
    startDate: dayjs(aWeekAgo, dateFormat),
    endDate: dayjs(today, dateFormat),
    timeFilter: 'day',
  });
  const [chartData, setChartData] = useState({
    labels: [],
    incomeData: [],
    expenseData: [],
  });
  const { handleSubmit, control } = useForm({
    defaultValues: {
      periodTime: [searchValue.startDate, searchValue.endDate],
      timeFilter: searchValue.timeFilter,
    },
  });

  const callApi = () => {
    try {
      user &&
        (async () => {
          const res = await chartApi.comparisonChart(
            searchValue,
            user,
            dispatch
          );
          setChartData(mapperFromResToChartData(res));
        })();
    } catch (error) {
      console.log('in error: ', error);
    }
  };

  useEffect(() => {
    callApi();
  }, [searchValue]);

  const handleOnsubmit = (data) => {
    setSearchValue({
      startDate: convertDateBeforeFetch(data?.periodTime[0].$d),
      endDate: convertDateBeforeFetch(data?.periodTime[1].$d),
      timeFilter: data.timeFilter,
    });
  };

  return (
    <Fragment>
      <Spacer />
      <form onSubmit={handleSubmit(handleOnsubmit)}>
        <Spacer />
        <Container
          css={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <Controller
            control={control}
            name="periodTime"
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

          <Controller
            control={control}
            name="timeFilter"
            render={({ field }) => (
              <Select {...field}>
                <Select.Option value="day">Day</Select.Option>
                <Select.Option value="week">Week</Select.Option>
                <Select.Option value="month">Month</Select.Option>
                <Select.Option value="year">Year</Select.Option>
              </Select>
            )}
          />
          <CircleButton size="30px" name="OK" />
        </Container>
      </form>

      <Line
        data={{
          // labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10'],
          labels: chartData.labels,
          datasets: [
            //{label:'T1', income:12, expense: 15}
            {
              // data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 1000],
              data: chartData.expenseData,
              label: 'Expense',
              borderColor: 'red',
              filler: true,
              pointBackgroundColor: 'red',
              backgroundColor: 'white',
            },
            {
              // data: [55, 22, 66, 99, 115, 265, 125, 48, 122, 456],
              data: chartData.incomeData,
              label: 'Income',
              borderColor: 'green',
              filler: true,
              pointBackgroundColor: 'green',
              backgroundColor: 'white',
            },
          ],
        }}
        options={{
          responsive: true,
          pointBorderWidth: 0,
          pointRadius: 3,
          pointStyle: 'rectRounded',
          borderWidth: 2,
          tension: 0.3,
          plugins: {
            title: {
              color: '#0a9cd1',
              fullSize: true,
              font: { size: 15 },
              display: true,
              text: 'The comparison between income vs expense',
            },
            legend: {
              display: true,
              position: 'top',
              labels: {},
            },
          },
        }}
      />
    </Fragment>
  );
}

export default ChartComparison;
