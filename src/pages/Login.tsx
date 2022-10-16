import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from '../services/api';
import { IRequestError, IUserSignIn } from '../@types/common';
import { Alert } from '@mui/material';
import { setToken } from '../store/reducers/appSlice';
import { useNavigate } from 'react-router-dom';
import { apiErrorParser } from '../utils';
import { useAppDispatch } from '../hooks/redux';


const theme = createTheme();



export default function SignIn() {

  const [signIn, {data, isLoading, error}] = api.useSignInMutation()
  const {register, handleSubmit, formState: {errors}} = useForm<IUserSignIn>()
  

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit:  SubmitHandler<IUserSignIn> = async userData => {
    const result = await signIn(userData).unwrap();
    dispatch(setToken(result.token));
    localStorage.setItem('TOKEN_AUTH_LOCALSTORAGE', result.token);
    navigate('/boards');
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
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('login', {required: true})}
              margin="normal"
              required
              fullWidth
              id="login"
              label="login"
              name="login"
              autoComplete="login"
              autoFocus
              sx={{
                minWidth: 396,
              }}
            />
            {errors.login && <Typography variant="subtitle2" sx={{color: 'red'}}>This field is required</Typography>}
            <TextField
              {...register('password', {required: true, minLength: 8,})}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {errors.password && <Typography variant="subtitle2" sx={{color: 'red'}}>Minimum password length 8 characters</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      {error && <Alert variant="filled" severity="error">{apiErrorParser(error as IRequestError)}</Alert>}
    </ThemeProvider>
  );
}