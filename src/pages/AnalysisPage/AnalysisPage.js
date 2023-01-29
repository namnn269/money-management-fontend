import { Grid, Spacer, Card } from '@nextui-org/react';

import ChartComparison from '~/features/ChartComparison';
import ChartCategoryIncome from '~/features/ChartCategoryIncome';
import ChartCategoryExpense from '~/features/ChartCategoryExpense';

function AnalysisPage() {
  return (
    <div>
      <Grid.Container gap={1}>
        <Grid xs={12} justify="center">
          <Card
            css={{ width: '100%', padding: '0px', justifyContent: 'center' }}
          >
            <ChartComparison />
          </Card>
        </Grid>
        <Spacer />
        <Spacer />
        <Grid xs={12} css={{ justifyContent: 'center' }}>
          <Grid.Container gap={1} css={{ width: '100%' }}>
            <Grid xs={12} sm={6}>
              <Card css={{ padding: '10px' }}>
                <ChartCategoryIncome />
              </Card>
            </Grid>
            <Grid xs={12} sm={6}>
              <Card css={{ padding: '10px' }}>
                <ChartCategoryExpense />
              </Card>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </div>
  );
}

export default AnalysisPage;
