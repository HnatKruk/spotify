export interface IComment {
  _id: string;
  username: string;
  text: string;
}

export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  comments: IComment[]
} 

export interface TrackState {
  tracks: ITrack[];
  error: string;
}
export enum TrackActionTypes {
  FETCH_TRACKS = 'FETCH_TRACKS',
  FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
  DELETE_TRACK = 'DELETE_TRACK',
  DELETE_TRACK_ERROR = 'DELETE_TRACK_ERROR'
}

interface FetchTracksActions {
  type: TrackActionTypes.FETCH_TRACKS;
  payload: ITrack[];
}

interface FetchTracksErrorActions {
  type: TrackActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
}

interface DeleteTrackActions {
  type: TrackActionTypes.DELETE_TRACK;
}

interface DeleteTrackErrorActions {
  type: TrackActionTypes.DELETE_TRACK_ERROR;
  payload: string;
}

export type TrackAction =
  FetchTracksActions |
  FetchTracksErrorActions |
  DeleteTrackActions |
  DeleteTrackErrorActions