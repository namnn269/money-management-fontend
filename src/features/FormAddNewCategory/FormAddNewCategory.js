import { Input, Card, Button, Text, Spacer, Radio } from '@nextui-org/react';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import categoryApi from '~/api/categoryApi';
import { useDispatch, useSelector } from 'react-redux';

const schema = yup.object({
  name: yup.string().required('This field is required!'),
  categoryStatusId: yup.number().required(),
});

/////////////////////////////////////////////////////////////////
function FormAddNewCategory({ updateCategory }) {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const [categoryStatusId, setCategoryStatusId] = useState(
    updateCategory?.categoryStatusId || 1
  );
  const [showMsg, setShowMsg] = useState(false);
  const categoryRef = useRef();
  const {
    handleSubmit,
    control,
    register,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: updateCategory?.id || null,
      name: updateCategory?.name || '',
      categoryStatusId: categoryStatusId,
      color: updateCategory?.color || '#000000',
    },
  });

  const addNewState = useSelector((state) => state.categories.post);

  const handleOnSubmit = (data) => {
    data = { ...data, categoryStatusId: categoryStatusId };
    updateCategory?.id
      ? categoryApi.updateCategory(data, user, dispatch)
      : categoryApi.postCategory(data, user, dispatch);
    resetField('name', { defaultValue: '' });
    setShowMsg(true);
    categoryRef.current.focus();
  };
  return (
    <form
      onClick={() => setShowMsg(false)}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <Text
        h1
        size={20}
        css={{
          textGradient: '45deg, $blue600 -20%, $pink600 50%',
          fontWeight: 'bold',
        }}
      >
        {updateCategory ? 'UPDATE CATEGORY' : 'ADD NEW CATEGORY'}
      </Text>
      {addNewState.success && showMsg && <Text>{addNewState.message}</Text>}
      {addNewState.error && showMsg && <Text>{addNewState.message}</Text>}
      <Spacer />
      <Input aria-label="id" type={'hidden'} {...register} />
      <Controller
        control={control}
        name="categoryStatusId"
        render={({ field }) => (
          <Radio.Group
            {...field}
            aria-label="radio"
            css={{ flexDirection: 'column' }}
            value={categoryStatusId}
            onChange={(e) => {
              console.log(e);
              setCategoryStatusId(e);
            }}
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
                  height: '40px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadow: 'none',
                }}
                variant="bordered"
              >
                <Radio
                  css={{
                    padding: '100% 100%',
                    fontWeight: '500',
                    backgroundColor: categoryStatusId === 1 ? '#17C964' : '',
                  }}
                  labelColor={categoryStatusId === 1 ? 'warning' : 'success'}
                  size="lg"
                  color="success"
                  value={1}
                  isSquared
                  aria-label="l1"
                >
                  Income
                </Radio>
              </Card>
              <Card
                variant="bordered"
                css={{
                  width: '50%',
                  height: '40px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Radio
                  css={{
                    padding: '100% 100%',
                    fontWeight: '500',
                    backgroundColor: categoryStatusId === 2 ? '#f31260' : '',
                  }}
                  color="error"
                  labelColor={categoryStatusId === 2 ? 'warning' : 'error'}
                  size="lg"
                  aria-label="l2"
                  value={2}
                  isSquared
                >
                  Expense
                </Radio>
              </Card>
            </Card>
          </Radio.Group>
        )}
      />
      <Card
        css={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: '0',
        }}
      ></Card>
      <Spacer />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            ref={categoryRef}
            aria-label="llp"
            width="100%"
            rounded
            bordered
            clearable={true}
            labelLeft="Enter Category"
            status={categoryStatusId === 1 ? 'success' : 'error'}
            contentRightStyling={true}
            placeholder="New category"
            type="text"
            size="lg"
          />
        )}
      />
      <Spacer />
      <Text color="red">{errors.name?.message}</Text>

      {/* --------------------Color----------------- */}
      <Spacer />
      <Text
        h1
        size={20}
        css={{
          textGradient: '45deg, #0B63F6 -20%, #000066  50%',
        }}
        weight="bold"
      >
        Choose category color
      </Text>
      <Controller
        control={control}
        name="color"
        render={({ field }) => (
          <Input {...field} aria-label="color" type="color" width="50%" />
        )}
      />
      <Spacer />
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
        {updateCategory ? 'Update Category' : '  Add new Category'}
      </Button>
    </form>
  );
}

export default FormAddNewCategory;
