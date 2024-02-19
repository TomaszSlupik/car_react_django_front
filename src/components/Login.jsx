import React from 'react'
import TextField from '@mui/material/TextField';
import { useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

export default function Login() {

const [showPassword, setShowPassword] = useState(false);

const handleClickShowPassword = () => setShowPassword((show) => !show);

const handleMouseDownPassword = (event) => {
    event.preventDefault();
}

let navigate = useNavigate()

const handleLogin = () => {
    const userInUsers = true; 
    if (userInUsers) {
        navigate('/home');
    } else {
      console.log('Brak użytkownika');
    }
  }

  return (
    <div>
        <h2>Logowanie</h2>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button 
        onClick={handleLogin}
        variant="outlined">
            Zaloguj
        </Button>
    </div>
  
  )
}
