/* eslint-disable react-hooks/exhaustive-deps */
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

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import authApi from '~/api/authApi';
import { useEffect } from 'react';
import { clearMsgRegister } from '~/redux/authSlice';
import { defaultAvatar } from '~/configs/constant';

const theme = createTheme();
const avatar = defaultAvatar;
const schema = Yup.object({
  username: Yup.string().trim().required('Username is required!'),
  email: Yup.string()
    .trim()
    .email('Invalid email!')
    .required('Email is required!'),
  password: Yup.string()
    .min(2, 'Min length is 2')
    .required('Password is required!'),
});

/////////////////////////////////////////////////////////////////
export default function SignUp() {
  const message = useSelector((state) => state.auth.register.message);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (data) => {
    authApi.register({ ...data, avatar }, dispatch, navigate);
  };

  useEffect(() => {
    dispatch(clearMsgRegister());
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
            Sign up
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
              <Grid item xs={12}>
                <TextField
                  {...register('password')}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                />
                <Text css={{ color: 'red', fontSize: '12px' }}>
                  {errors.password?.message}
                </Text>
                {message && (
                  <Text css={{ color: 'red', fontSize: '14px' }}>
                    {message}
                  </Text>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  <Text css={{ color: '#1493f5', textDecoration: 'underline' }}>
                    Already have an account? Sign in
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
