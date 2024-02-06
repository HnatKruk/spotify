import { TrackAction, TrackActionTypes, TrackState } from "@/types/track"
import { error } from "console"

const initialState: TrackState = {
  tracks: [],
  error: '',
}

export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
  switch (action.type) {
    case TrackActionTypes.FETCH_TRACKS:
      return { ...state, error: '', tracks: action.payload }
    case TrackActionTypes.FETCH_TRACKS_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}