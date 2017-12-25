import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import selectedAudioSelector from 'selectors/selected_audio';
import EmbedResponsive from 'components/embedResponsive';
import styles from './style.less';

const AudioDetail = ({ audio }) => {
  if (!audio) {
    return (
      <div className="col-md-8">
        {'Not found.'}
      </div>
    )
  }

  
  const url = audio.image[2];

  return (
    <div>
      <EmbedResponsive url={url} />
     
      <div className={styles.details}>
        <div className="mdc-typography--title">
          {audio.title}
        </div>
        <div>
          {audio.description}
        </div>
        <div >
          <label className={styles.remark}>
            {`Listen on Apple Music: `}
          </label>
          <a
              className={styles.link}
              href={audio.link}
          >
            {audio.link}
          </a>
        </div>
      </div>
    </div>
  )
};

AudioDetail.propTypes = {
  audio: PropTypes.object
};

AudioDetail.defaultProps = {
  audio: null
};

const mapStateToProps = state => {
  return {
    audio: selectedAudioSelector(state)
  };
};

export default connect(mapStateToProps, null)(AudioDetail);
