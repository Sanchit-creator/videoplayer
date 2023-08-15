import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = (props) => {
    const {Component} = props
    const navigate = useNavigate();
    useEffect(() => {
        let login = localStorage.getItem('token');
        if (!login) {
            navigate('/')
        }
    })
    let token = localStorage.getItem('token');
    if (!token) {
      return (
          <h1>Loading...</h1>
      )
    }
  return (
    <div>
        <Component />
    </div>
  )
}

export default Protected