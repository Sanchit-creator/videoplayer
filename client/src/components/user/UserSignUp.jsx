import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Checkbox, FormControlLabel, FormLabel, Grid, Input, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signUpUser } from '../../service/api';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const signupInitialValues = {
    name: '',
    phone: '',
    email: '',
    address: '',
    gender: '',
    nationality:'',
    adhaarnumber:'',
    adhaarphotoone:'',
    adhaarphototwo:'',
    idnumber:'',
    document:'',
    userid:'',
    password: '',
    is_verified: 'pending',
    videos: ''
}



export default function UserSignUp() {
    const [signup, setSignup] = useState(signupInitialValues);

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value});
        if (e.target.name === 'adhaarnumber') {
          setSignup({ ...signup, adhaarnumber: e.target.value});
        }
        if (e.target.name === 'idnumber') {
          setSignup({ ...signup, idnumber: e.target.value});
        }
        if (e.target.name === 'adhaarphotoone') {
          setSignup({ ...signup, adhaarphotoone: e.target.files[0]});
        }
        if (e.target.name === 'adhaarphototwo') {
          setSignup({ ...signup, adhaarphototwo: e.target.files[0]});
        }
        if (e.target.name === 'document') {
          setSignup({ ...signup, document: e.target.files[0]});
        }
        console.log(signup);
    }

  const navigate = useNavigate();

  const signupUser = async () => {
    const data = new FormData();
    data.append('name', signup.name)
    data.append('phone', signup.phone)
    data.append('email', signup.email)
    data.append('address', signup.address)
    data.append('gender', signup.gender)
    data.append('nationality', signup.nationality)
    data.append('adhaarnumber', signup.adhaarnumber)
    data.append('adhaarphotoone', signup.adhaarphotoone)
    data.append('adhaarphototwo', signup.adhaarphototwo)
    data.append('idnumber', signup.idnumber)
    data.append('document', signup.document)
    data.append('userid', signup.userid)
    data.append('password', signup.password)
    data.append('is_verified', signup.is_verified)
    data.append('status', signup.status)
    data.append('videos', signup.videos)
    try {
      let res = await signUpUser(data);
      if (res) {
        navigate('/')
      }
      toast.error('User Already Exist')
    } catch (error) {
      console.log(error);
    }
  }
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        name: data.get('name'),
        phone: data.get('phone'),
        email: data.get('email'),
        address: data.get('address'),
        gender: data.get('gender'),
        nationality:data.get('nationality'),
        adhaarnumber:data.get('adhaarnumber'),
        adhaarphotoone:data.get('adhaarphotoone'),
        adhaarphototwo:data.get('adhaarphototwo'),
        idnumber:data.get('idnumber'),
        document:data.get('document'),
        userid:data.get('userid'),
        password: data.get('password'),
    });
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
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                onChange={(e) => onInputChange(e)}
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                onChange={(e) => onInputChange(e)}
                id="phone"
                label="Mobile No."
                name="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={(e) => onInputChange(e)}
                id="email"
                label="Email Address"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={(e) => onInputChange(e)}
                id="address"
                label="Address"
                name="address"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    fullWidth
                    value={signup.gender}
                    onChange={(e) => onInputChange(e)}
                    name='gender'
                >
                    <MenuItem value={'M'}>M</MenuItem>
                    <MenuItem value={'F'}>F</MenuItem>
                    <MenuItem value={'Others'}>Others</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="nationality"
                defaultValue='indian'
                value={signup.nationality}
                onChange={(e) => onInputChange(e)}
            >
                <FormLabel>Your Nationality: </FormLabel>
                <FormControlLabel value="indian" label="Indian" control={<Radio />}/>
                <FormControlLabel value="others" label="Others" control={<Radio />}/>
            </RadioGroup>
            </Grid>
            {
                signup.nationality === 'others'
                && <>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        onChange={(e) => onInputChange(e)}
                        name="idnumber"
                        label="ID Number"
                        type="text"
                        id="adhaarnumber"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <Typography>License/Passport</Typography>
                        <Input 
                            type='file' 
                            fullWidth
                            name='document' 
                            onChange={(e) => onInputChange(e)} 
                        />
                    </Grid>
                </> 
            }
            {
                signup.nationality === 'indian' && <>
                 <Grid item xs={12}>
                 <TextField
                     required
                     fullWidth
                     onChange={(e) => onInputChange(e)}
                     name="adhaarnumber"
                     label="Adhaar Number"
                     type="text"
                     id="adhaarnumber"
                 />
                 </Grid>
                 <Grid item xs={12} sm={6}>
                     <Typography>Front Side of Adhaar</Typography>
                     <Input 
                         type='file'
                         fullWidth
                         name='adhaarphotoone' 
                         onChange={(e) => onInputChange(e)}
                     />
                 </Grid>
                 <Grid item xs={12} sm={6}>
                     <Typography>Back Side of Adhaar</Typography>
                     <Input 
                         type='file'
                         fullWidth
                         name='adhaarphototwo' 
                         onChange={(e) => onInputChange(e)}
                     />
                 </Grid>
             </> 
            }
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={(e) => onInputChange(e)}
                name="userid"
                label="User ID"
                type="text"
                id="userid"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={(e) => onInputChange(e)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => signupUser()}
          >
            Sign Up
          </Button>
          <ToastContainer />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/admin" variant="body2">
                Already have an account? Sign in
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