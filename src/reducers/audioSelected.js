import { SELECT_AUDIO } from '../actions/index';

export default function (state = null, action) {
  switch (action.type) {
    case SELECT_AUDIO:
      return action.payload;
  }
  return state;
}