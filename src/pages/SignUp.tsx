import * as React from 'react';
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
import { useForm, SubmitHandler } from 'react-hook-form';
import { api } from '../services/api';
import { IRequestError, IUserSignUp } from '../@types/common';
import { Alert } from '@mui/material';
import { apiErrorParser } from '../utils';
import { useAppDispatch } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../store/reducers/appSlice';

const theme = createTheme();

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserSignUp>();
  const [signUp, { error, isLoading, data, isError }] = api.useSignUpMutation();
  const [signIn] = api.useSignInMutation();

  const onSubmit: SubmitHandler<IUserSignUp> = async (userData) => {
    await signUp(userData);
    console.log('data', data);
    if (!isError) {
      const result = await signIn({ login: userData.login, password: userData.password }).unwrap();
      dispatch(setToken(result.token));
      localStorage.setItem('TOKEN_AUTH_LOCALSTORAGE', result.token);
      navigate('/boards');
    }
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
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register('name', { required: true })}
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  autoFocus
                />
                {errors.name && (
                  <Typography variant="subtitle2" sx={{ color: 'red' }}>
                    This field is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('login', { required: true })}
                  required
                  fullWidth
                  id="login"
                  label="login"
                  name="login"
                  autoComplete="login"
                />
                {errors.login && (
                  <Typography variant="subtitle2" sx={{ color: 'red' }}>
                    This field is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password', { required: true, minLength: 8 })}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <Typography variant="subtitle2" sx={{ color: 'red' }}>
                    Minimum password length 8 characters
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
      {error && (
        <Alert variant="filled" severity="error">
          {apiErrorParser(error as IRequestError)}
        </Alert>
      )}
    </ThemeProvider>
  );
}
