import { Button, Container, Input, Spacer, Text } from '@nextui-org/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function ConfirmEmail() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [email, setEmail] = useState(user?.email || '');
  return (
    <Container
      css={{ display: 'flex', flexDirection: 'column', padding: '$10' }}
    >
      <Spacer />
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
        readOnly={user?.confirmedEmail}
      />
      {user?.confirmedEmail && (
        <Text css={{ color: 'Green', fontWeight: 'bold' }}>
          Email was confirmed successfully!
        </Text>
      )}
      <Spacer />
      <Button bordered>Confirm email</Button>
      <Spacer />
    </Container>
  );
}

export default ConfirmEmail;
