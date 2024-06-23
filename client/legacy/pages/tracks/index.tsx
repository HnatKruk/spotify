import { ITrack } from '../../types/track'
import { Box, Button, Card, Grid, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import TrackList from '@/components/TrackList'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useActions } from '@/hooks/useActions'
import { NextThunkDispatch, wrapper } from '@/store'
import { fetchTracks, searchTracks } from '@/store/actions-creators/track'
import { useDispatch } from 'react-redux'

const Tracks = () => {
  const router = useRouter()
  const { tracks, error } = useTypedSelector(state => state.track)
  const [query, setQuery] = useState<string>('')
  const dispatch = useDispatch() as NextThunkDispatch
  const [timer, setTimer] = useState(null)

  const search = async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    dispatch(searchTracks(query))
  }, [query, dispatch]);

  if (error) {
    return <MainLayout>
      <h1>{error}</h1>
    </MainLayout>
  }

  return (
    <MainLayout title={'Track list'}>
      <Grid container justifyContent='center'>
        <Card style={{ width: '100%' }}>
          <Box p={2}>
            <Grid container justifyContent='space-between'>
              <h1>Tracks list</h1>
            </Grid>
          </Box>
          <TextField
            style={{ padding: '0 30px', boxSizing: 'border-box' }}
            fullWidth
            value={query}
            onChange={(e) => search(e)}
            placeholder='Search'
          />
          <TrackList tracks={tracks}/>
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default Tracks

// Define the getInitialProps function
Tracks.getInitialProps = wrapper.getInitialPageProps(store => async () => {
  try {
    await store.dispatch(fetchTracks());
  } catch (error) {
    console.error('Error fetching tracks:', error);
  }
});
