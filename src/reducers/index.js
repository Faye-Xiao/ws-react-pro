import { combineReducers } from 'redux';
import audiosReducer from './audios';
import audioSelectedReducer from './audioSelected';

const rootReducer = combineReducers({
  audios: audiosReducer,
  selected_audio_id: audioSelectedReducer
});

export default rootReducer;
