/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import * as yup from 'yup';
import * as React from 'react';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  Avatar,
  Checkbox,
  Container,
  Typography,
  CssBaseline,
  FormControlLabel,
} from '@mui/material';

import { useUserEditMutation } from 'src/api/dynamic-api-req';
import { ConfirmAlert } from 'src/components/confirm-alert';
import { RHFPhone, RHFTextField, RHFuploadImage } from 'src/components/hook-form';

import { users } from '../../_mock/user';

const schema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .required('First Name is required')
      .min(2, 'Invalid First Name')
      .max(20, 'Invalid First Name'),
    lastName: yup
      .string()
      .required('Last Name is required')
      .min(2, 'Invalid Last Name')
      .max(20, 'Invalid Last Name'),
    tel: yup.string().required('Phone number is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    address: yup.string().required('Please provide your address'),
    username: yup
      .string()
      .required('User Name is required')
      .min(5, 'Invalid User Name')
      .max(30, 'Invalid User Name'),
    password: yup
      .string()
      .required('Password is required')
      .min(7, 'Invalid Password')
      .max(30, 'Invalid Password'),
  })
  .required();

export default function SignUp() {
  const { id } = useParams();
  const user = users.filter((i) => i.id === id)[0] || null;
  const navigate = useNavigate();
  const checkUser = users.find((i) => i.id === id);
  const [agree, setAgree] = useState({ open: false, agree: false });
  const [userEdit, result] = useUserEditMutation();
  React.useEffect(() => {
    if (!checkUser) {
      navigate('/404');
    }
  }, [checkUser, navigate]);
  const methods = useForm({
    defaultValues: {
      file: '',
      firstName: '',
      lastName: '',
      tel: '',
      email: '',
      address: '',
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    reset,
    watch,
  } = methods;

  const onSubmit = () => {
    setAgree({ open: true, agree: agree.agree });
  };

  const onAgree = async () => {
    await userEdit({ id, body: getValues() })
      .unwrap()
      .then((data) => {
        console.log(data);
      });
    reset();
    setAgree({ open: false, agree: false });
    navigate('/user');
  };

  const isFile = watch('file') ? true : false;
  React.useEffect(() => {
    reset({
      file: '',
      firstName: user?.firstName,
      lastName: user?.lastName,
      tel: user?.tel,
      email: user?.email,
      address: user?.address,
      username: user?.username,
      password: user?.password,
    });
  }, [user]);

  if (checkUser) {
    return (
      <Container component="main" maxWidth="xs">
        <ConfirmAlert
          agree={agree}
          setAgree={setAgree}
          title="Are you agree to following conditions ?"
          body="If you press agree all those data will be send to the server and new user will be joined to our website if you agree then press agree if you dont want then press disagree which one would be!"
          onAgree={onAgree}
        />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {isFile ? (
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={getValues().file} />
          ) : (
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={user?.avatarUrl} />
          )}

          <Typography component="h1" variant="h5">
            Edit User
          </Typography>
          <FormProvider {...methods}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <RHFuploadImage
                    name="file"
                    multiple={{ multiple: false }}
                    showFiles={{ showFiles: false }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField
                    name="firstName"
                    fullWidth
                    type="text"
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField
                    fullWidth
                    id="lastName"
                    type="text"
                    label="Last Name"
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFPhone />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    fullWidth
                    id="address"
                    label="Your Address"
                    name="address"
                    autoComplete="address"
                    multiline
                    minRows={3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I have read the following conditions and I agreed to the rules."
                  />
                </Grid>
              </Grid>
              <LoadingButton
                type="submit"
                fullWidth
                disabled={isSubmitting}
                loading={result.isLoading}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                Sign Up
              </LoadingButton>
            </Box>
          </FormProvider>
        </Box>
      </Container>
    );
  }
}
