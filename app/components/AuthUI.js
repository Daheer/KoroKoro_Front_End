"use client";

import { Paper } from '@mui/material'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../services/supabaseClient'

function AuthUI() {
  return (
    <Auth
      supabaseClient={supabase}
      providers={['google']}
      appearance={{
        theme: ThemeSupa,
        style: {
          button: {
            boxShadow: '0 0 0.05rem 0.1rem rgba(0, 0, 0, 0.4)',
            border: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            color: 'black',
            borderRadius: '2',
            borderColor: 'rgba(0,0,0,0)',
          },
        }
      }}
    />
  )
}

export default function AuthLogin() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Paper elevation={4} sx={{ padding: '3rem' }}>
        <AuthUI />
      </Paper>
    </div>
  )
}