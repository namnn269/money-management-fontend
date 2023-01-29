import { Card, Grid } from '@nextui-org/react';

import ChangePassWordPage from '../ChangePassPage';
import AvatarUpload from '~/features/AvatarUpload';
import ConfirmEmail from '~/features/ConfirmEmail';
import UpdateInfomation from '~/features/UpdateInfomation';

function AccountPage() {
  return (
    <Grid.Container gap={1}>
      <Grid xs={12} sm={6}>
        <Card css={{ alignItems: 'flex-start', padding: '$10' }}>
          <AvatarUpload />
        </Card>
      </Grid>
      <Grid xs={12} sm={6}>
        <Card>
          <ChangePassWordPage />
        </Card>
      </Grid>
      <Grid xs={12} sm={6}>
        <Card>
          <ConfirmEmail />
        </Card>
      </Grid>
      <Grid xs={12} sm={6}>
        <Card>
          <UpdateInfomation />
        </Card>
      </Grid>
    </Grid.Container>
  );
}

export default AccountPage;
