import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SocketIOContextProvider } from './contexts/SocketIOContext.jsx'
import { Chat } from './pages/Chat.jsx'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'

// MUI Imports
import { Container, CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const queryClient = new QueryClient()

// Create a default Material UI theme (you can customize this further)
const theme = createTheme()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Chat />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SocketIOContextProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth='lg'>
              <RouterProvider router={router} />
            </Container>
          </ThemeProvider>
        </SocketIOContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
