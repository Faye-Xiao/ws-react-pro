import _ from 'lodash'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchAudio } from 'actions/index';
import Loader from 'components/loader';
import styles from './style.less';
import axios from 'axios';

class SearchBar extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleLoader = this.handleLoader.bind(this);
  }

  searchAudio = _.debounce((term) => {
    // Cancel requests
    if (this.source) {
      this.source.cancel('Operation canceled by the user.');
    }

    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    // Do request
    this.props.searchAudio(term,
      {
        cancelToken: this.source.token
      }).then(() => {
        this.loader.setStatus(false);
        this.source = null;
      }).catch((reason) => {
        //TODO 
        this.loader.setStatus(false);
        alert(`API error: ${reason.message}`);
        this.source = null;
      })
  }, 300);

  handleChange(event) {
    this.loader.setStatus(true);
    console.log('event.target.value ' + event.target.value)
    this.searchAudio(event.target.value);
  }

  handleLoader(loader) {
    this.loader = loader;
  }

  render() {
    return (
      <div className={styles.root}>
        <Loader
          ref={this.handleLoader}
          style={{ top: '6px', left: '6px' }}
        />
        <input
          defaultValue="The Greatest Showman "
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchAudio: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchAudio }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
