import React from 'react';
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

import supabase from '../supabaseClient';

import { Link } from 'react-router-dom';


function Copyright(props) {
    return (
      <Typography variant="body2" color="#0B5B53" align="center" {...props}>
        {'Copyright © Podify '}     
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignUp = () => {

    const [formData, setFormData] = React.useState({
        email:'',
        password:'',
        
      })

      const handleChange = (event) => {
        event.preventDefault();
        setFormData((prevFormData) => {
          return{
            ...prevFormData,
            [event.target.name]:event.target.value
          }})
      }

      const handleSubmit = async (event) =>{
        event.preventDefault()
        try {
          // eslint-disable-next-line no-unused-vars
          const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password
          })
          if(error) throw error
          alert("check you email for verification link")
        } catch (error) {
          alert(error)
        }
      }

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: '#0B5B53' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}

                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#0B5B53' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp