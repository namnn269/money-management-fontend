import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Text } from '@nextui-org/react';

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import authApi from '~/api/authApi';
import { useDispatch, useSelector } from 'react-redux';

const theme = createTheme();

const schema = Yup.object({
  username: Yup.string().trim().required('Username is required!'),
  password: Yup.string().required('Password is required!'),
});

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isError = useSelector((state) => state.auth.login.error);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      rememberme: false,
      password: '',
    },
  });

  const handleLogin = (data) => {
    authApi.login(data, dispatch, navigate);
  };

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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(handleLogin)}>
            <TextField
              {...register('username', { pattern: /^[0-9]+$/ })}
              margin="normal"
              fullWidth
              label="Username"
              autoFocus
            />
            <Text css={{ color: 'red', fontSize: '12px' }}>
              {errors.username?.message}
            </Text>
            <TextField
              {...register('password', { pattern: /^[0-9]+$/ })}
              margin="normal"
              fullWidth
              label="Password"
              type="password"
            />
            <Text css={{ color: 'red', fontSize: '12px' }}>
              {errors.password?.message}
            </Text>

            <Checkbox {...register('rememberme')} color="primary" />
            <span>Remember me</span>
            {isError && (
              <Text css={{ color: 'red', fontSize: '14px' }}>
                Tên đăng nhập hoặc mật khẩu sai
              </Text>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  <Text css={{ color: '#1493f5', textDecoration: 'underline' }}>
                    Don't have an account? Sign Up
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
