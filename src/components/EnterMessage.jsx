import { useState } from 'react'
import PropTypes from 'prop-types'

// MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send' // Optional: Icon for button

export function EnterMessage({ onSend }) {
  const [message, setMessage] = useState('')

  function handleSend(e) {
    e.preventDefault()
    if (message.trim()) {
      // Avoid sending empty messages
      onSend(message)
      setMessage('')
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSend}
      sx={{
        display: 'flex',
        gap: 1, // Add some space between input and button
        padding: 2, // Add padding around the form
        borderTop: '1px solid lightgray', // Separator line
        marginTop: 2, // Space above the input area
      }}
    >
      <TextField
        fullWidth
        variant='outlined' // Or "filled", "standard"
        size='small' // Make it a bit more compact
        placeholder='Type your message...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoComplete='off' // Disable browser autocomplete
      />
      <Button
        variant='contained'
        type='submit'
        endIcon={<SendIcon />} // Add send icon
        disabled={!message.trim()} // Disable if message is empty/whitespace
      >
        Send
      </Button>
    </Box>
  )
}

EnterMessage.propTypes = {
  onSend: PropTypes.func.isRequired,
}
