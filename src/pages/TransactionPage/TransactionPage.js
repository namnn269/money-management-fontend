import { Grid, Card, Spacer } from '@nextui-org/react';
import FormAddNewCategory from '~/features/FormAddNewCategory';
import FormAddNewTransaction from '~/features/FormAddNewTransaction';

function TransactionPage() {
  return (
    <Grid.Container gap={1} justify="center">
      <Grid xs={12} sm={6}>
        <Card>
          <Card.Body>
            <FormAddNewTransaction />
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={12} sm={6}>
        <Card>
          <Card.Body>
            <FormAddNewCategory />
          </Card.Body>
        </Card>
      </Grid>
      <Spacer />
    </Grid.Container>
  );
}

export default TransactionPage;
