// Reselect selector 
import _ from 'lodash';
import { createSelector } from 'reselect';

// Create select functions to pick off the pieces of state we care about
const audiosSelector = state => state.audios;
const selectedAudioSelector = state => state.selected_audio_id;

const getAudio = (audio, selected_audio_id) => {
  // console.log(' selected_audio_id ' + selected_audio_id);
  const selectedAudio = _.filter(
    audio,
    { 'audioId': selected_audio_id }
  );
  return selectedAudio[0];
};


export default createSelector(
  audiosSelector,
  selectedAudioSelector,
  getAudio
);
