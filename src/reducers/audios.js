import { SEARCH_AUDIO } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_AUDIO:
      return action.payload;
  }
  return state;
}
