import { TrackAction, TrackActionTypes } from "@/types/track"
import axios from "axios"
import { Dispatch } from "react"

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get('http://localhost:4000/tracks')
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data })
    } catch (error) {
      dispatch({ type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: `Error fetch tracks: ${error}` })
    }
  }
}

export const searchTracks = (query: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get(`http://localhost:4000/tracks/search?query=${query}`)
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data })
    } catch (error) {
      dispatch({ type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: `Error fetch tracks: ${error}` })
    }
  }
}

export const deleteTrack = (id: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.delete(`http://localhost:4000/tracks/${id}`)
      console.log(response)
      dispatch({ type: TrackActionTypes.DELETE_TRACK })
    } catch (error) {
      dispatch({ type: TrackActionTypes.DELETE_TRACK_ERROR, payload: `Error fetch tracks: ${error}` })
    }
  }
}