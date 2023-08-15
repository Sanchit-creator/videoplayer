import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import { Button, Input, TextField, Typography } from '@mui/material';
import { getVideos, postVideo } from '../../service/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Main = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 5vh;
  height: 100%
`
const Upload = styled(Box)`
  width: 80%;
  height: 100px;
  background-color: #fbfbfb;
  margin: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid black;
  &:hover {
    background-color: #fff;
  }
`

const InputBox = styled(Box)`
    width: 100%;
    height: 100px;
    background-color: #fbfbfb;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #fff;
    }
`

const MainBox = styled(Box)`
    height: 100px;
    display: flex;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 10px;
`

const signupInitialValues = {
  path: '',
  subtitle: '',
  thumbnail: ''
}


const Thumbnail = styled(Box)`
  height: 80px;
  width: 150px;
`


const UserHome = () => {
  const [signup, setSignup] = useState(signupInitialValues);
  const [response, setResponse] = useState()

  useEffect(() => {
      const random = () => getVideos().then(function(result) {
          console.log(result.data);
          setResponse(result.data);
      })

      random();
  },[])
  
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value});
    if (e.target.name === 'path') {
      setSignup({ ...signup, path: e.target.files[0]});
    }
    if (e.target.name === 'thumbnail') {
      setSignup({ ...signup, thumbnail: e.target.files[0]});
    }
  }

  const id = localStorage.getItem('id')

  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`/videoplayer/${e._id}`)
  }

  const signupUser = async () => {
    const data = new FormData();
    data.append('path', signup.path)
    data.append('thumbnail', signup.thumbnail)
    data.append('subtitle', signup.subtitle)
    data.append('id', JSON.parse(id))
    try {
      let res = await postVideo(data);
      setResponse(res.data)
      console.log(res.data);
      setSignup(signupInitialValues)
      toast.success('Posted!')
    } catch (error) {
      console.log(error);
      toast.error('Not Posted!')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        path: data.get('path'),
    });
  };

  const verification = localStorage.getItem('verification')
  return (
    <>
      {
        verification === '"verified"' &&
        <Main>
          <Upload component='form' noValidate onSubmit={handleSubmit}>
          <Typography>Video: </Typography>
            <Input component='input' name='path' onChange={(e) => onInputChange(e)} type='file' />
            <Typography>Thumbnail: </Typography>
            <Input component='input' name='thumbnail' onChange={(e) => onInputChange(e)} type='file' /> 
            <Typography>Subtitle: </Typography>
            <TextField name='subtitle' onChange={(e) => onInputChange(e)} type='text' /> 
            <Button onClick={() => signupUser()}>Upload</Button>
            <ToastContainer />
          </Upload>
          {
            response ? response.map((data, key) => (
              <MainBox key={data._id}>
                  <InputBox onClick={() => handleClick(data)}>
                      <Thumbnail component='img' src={`http://localhost:3000/${data.thumbnail}`} />
                      <Typography>Subtitle: {data.subtitle}</Typography>
                  </InputBox>
            </MainBox>
            )) : 'Loading...'
          }
        </Main>
      }
    </>
  )
}

export default UserHome