import { ITrack } from '../../types/track'
import { Box, Button, Card, Grid, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'
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
    if (timer) {
      clearTimeout(timer)
    }
    setTimeout(async () => {
      await dispatch(searchTracks(query))
    }, 500)
  }

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
              <Button onClick={() => router.push('/tracks/create')}>Download</Button>
            </Grid>
          </Box>
          <TextField
            fullWidth
            value={query}
            onChange={search}
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


// export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
//   const dispatch = store.dispatch as NextThunkDispatch
//   await dispatch(await fetchTracks())
// })