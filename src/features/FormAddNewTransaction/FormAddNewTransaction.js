import {
  Grid,
  Input,
  Card,
  Button,
  Text,
  Spacer,
  Radio,
  Textarea,
} from '@nextui-org/react';

import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames/bind';
import * as yup from 'yup';

import styles from './FormAddNewTransaction.module.scss';
import transactionApi from '~/api/transactionApi';

const cx = classNames.bind(styles);

const schema = yup.object({
  amount: yup
    .number()
    .positive('The amount of money must be greater than 0')
    .typeError('The amount is required')
    .required('The amount is required'),
  categoryId: yup
    .number()
    .integer()
    .min(1, 'Please choose category')
    .typeError('Please choose category')
    .required(),
  categoryStatusId: yup.number().required(),
  date: yup.date().required(),
  description: yup.string(),
});

///////////////////////////////////////////////////////////////////////////
function FormAddNewTransaction({ transaction }) {
  const today = moment(new Date()).format('yyyy-MM-DD');
  const dispatch = useDispatch();
  const amountRef = useRef();
  const message = useSelector((state) => state.transactions.post.message);
  const user = useSelector((state) => state.auth.login.currentUser);
  const categorySource = useSelector((state) => state.categories.list);
  const [categoryId, setCategoryId] = useState(transaction?.categoryId || 0);
  const [categoryStatusId, setCategoryStatusId] = useState(
    categorySource.find((category) => category.id === categoryId)
      ?.categoryStatusId || 1
  );
  const [showMsg, setShowMsg] = useState(false);

  const {
    handleSubmit,
    control,
    resetField,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: transaction?.id || null,
      amount: transaction?.amount || 0,
      date: transaction?.date || today,
      categoryStatusId: categoryStatusId,
      description: transaction?.description || '',
    },
  });

  const resetFields = () => {
    resetField('id', { defaultValue: null });
    resetField('amount', { defaultValue: 0 });
    resetField('categoryId', { defaultValue: 0 });
    resetField('description', { defaultValue: '' });
    amountRef.current.focus();
  };

  const handleOnSubmit = (data) => {
    setShowMsg(true);
    resetFields();
    transaction?.id
      ? transactionApi.update(data, user, dispatch)
      : transactionApi.post(data, user, dispatch);
  };

  useEffect(() => {
    resetField('categoryId', { defaultValue: 0 });
  }, [categoryStatusId, resetField]);

  return (
    <form
      onClick={() => setShowMsg(false)}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <input {...register('id')} type="hidden" value={transaction?.id} />
      <Grid>
        <Text
          h1
          size={20}
          css={{
            textGradient: '45deg, $blue600 -20%, $pink600 50%',
          }}
          weight="bold"
        >
          {transaction ? 'UPDATE TRANSACTION' : 'ADD NEW TRANSACTION'}
        </Text>
        <Spacer />
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              aria-label="llp"
              width="100%"
              height="40px"
              weight="bold"
              rounded
              bordered
              clearable={true}
              labelLeft="Enter Money"
              status="primary"
              contentRightStyling={true}
              placeholder="Enter amount..."
              type="number"
              size="xl"
              ref={amountRef}
            />
          )}
        />
        <Text color="red">{errors.amount?.message}</Text>
        <Spacer />

        <Text
          h1
          size={20}
          css={{
            textGradient: '45deg, #0B63F6 -20%, #000066  50%',
          }}
          weight="bold"
        >
          Choose income or expense
        </Text>
        <Controller
          name="categoryStatusId"
          control={control}
          render={({ field }) => (
            <Radio.Group
              {...field}
              aria-label="radio"
              onChange={(e) => setCategoryStatusId(e)}
              value={categoryStatusId}
              css={{ flexDirection: 'column' }}
            >
              <Card
                variant="flat"
                css={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                }}
              >
                <Card
                  css={{
                    width: '50%',
                    height: '50px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadow: 'none',
                    borderWidth: categoryStatusId === 1 ? '4px' : '0',
                    borderColor: categoryStatusId === 1 ? '#17C964' : '',
                  }}
                  variant="bordered"
                >
                  <Radio
                    css={{
                      padding: '100% 100%',
                      fontWeight: '600',
                    }}
                    labelColor="success"
                    size="lg"
                    color="success"
                    value={1}
                    isSquared
                    aria-label="l1"
                    onFocus={() => {
                      resetField('categoryId');
                    }}
                  >
                    Income
                  </Radio>
                </Card>
                <Card
                  variant="bordered"
                  css={{
                    width: '50%',
                    height: '50px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: categoryStatusId === 2 ? '4px' : '0px',
                    borderColor: categoryStatusId === 2 ? '#f31260' : '',
                  }}
                >
                  <Radio
                    css={{
                      padding: '100% 100%',
                      fontWeight: '600',
                    }}
                    color="error"
                    labelColor="error"
                    size="lg"
                    aria-label="l2"
                    value={2}
                    isSquared
                    onFocusChange={() => {
                      resetField('categoryId');
                    }}
                  >
                    Expense
                  </Radio>
                </Card>
              </Card>
            </Radio.Group>
          )}
        />
        <Text>{errors.categoryStatusId?.message}</Text>

        <Spacer />

        <Card
          variant="flat"
          css={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'transparent',
            borderRadius: 0,
          }}
        >
          <Card
            variant="flat"
            css={{
              backgroundColor: 'transparent',
              width: '50%',
              borderRadius: '0px',
            }}
          >
            <Text
              h1
              size={20}
              css={{
                textGradient: '45deg, #0B63F6 -20%, #000066  50%',
              }}
              weight="bold"
            >
              Choose category
            </Text>
            <select
              className={cx('select')}
              {...register('categoryId')}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value={0}>None</option>
              {categorySource
                .filter((category) => {
                  return categoryStatusId === 1
                    ? category.categoryStatusId === 1
                    : category.categoryStatusId === 2;
                })
                .map((category) => (
                  <option
                    className="option"
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
            </select>
            <Text color="red">{errors.categoryId?.message}</Text>
          </Card>
          <Card
            variant="flat"
            css={{ backgroundColor: 'transparent', width: '50%' }}
          >
            <Text
              h1
              size={20}
              css={{
                textGradient: '45deg, #0B63F6 -20%, #000066  50%',
              }}
              weight="bold"
            >
              Pick your date
            </Text>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <Input
                  {...field}
                  rounded={true}
                  width="100%"
                  aria-label="date"
                  type="date"
                  size="xl"
                />
              )}
            />
          </Card>
        </Card>
        <Spacer />
        <Text
          h1
          size={20}
          css={{
            textGradient: '45deg, #0B63F6 -20%, #000066  50%',
          }}
          weight="bold"
        >
          Description
        </Text>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              css={{ width: '100%' }}
              size="xl"
              aria-label="aria"
            ></Textarea>
          )}
        />
        <Spacer />
        {showMsg && (
          <>
            <Text css={{ color: 'Green', fontWeight: 'bold' }}>{message}</Text>
            <Spacer />
          </>
        )}
        <Button
          css={{
            margin: '0 auto',
            width: '50%',
            fontWeight: '600',
          }}
          color="gradient"
          auto
          ghost
          type="submit"
        >
          {transaction?.id ? 'Update transaction' : 'Add new Transaction'}
        </Button>
      </Grid>
    </form>
  );
}

export default FormAddNewTransaction;
