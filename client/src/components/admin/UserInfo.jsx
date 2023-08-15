import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUser, getU, updateUser } from '../../service/api';
import styled from '@emotion/styled';
import { Box, Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import { toast } from 'react-toastify';


const Content = styled(Box)`
    display: flex;
    height: 80vh;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 50vw;
`

const Main = styled(Box)`
    display: flex;
    justify-content: center;
    width: 100vw;
`

const Img = styled(Box)`
    height: 150px;
    width: 250px;
    margin: 10px
`



const UserInfo = () => {
    const { params } = useParams();
    const [interviewData, setInterviewData] = useState();
    const [signup, setSignup] = useState({});
    const navigate = useNavigate();

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value});
    }
    useEffect(() => {
        const random = () => getU(params).then(function(result) {
            console.log(result.data);
            setInterviewData(result.data);
        })

        random();
    },[])

    const signupUser = async () => {
        try {
          let res = await updateUser({data: signup, params: params});
          if (res) {
            setInterviewData(res.data)
            toast.success('Posted!')
          }else{
            toast.error('Error While Posting!')
          }
        } catch (error) {
          console.log(error);
        }
      }

      const deleteU = async () => {
        try {
          let res = await deleteUser(params);
          if (res) {
            navigate('/dashboard')
          }
        } catch (error) {
          console.log(error);
        }
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };
    
      

    if (typeof interviewData === 'undefined') {
        return (
            <h1>Loading...</h1>
        )
    }

  return (
    <Main component="form" noValidate onSubmit={handleSubmit}>
        <Content>
        <TextField
          required
          id="outlined-disabled"
          label="Name"
          onChange={(e) => onInputChange(e)}
          defaultValue={interviewData.name}
          name='name'
        />
        <TextField
          required
          id="outlined-disabled"
          label="Mobile No."
          onChange={(e) => onInputChange(e)}
          defaultValue={interviewData.phone}
          name='phone'
        />
        <TextField
          required
          id="outlined-disabled"
          label="Email"
          onChange={(e) => onInputChange(e)}
          defaultValue={interviewData.email}
          name='email'
        />
        <TextField
          required
          id="outlined-disabled"
          label="Address"
          onChange={(e) => onInputChange(e)}
          defaultValue={interviewData.address}
          name='address'
        />
        <Grid item xs={12}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                fullWidth
                value={signup.gender}
                onChange={(e) => onInputChange(e)}
                name='gender'
                defaultValue={interviewData.gender}
            >
                <MenuItem value={'M'}>M</MenuItem>
                <MenuItem value={'F'}>F</MenuItem>
                <MenuItem value={'Others'}>Others</MenuItem>
            </Select>
        </Grid>
        <TextField
          required
          onChange={(e) => onInputChange(e)}
          id="outlined-disabled"
          label="User Id"
          name='userid'
          defaultValue={interviewData.userid}
        />
    </Content>
    <Content>
        {
        interviewData.adhaarnumber !== '' ? 
            <>
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="Adhaar Number"
                    defaultValue={interviewData.adhaarnumber}
                />
                <Grid item xs={12} sm={6}>
                    <Img 
                        component="img"
                        required
                        id="outlined-disabled"
                        label="Adhaar Photo One"
                        src={`https://video-player-backend.onrender.com/${interviewData.adhaarphotoone}`}
                    />
                    <Img
                        component="img"
                        required
                        id="outlined-disabled"
                        label="Adhaar Photo Two"
                        src={`https://video-player-backend.onrender.com/${interviewData.adhaarphototwo}`}
                    />
                </Grid>
            </>
            : 
            <>
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="Adhaar Number"
                    defaultValue={interviewData.idnumber}
                />
                <Img
                    component="img"
                    id="outlined-disabled"
                    label="Adhaar Photo One"
                    src={`https://video-player-backend.onrender.com/${interviewData.document}`}
                />
            </>
        }
        <Grid item xs={12} sm={6}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Verification"
                    fullWidth
                    value={signup.is_verified}
                    onChange={(e) => onInputChange(e)}
                    name='is_verified'
                    defaultValue={interviewData.is_verified}
                >
                    <MenuItem value={'verified'}>Verified</MenuItem>
                    <MenuItem value={'not_verified'}>Not Verified</MenuItem>
                    <MenuItem value={'pending'}>Pending</MenuItem>
                </Select>
            </Grid>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => signupUser()}
                    >
                        Save
                </Button> 
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => deleteU()}
                    >
                        Delete
                </Button> 
            </Grid>  
        </Grid> 
    </Content>
    </Main>
  )
}

export default UserInfo