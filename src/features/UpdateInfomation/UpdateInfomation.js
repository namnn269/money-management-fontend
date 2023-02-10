import { Button, Container, Input, Spacer, Text } from '@nextui-org/react';

function UpdateInfomation() {
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
        Update Infomation
      </Text>
      <Spacer />
      <Input placeholder="Fullname" type="text" label="Fullname" />
      <Spacer />
      <Input placeholder="Address" type="text" label="Address" />
      <Spacer />
      <Input placeholder="Phone" type="text" label="Phone" />
      <Spacer />
      <Button bordered>Update</Button>
      <Spacer />
    </Container>
  );
}

export default UpdateInfomation;
