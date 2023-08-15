import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getV, getVideos } from '../service/api';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

const Main = styled(Box)`
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 5vh;
  height: 100%
`

const Video = styled('video')({
    height: '500px',
    width: '1000px',
})

const MainContainer = styled(Box)`
    width: 100vw;
    height: 80vh;
    display: flex;
    justify-content: center;
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
    width: 80%;
    margin: 10px;
`

const Others = styled(Box)`
    width: 40vw;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding-top: 5vh;
    height: 100%
`

const Thumbnail = styled(Box)`
  height: 80px;
  width: 150px;
`

const TextBox = styled(Box)`
    display: flex;
    justify-content: start;
`



const VideoPlayer = () => {
    const [response, setResponse] = useState()
    const { params } = useParams();
    const [interviewData, setInterviewData] = useState();
    useEffect(() => {
        const random = () => getV(params).then(function(result) {
            console.log(result.data);
            setInterviewData(result.data);
        })

        random();
    },[params])

    useEffect(() => {
        const data = () => getVideos().then(function(result) {
            console.log(result.data);
            setResponse(result.data);
        })
  
        data();
    },[])
    
    const navigate = useNavigate();
    const handleClick = (e) => {
        navigate(`/videoplayer/${e._id}`)
        console.log(e._id);
      }

    if (typeof interviewData === 'undefined') {
        return (
            <h1>Loading...</h1>
        )
    }
  return (
    <MainContainer>
        <Main>
        <Video controls>
            <source src={`https://video-player-backend.onrender.com/${interviewData.path}`} type="video/mp4" />
            Your browser does not support the video tag.
        </Video>
        <TextBox>
            <h2>{interviewData.subtitle}</h2>
        </TextBox>
        </Main>
    <Others>
    {
        response ? response.map((data, key) => (
          <MainBox key={data._id}>
              <InputBox onClick={() => handleClick(data)}>
                  <Thumbnail component='img' src={`https://video-player-backend.onrender.com/${data.thumbnail}`} />
                  <Typography>Subtitle: {data.subtitle}</Typography>
              </InputBox>
        </MainBox>
        )) : 'Loading...'
      }
    </Others>
    </MainContainer>
  )
}

export default VideoPlayer