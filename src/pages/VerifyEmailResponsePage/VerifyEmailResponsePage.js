/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Spacer, Text } from '@nextui-org/react';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '~/api/authApi';
import LoadingIcon from '~/components/LoadingIcon';

function VerifyEmailResponsePage() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const params = queryString.parse(window.location.search);
  const content = {
    title: '',
    buttonName: '',
    successMessage: '',
    url: process.env.REACT_APP_API_URL,
  };
  switch (params.type) {
    case 'reset_password':
      content.title = 'Reset password';
      content.url += '/auth/resendEmailForResetPassword';
      content.buttonName = 'Resend email to reset your password';
      content.successMessage =
        'Reset password successfully. Please check new password in your email!';
      break;
    case 'verify_email':
      content.title = 'Verify Email';
      content.url += '/auth/resendEmail';
      content.buttonName = 'Resend email to verify your account';
      content.successMessage = 'Verify email successfully!';
      break;
    default:
      break;
  }
  content.url += '?token=' + params.token;

  let verifiedEmail = false;
  let display = true;
  try {
    verifiedEmail = JSON.parse(params.verified_email);
  } catch (error) {
    display = false;
  }
  useEffect(() => {
    (() => verifiedEmail && user && authApi.updateInfo({}, user, dispatch))();
  }, []);
  return (
    <Card css={{ padding: '$10', height: '50vh' }}>
      {isLoading && <LoadingIcon />}
      <Text
        h1
        size={20}
        align="center"
        css={{
          textGradient: '45deg, $blue600 -20%, $pink600 50%',
          fontWeight: 'bold',
        }}
      >
        {content.title}
      </Text>
      <Spacer />
      <Text css={{ fontSize: '$2xl', fontWeight: '$bold', color: 'Red' }}>
        {params?.message}
      </Text>
      <Spacer />
      {display &&
        (verifiedEmail ? (
          <Text css={{ fontSize: '$2xl', fontWeight: '$bold', color: 'Green' }}>
            {content.successMessage}
          </Text>
        ) : (
          <>
            <Text>Click the following button to resend email</Text>
            <Spacer />
            <Button color="default" onPress={() => setIsLoading(true)}>
              <a href={content.url} style={{ color: 'white' }}>
                {content.buttonName}
              </a>
            </Button>
          </>
        ))}
    </Card>
  );
}

export default VerifyEmailResponsePage;
