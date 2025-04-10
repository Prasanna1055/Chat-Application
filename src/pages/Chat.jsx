import { Header } from '../components/Header.jsx'
import { Status } from '../components/Status.jsx'
import { ChatRoom } from '../components/ChatRoom.jsx'
import { useSocket } from '../contexts/SocketIOContext.jsx'
import { Box } from '@mui/material' // Import Box for layout

export function Chat() {
  const { status } = useSocket()
  return (
    <Box sx={{ padding: 3 }}>
      {' '}
      {/* Using Box and sx for styling */}
      <Header />
      <Box sx={{ my: 2 }}>
        {' '}
        {/* Using Box for vertical spacing */}
        <hr />
      </Box>
      <Status />
      <Box sx={{ my: 2 }}>
        <hr />
      </Box>
      {status === 'connected' && <ChatRoom />}
    </Box>
  )
}
