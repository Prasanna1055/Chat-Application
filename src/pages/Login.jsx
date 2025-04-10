import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

// MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert' // For showing errors

import { login } from '../api/users.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [, setToken] = useAuth()

  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setToken(data.token)
      navigate('/')
    },
    onError: (error) => {
      console.error('Login Mutation Error:', error) // Added for debugging
      // You might want to update state to show a more specific error message
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Log In
        </Typography>
        {loginMutation.isError && (
          <Alert severity='error' sx={{ width: '100%', mt: 2 }}>
            Failed to log in! Please check your credentials.
          </Alert>
        )}
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='login-username'
            label='Username'
            name='login-username'
            autoComplete='username'
            autoFocusvalue={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loginMutation.isPending}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='login-password'
            label='Password'
            type='password'
            id='login-password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loginMutation.isPending}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            disabled={!username || !password || loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <CircularProgress size={24} />
            ) : (
              'Log In'
            )}
          </Button>
          <Link component={RouterLink} to='/' variant='body2'>
            {'Back to main page'}
          </Link>
          <Box sx={{ mt: 1 }}>
            {' '}
            {/* Added spacing */}
            <Link component={RouterLink} to='/signup' variant='body2'>
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
