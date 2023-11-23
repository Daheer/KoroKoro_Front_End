"use client";

import { Button, Modal, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { VideoUpload } from "../components/VideoForm";
import AuthLogin from "./AuthUI";

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [session, setSession] = useState(null);
  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription;
  }, []);

  let authenticated = false;
  if (session) {
    authenticated = true;
  }

  return (
    <div>
      <Button onClick={handleOpen} color="primary" sx={{
        color: 'black',
        border: '0.1rem solid rgba(0, 0, 0, 0.1)',
        borderRadius: '1rem',
        fontSize: '1rem',
        padding: '1rem',
        transition: 'box-shadow 0.5s',
        '&:hover': {
          boxShadow: '0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);'
        },
      }} aria-label="add">
        Upload your own
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          p: 4,
        }}>
          {authenticated ? (
            <VideoUpload />
          ) : (
            <AuthLogin />
          )}
        </Box>
      </Modal>
    </div>
  )
}