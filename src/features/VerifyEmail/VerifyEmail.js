import { Button, Container, Input, Spacer, Text } from '@nextui-org/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '~/api/authApi';
import LoadingIcon from '~/components/LoadingIcon';

function ConfirmEmail() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(user?.email || '');

  const verifyEmail = () => {
    user && authApi.verifyEmail(email, user, dispatch);
  };

  return (
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
        Confirm email
      </Text>
      <Input
        placeholder="Confirm email"
        type="email"
        value={email}
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        readOnly={user?.verifiedEmail}
      />
      {user?.verifiedEmail ? (
        <Text css={{ color: 'Green', fontWeight: 'bold' }}>
          Email was verified successfully!
        </Text>
      ) : (
        <>
          <Text css={{ color: 'Red', fontWeight: 'bold' }}>
            Email was not verified !
          </Text>
          <Spacer />
          <Button onPress={verifyEmail} bordered>
            Confirm email
          </Button>
        </>
      )}
      {auth?.verifyEmail.isFetching && <LoadingIcon />}
      {auth?.verifyEmail.success && (
        <Text css={{ color: 'Green' }}>
          We send email to your email to confirm? Please check your email
        </Text>
      )}
      <Text css={{ color: 'Red', fontWeight: 'bold' }}>
        {auth?.verifyEmail.message}
      </Text>
      <Spacer />
    </Container>
  );
}

export default ConfirmEmail;
