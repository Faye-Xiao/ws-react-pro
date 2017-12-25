import api from 'services/api';


import _ from 'lodash'

export const SEARCH_AUDIO = 'SEARCH_AUDIO';
export const SELECT_AUDIO = 'SELECT_AUDIO';

const formatAudioItems = (resData) => {
  var dataArr = resData.feed.entry || [];
  return _.map(dataArr, function (obj) {
    // console.log('obj '+obj.id.attributes['im:id']+' name'+obj['im:name']+' '+obj['im:price'].label
    // +' '+ obj['im:image'][0].label+' '+obj.link.attributes.href+' '+obj.rights.label);
    let newAudio = {
      audioId: obj.id.attributes['im:id'],
      title: obj['im:name'].label,
      price: obj['im:price'].label,
      image: [
        obj['im:image'][0].label,
        obj['im:image'][1].label,
        obj['im:image'][2].label
      ],
      link: obj.link.attributes.href,
      description: obj.rights.label
    }
    return newAudio;
  });

}


export const searchAudio = (term, config) => async (dispatch) => {
  try {
    console.log('term ' + JSON.stringify(term))
    let { data } = await api.Audios.search(term, 100, config);
    // await dispatch(testExample());
    let audioItems = formatAudioItems(data);
    // console.log('audioItems '+JSON.stringify(audioItems));

    if (!_.isEmpty(term)) {
      const searchedAudio = _.filter(
        audioItems,
        function (n) {
          if (n.title.indexOf(_.trim(term)) >= 0) {
            return n;
          }
          return null;
        }
      );
      audioItems = searchedAudio;
    }
    dispatch(
      {
        type: SEARCH_AUDIO,
        payload: audioItems
      }
    );
    // console.log('audioItems[0] '+JSON.stringify(audioItems[0]))
    if (audioItems[0]) {
      dispatch(selectAudio(audioItems[0].audioId));
    }
  } catch (error) {
    throw new Error(error);
  }
};



export function selectAudio(id) {
  return {
    type: SELECT_AUDIO,
    payload: id
  };
}
