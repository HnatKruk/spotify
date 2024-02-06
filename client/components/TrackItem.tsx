import { FC } from 'react'
import { ITrack } from '../types/track'
import { Box, Card, Grid, IconButton } from '@mui/material';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import styles from '../styles/TrackItem.module.scss'
import { useRouter } from 'next/router';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter()
  const { pause, volume, duration, currentTime } = useTypedSelector((state) => state.player)
  const { playTrack, pauseTrack, setVolume, setActiveTrack, setCurrentTime, setDuration } = useActions()

  const play = (e: any) => {
    e.stopPropagation()
    setActiveTrack(track)
    playTrack()
  }

  return (
    <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
      <IconButton onClick={(e) => play(e)}>
        {active ? <Pause/> : <PlayArrow />}
      </IconButton>
      <img width={70} height={70} src={'http://localhost:4000/' + track.picture} />
      <Grid container direction='column' style={{ width: 200, margin: '0 20px' }}>
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
      </Grid>
      {active && <div>02:22 / 03:11</div>}
      <IconButton style={{ marginLeft: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <Delete/>
      </IconButton>
    </Card>
  )
}

export default TrackItem