import MainLayout from '@/layouts/MainLayout'
import { ITrack } from '../../types/track'
import React, { useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { useInput } from '@/hooks/useInput'

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack)
  const router = useRouter()
  const username = useInput('')
  const text = useInput('')

  const addComment = async () => {
    try {
      const response = await axios.post('http://localhost:4000/tracks/comment', {
        username: username.value,
        text: text.value,
        trackId: track._id
      })
      setTrack({ ...track, comments: [...track.comments, response.data] })
    } catch (error) {
      console.log(error)
    }
    
  }
    
  return (
    <MainLayout title={track.name}>
      <Button
        onClick={() => router.push('/tracks')}
        variant='outlined'
        style={{ fontSize: 32 }}
      >
        Go Back
      </Button>
      <Grid container style={{ margin: '20px 0' }}>
        <img src={'http://localhost:4000/' + track.picture} width={200} height={200}/>
        <div style={{ marginLeft: 30 }}>
          <h1>Name - {track.name}</h1>
          <h1>Artist - {track.artist}</h1>
          <h1>Listens - {track.listens}</h1>
        </div>
      </Grid>
      <h1>Text</h1>
      <p>{track.text}</p>
      <h1>Comments</h1>
      <Grid container>
        <TextField
          label='Your name'
          fullWidth
          {...username}
        />
        <TextField
          label='Your comment'
          fullWidth
          multiline
          rows={4}
          {...text}
        />
        <Button onClick={addComment}>Send</Button>
      </Grid>
      <div>
        {track.comments.map((comment) => (
          <div>
            <div>Author - {comment.username}</div>
            <div>{comment.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}

export default TrackPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get('http://localhost:4000/tracks/' + params?.id)
  return {
    props: {
      serverTrack: response.data
    }
  }
}