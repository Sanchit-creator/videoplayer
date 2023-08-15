import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
  return (
    <div>
      <h1>Error</h1>
      <p>Oops! Something went wrong.</p>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );
};

export default ErrorPage;