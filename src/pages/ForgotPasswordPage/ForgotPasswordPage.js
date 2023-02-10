import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup';

import { Link, useNavigate } from 'react-router-dom';
import { Text } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import authApi from '~/api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIcon from '~/components/LoadingIcon';

const theme = createTheme();

const schema = Yup.object({
  username: Yup.string().trim().required('Username must not be empty!'),
  email: Yup.string()
    .email('Email must be a valid email!')
    .required('Email must not empty!'),
});
//////////////////////////////////////////////////
function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetPassword = useSelector((state) => state.auth.resetPassword);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { username: '', email: '' },
    resolver: yupResolver(schema),
  });

  const handleSignup = (data) => {
    authApi.resetPassword(data, dispatch, navigate);
  };

  return (
    <ThemeProvider theme={theme}>
      {resetPassword.isFetching && <LoadingIcon />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography marginBottom="20px" component="h1" variant="h5">
            Forgot password
          </Typography>
          <form onSubmit={handleSubmit(handleSignup)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  {...register('username')}
                  fullWidth
                  label="Username"
                  name="username"
                />
                <Text css={{ color: 'red', fontSize: '12px' }}>
                  {errors.username?.message}
                </Text>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('email', { required: true })}
                  fullWidth
                  label="Email Address"
                  name="email"
                />
                <Text css={{ color: 'red', fontSize: '12px' }}>
                  {errors.email?.message}
                </Text>
              </Grid>
            </Grid>
            <Text css={{ color: 'Red', fontWeight: 'bold' }}>
              {resetPassword.message}
            </Text>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset password
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  <Text css={{ color: '#1493f5', textDecoration: 'underline' }}>
                    {'-> Log in'}
                  </Text>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ForgotPasswordPage;
