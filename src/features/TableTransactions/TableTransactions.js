/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  Dropdown,
  Spacer,
  Checkbox,
  Button,
  Pagination,
  Modal,
} from '@nextui-org/react';
import { DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import moment from 'moment';

import { Box } from '~/features/Navbar/Box';
import FormAddNewTransaction from '~/features/FormAddNewTransaction';
import { dateFormat } from '~/configs/datetime';
import Circle from '~/components/Circle';
import transactionApi from '~/api/transactionApi';
import RenderTransTable from '../RenderTransTable';
import styles from './TableTransaction.module.scss';

const cx = classNames.bind(styles);
const { RangePicker } = DatePicker;

/////////////////////////////////////////////////////////////////////////
export default function TableTransactions() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const categorySource = useSelector((state) => state.categories.list);
  const listItems = useSelector((state) => state.transactions.page.list);
  const totalPages = useSelector((state) => state.transactions.page.totalPages);
  const [categoryList, setCategoryList] = useState([]);
  const [showEditTransView, setShowEditTransView] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [currentIdTrans, setCurrentIdTrans] = useState(0);
  const [pageParams, setPageParams] = useState({
    startDate: moment(new Date()).subtract(7, 'days').format(dateFormat),
    endDate: moment(new Date()).format(dateFormat),
    categorySelectedIds: [0],
    categoryStatusIds: [],
    pageSize: 5,
    pageNo: 1,
  });
  const callApi = () => {
    const data = {
      ...pageParams,
      categorySelectedIds: pageParams.categorySelectedIds.slice(1),
    };
    (async () => {
      user && (await transactionApi.get(data, user, dispatch));
    })();
  };

  const deleteTrans = (id) => {
    user && transactionApi.delete(id, user, dispatch);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setPageParams({ ...pageParams, pageNo: 1 });
    user && callApi();
  };

  useEffect(() => {
    user && callApi();
  }, [pageParams.pageNo]);

  // change category list in transaction history form when category status changes
  useEffect(() => {
    if (
      pageParams.categoryStatusIds.length === 0 ||
      pageParams.categoryStatusIds.length === 2
    ) {
      setCategoryList(categorySource);
      return;
    }
    setCategoryList(
      categorySource.filter(
        (category) =>
          pageParams.categoryStatusIds[0] === category.categoryStatusId
      )
    );
    setPageParams({ ...pageParams, categorySelectedIds: [0] });
  }, [pageParams.categoryStatusIds, categorySource]);

  const selectedValue =
    '' +
    pageParams.categorySelectedIds
      .map((id) => {
        id = Number.parseInt(id);
        return categoryList.find((category) => category.id === id)?.name;
      })
      .join('-- ');

  ////////////////////////////////
  return (
    <Box>
      <Text
        h1
        size={20}
        align="center"
        css={{
          textGradient: '45deg, $blue600 -20%, $pink600 50%',
          fontWeight: 'bold',
        }}
      >
        YOUR TRANSACTIONS
      </Text>
      <Spacer />
      <Box css={{ margin: '0 18px' }}>
        {/* --------------- FORM ----------------- */}

        <form onSubmit={handleOnSubmit}>
          <RangePicker
            disabledDate={(current) => current > dayjs().endOf('day')}
            format={dateFormat}
            value={[
              dayjs(pageParams.startDate, dateFormat),
              dayjs(pageParams.endDate, dateFormat),
            ]}
            onChange={(e) => {
              setPageParams({
                ...pageParams,
                startDate: moment(e[0].$d).format(dateFormat),
                endDate: moment(e[1].$d).format(dateFormat),
              });
            }}
          />

          {/* ------------------ Category ------------------- */}

          <Spacer />
          <Text css={{ display: 'inline-block' }}>Category</Text>

          <Dropdown>
            <Dropdown.Button
              flat
              color="secondary"
              css={{
                tt: 'capitalize',
                display: 'inline-flex',
                color: '#11181c',
                backgroundColor: '#f1f3f5',
                margin: '5px 10px 5px 5px',
              }}
            >
              {selectedValue}
            </Dropdown.Button>

            <Dropdown.Menu
              aria-label="Multiple selection actions"
              color="primary"
              disallowEmptySelection
              selectionMode="multiple"
              selectedKeys={pageParams.categorySelectedIds}
              onSelectionChange={(e) =>
                setPageParams({ ...pageParams, categorySelectedIds: [...e] })
              }
            >
              {categoryList.map((category) => (
                <Dropdown.Item
                  icon={
                    <Circle
                      size={14}
                      bgColor={
                        category.categoryStatusId === 1 ? 'green' : 'red'
                      }
                    />
                  }
                  key={category.id}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {/* ------------------- Type INCOME/EXPENSE ------------------ */}

          <Spacer />
          <Box
            css={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
            }}
          >
            <Checkbox.Group
              label="Select type"
              color="primary"
              orientation="horizontal"
              onChange={(e) =>
                setPageParams({ ...pageParams, categoryStatusIds: e })
              }
              value={pageParams.categoryStatusIds}
            >
              <Checkbox value={1}>Income</Checkbox>
              <Checkbox value={2}>Expense</Checkbox>
            </Checkbox.Group>

            {/* ------------------- Page Size ------------------ */}

            <Box>
              <Text color="#7e8284">Page size</Text>

              <select
                label="lll"
                className={cx('select')}
                value={pageParams.pageSize}
                onChange={(e) =>
                  setPageParams({ ...pageParams, pageSize: e.target.value })
                }
              >
                <option className={cx('option')} value={5}>
                  5
                </option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </Box>
          </Box>
          {/* ----------------- Button --------------------*/}

          <Spacer />
          <Button
            css={{
              width: '100%',
              height: '30px',
              borderRadius: '999px',
            }}
            type="submit"
          >
            Search
          </Button>
        </form>
      </Box>

      {/* ////////////////////////////////////////////// */}
      {/* ----------------Table transactions------------ */}

      <RenderTransTable
        categorySource={categorySource}
        listItems={listItems}
        deleteTrans={deleteTrans}
        setCurrentIdTrans={setCurrentIdTrans}
        setShowEditTransView={setShowEditTransView}
      />

      <Box css={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          size="md"
          total={totalPages}
          initialPage={pageParams.pageNo}
          onChange={(e) => setPageParams({ ...pageParams, pageNo: e })}
        />
      </Box>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={showEditTransView}
        onClose={() => {
          setShowEditTransView(false);
          setReRender(!reRender);
        }}
      >
        <Modal.Body>
          <FormAddNewTransaction
            transaction={listItems?.find((item) => item.id === currentIdTrans)}
          />
        </Modal.Body>
      </Modal>
    </Box>
  );
}
