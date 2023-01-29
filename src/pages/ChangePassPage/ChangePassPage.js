/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Input, Spacer, Text } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import authApi from '~/api/authApi';

const passwordRegex =
  //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*`])[0-9a-zA-Z~!@#$%^&*`]{8,}$/;
  /^[A-Za-z]+[0-9]*.$/;

const schema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is not empty'),
  newPassword1: Yup.string()
    .matches(
      passwordRegex,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character, and at least 8 characters'
    )
    .required('New password is not empty'),
  newPassword2: Yup.string()
    .when('newPassword1', {
      is: (val) => !!(val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref('newPassword1')],
        'New passwords do not match'
      ),
    })
    .required('New password is not empty'),
});

/////////////////////////////////////////////////////////////////////////
function ChangePassPage() {
  const changePassword = useSelector((state) => state.auth.changePassword);
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (data) => {
    authApi.changePassword(data, user, dispatch);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Container
        css={{ display: 'flex', flexDirection: 'column', padding: '$10' }}
      >
        <Text
          h1
          size={20}
          align="center"
          css={{
            textGradient: '45deg, $blue600 -20%, $pink600 50%',
            fontWeight: 'bold',
          }}
        >
          Change password
        </Text>
        <Spacer />
        <Input
          {...register('currentPassword')}
          type="password"
          label="Current password"
        />
        <Text css={{ color: 'red', fontSize: '12px' }}>
          {errors?.currentPassword?.message}
        </Text>
        <Spacer />
        <Input {...register('newPassword1')} type="text" label="New password" />
        <Text css={{ color: 'red', fontSize: '12px' }}>
          {errors?.newPassword1?.message}
        </Text>
        <Spacer />
        <Input {...register('newPassword2')} type="text" label="New password" />
        <Text css={{ color: 'red', fontSize: '12px' }}>
          {errors?.newPassword2?.message}
        </Text>
        <Spacer />
        <Text>{changePassword?.isFetching ? 'loading' : ''}</Text>
        <Button type="submit" bordered>
          Change password
        </Button>
      </Container>
    </form>
  );
}

export default ChangePassPage;
