import { Card, Grid } from '@nextui-org/react';

import ChangePassWordPage from '../ChangePassPage';
import AvatarUpload from '~/features/AvatarUpload';
import VerifyEmail from '~/features/VerifyEmail';
// import UpdateInfomation from '~/features/UpdateInfomation';

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
          <VerifyEmail />
        </Card>
      </Grid>
    </Grid.Container>
  );
}

export default AccountPage;
