import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './style.less';
import classNames from 'classnames';

class AudioListItem extends Component {
  constructor() {
    super();
    this.handleAudioSelect = this.handleAudioSelect.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.audio.audioId === this.props.selected_audio_id) ||
      (this.props.audio.audioId === nextProps.selected_audio_id);

  }

  handleAudioSelect() {
    this.props.onAudioSelect(this.props.audio)
  }

  render() {
    const imageUrl = this.props.audio.image[1];
    const isActive = this.props.selected_audio_id === this.props.audio.audioId ? styles.isActive : null;
    const liClasses = classNames(styles.root, isActive);

    return (
      <li
        className={liClasses}
        onClick={this.handleAudioSelect}
      >
        <div className={styles.root__left}>
          <img src={imageUrl} />
        </div>
        <div className={styles.root__right}>
          {this.props.audio.title}
        </div>
      </li>
    );
  }
}

AudioListItem.propTypes = {
  onAudioSelect: PropTypes.func.isRequired,
  selected_audio_id: PropTypes.string,
  audio: PropTypes.object.isRequired
};

AudioListItem.defaultProps = {
  selected_audio_id: null
};

function mapStateToProps(state) {
  return {
    selected_audio_id: state.selected_audio_id
  };
}


export default connect(mapStateToProps)(AudioListItem);
