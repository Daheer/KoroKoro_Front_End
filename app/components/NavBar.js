import React from 'react'
import { AppBar } from '@mui/material'
import AuthModal from "./Modal"
import Box from '@mui/material/Box';

export default function NavBar() {
  return (
    <AppBar position="sticky" className="ml-4" component="nav" style={{
      padding: '1.5rem',
      borderRadius: '1rem',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      border: '0.1rem solid rgba(0, 0, 0, 0.1)',
      color: 'black',
      width: 'auto',
      fontWeight: 'bold',
      marginTop: '2rem',
      fontSize: '2.5rem',
    }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Box display="flex" alignItems="center">
          <span>KoroKoro</span>
        </Box>
        <img src="/view.gif" alt="Logo" height={50} style={{ marginRight: '1rem' }} />
        <AuthModal />
      </Box>

    </AppBar>
  )
}