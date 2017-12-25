import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchAudio } from 'actions';
import componentWithApi from './componentWithApi';
import SearchBar from 'components/searchBar';
import AudioList from 'components/audioList';
import AudioDetail from 'components/audioDetail';

class Home extends Component {

  constructor(props) {
    super(props);
    this.scrollHandler = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }
  _handleScroll(scrollTop) {
    console.log(scrollTop)
  }

  handleScroll(event) {
    let scrollTop = event.srcElement.body.scrollTop;
    this._handleScroll(scrollTop);
  }
  render() {
    return (
      <div>
        <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
            <SearchBar />
          </div>
        </div>
        <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__inner">
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-8 mdc-layout-grid__cell--span-8-tablet">
              <AudioDetail />
            </div>
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4 mdc-layout-grid__cell--span-8-tablet">
              <AudioList />
            </div>
          </div>
        </div>
      </div>
    );
  }


};



let requests, callbacks = [];

requests = [
  searchAudio('The Greatest Showman')
];


const options = {
  requests,
  callbacks
};

export default connect()(componentWithApi(Home, options));
