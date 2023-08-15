import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';

const NavBar = () => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo");
  const token = localStorage.getItem("token");
  const verification = localStorage.getItem("verification")
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {
            verification === '"pending"' &&
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Verification Pending
            </Typography>
          }
          {
            verification === '"not_verified"' &&
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Verification Rejected
            </Typography>
          }
          {token && <Button color="inherit"
            onClick={() => {
              localStorage.clear();
              navigate('/')
              toast.success('Logged Out!')
            }}
          >Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar