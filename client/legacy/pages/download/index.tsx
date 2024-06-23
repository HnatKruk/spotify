import FileUpload from '@/components/FileUpload'
import StepWrapper from '@/components/StepWrapper'
import { useInput } from '@/hooks/useInput'
import MainLayout from '@/layouts/MainLayout'
import { Grid, Button, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Download = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [picture, setPicture] = useState(null)
  const [audio, setAudio] = useState(null)
  const name = useInput('')
  const artist = useInput('')
  const text = useInput('')
  const router = useRouter()

  console.log(picture)
  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1)
    } else {
      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('text', text.value)
      formData.append('artist', artist.value)
      formData.append('picture', picture)
      formData.append('audio', audio)
      axios.post('http://localhost:4000/tracks', formData)
        .then((resp) => router.push('/tracks'))
        .catch((error) => console.log(error))
    }
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction='column' style={{ padding: 20 }}>
            <TextField
              {...name}
              style={{ marginTop: 10 }}
              label={'Track name'}
            />
            <TextField
              {...artist}
              style={{ marginTop: 10 }}
              label={'Artist name'}
            />
            <TextField
              {...text}
              style={{ marginTop: 10 }}
              label={'Track text'}
              multiline
              rows={3}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <>
            <Button component="label" variant="contained" startIcon={<CloudUpload />} style={{
              display: 'flex',
              width: 'fit-content',
              margin: '0 auto',
            }}>
              Upload picture
              <VisuallyHiddenInput type="file" accept={'image/*'} onChange={(e) => setPicture(e.target.files[0])}/>
            </Button>
            <p>{picture?.name || ''}</p>
          </>
        )}
        {activeStep === 2 && (
           <>
            <Button component="label" variant="contained" startIcon={<CloudUpload />} style={{
              display: 'flex',
              width: 'fit-content',
              margin: '0 auto',
            }}>
              Upload audio
              <VisuallyHiddenInput type="file" accept={'audio/*'} onChange={(e) => setAudio(e.target.files[0])}/>
            </Button>
            <p>{audio?.name || ''}</p>
          </>
        )}
      </StepWrapper>
      <Grid container justifyContent='space-between'>
        <Button disabled={activeStep == 0} onClick={() => back()}>Back</Button>
        <Button onClick={() => next()}>Next</Button>
      </Grid>
    </MainLayout>
  )
}

export default Download