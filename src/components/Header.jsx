import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export function Header() {
  return (
    <AppBar position='static'>
      {' '}
      {/* AppBar provides a consistent header */}
      <Toolbar>
        {' '}
        {/* Toolbar is a container for header content */}
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {/* This is where you can put the title of your application */}
          My Awesome Chat App
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {' '}
          {/* Box for grouping buttons with spacing */}
          {/* Button for navigating to the login page */}
          <Button color='inherit' component={RouterLink} to='/login'>
            Log In
          </Button>
          {/* Button for navigating to the signup page */}
          <Button color='inherit' component={RouterLink} to='/signup'>
            Sign Up
          </Button>
          {/* You can add more buttons here if needed */}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
