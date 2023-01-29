import { Text, Button, Grid, Row, Spacer } from '@nextui-org/react';

const Popover = ({ deleteFc, confirmMsg }) => {
  return (
    <Grid.Container
      css={{ borderRadius: '14px', padding: '0.75rem', maxWidth: '360px' }}
    >
      <Row justify="center" align="center">
        <Text b>Confirm</Text>
      </Row>
      <Row justify="center" align="center">
        {/* <Text>Are you sure you want to delete?</Text> */}
        <Text>{confirmMsg}</Text>
      </Row>
      <Row justify="center" align="center">
        <Button
          size="sm"
          shadow
          color="error"
          onPress={() => {
            deleteFc();
          }}
        >
          Delete
        </Button>
      </Row>
      <Spacer />
    </Grid.Container>
  );
};

export default Popover;
