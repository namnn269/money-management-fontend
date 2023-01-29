import { Grid, Card, Spacer } from '@nextui-org/react';
import TableTransactions from '~/features/TableTransactions';
import TableCategories from '~/features/TableCategories';
import { Box } from '~/features/Navbar/Box';

function HistoryPage() {
  return (
    <Grid.Container gap={1} justify="center">
      <Grid sm={6} xs={12}>
        <Card>
          <Spacer />
          <TableTransactions />
          <Spacer />
        </Card>
      </Grid>
      <Grid sm={6} xs={12}>
        <Card>
          <Card.Body>
            <TableCategories />
          </Card.Body>
        </Card>
      </Grid>
      <Box css={{ marginBottom: '500px' }} />
    </Grid.Container>
  );
}

export default HistoryPage;
