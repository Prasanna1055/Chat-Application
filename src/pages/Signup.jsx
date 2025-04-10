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
import Alert from '@mui/material/Alert'

import { signup } from '../api/users.js'

export function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate('/login'),
    onError: () => alert('Failed to sign up!'), // Consider a better error display
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    signupMutation.mutate()
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
          Sign Up
        </Typography>
        {signupMutation.isError && (
          <Alert severity='error' sx={{ width: '100%', mt: 2 }}>
            Failed to sign up! Please try again.
          </Alert>
        )}
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='signup-username'
            label='Username'
            name='signup-username'
            autoComplete='username'
            autoFocusvalue={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={signupMutation.isPending}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='signup-password'
            label='Password'
            type='password'
            id='signup-password'
            autoComplete='new-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={signupMutation.isPending}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            disabled={!username || !password || signupMutation.isPending}
          >
            {signupMutation.isPending ? (
              <CircularProgress size={24} />
            ) : (
              'Sign Up'
            )}
          </Button>
          <Link component={RouterLink} to='/' variant='body2'>
            {'Back to main page'}
          </Link>
          <Box sx={{ mt: 1 }}>
            <Link component={RouterLink} to='/login' variant='body2'>
              {'Already have an account? Log In'}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
