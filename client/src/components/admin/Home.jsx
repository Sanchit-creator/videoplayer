import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { getUsers } from '../../service/api'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom';

const Contaner = styled(Box)`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 5vh;
    height: 100%
`


const MainBox = styled(Box)`
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid black;
    background-color: #fbfbfb;
    width: 80%;
    cursor: pointer;
    &:hover {
      background-color: #fff;
    }
`

const Home = () => {
  const [interviewData, setInterviewData] = useState();
  useEffect(() => {
    const random = () => getUsers().then(function(result) {
        console.log(result.data);
        setInterviewData(result.data);
    })

    random();
},[])

const navigate = useNavigate();

const handleClick = (e) => {
  navigate(`/userinfo/${e._id}`)
}
const authenticate = localStorage.getItem('token')
  return (
    <Contaner>
        {
            interviewData ? interviewData.map((data, key) => (
                <MainBox key={data._id} onClick={() => handleClick(data)}>
                  <Typography>Name: {data.name}</Typography>
                  <Typography>Email: {data.email}</Typography>
                  <Typography>Gender: {data.gender}</Typography>
                  <Typography>Nationality: {data.nationality}</Typography>
              </MainBox>
            )) : 'Loading...'
        }
    </Contaner>
  )
}

export default Home