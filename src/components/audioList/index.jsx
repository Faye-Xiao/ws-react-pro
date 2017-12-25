import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AudioListItem from 'components/audioListItem';
import { selectAudio } from 'actions';
import styles from './style.less';

class AudioList extends Component {
  constructor(props) {
    super(props);
    this.handleAudioSelect = this.handleAudioSelect.bind(this);
  }

  handleAudioSelect(audio) {
    this.props.selectAudio(audio.audioId);
  }

  render() {
    const audioItems = this.props.audios.map((audio) => {
      // console.log('audio '+JSON.stringify(audio));
      return (
        <AudioListItem
          audio={audio}
          key={audio.audioId}
          onAudioSelect={this.handleAudioSelect}
        />
      );
    });

    return (
      <ul className={styles.root}>
        {audioItems}
      </ul>
    );
  }
}

AudioList.propTypes = {
  selectAudio: PropTypes.func.isRequired,
  audios: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  return {
    audios: state.audios
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectAudio }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(AudioList);
