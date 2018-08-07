import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';
//var ReactDOM = require('react-dom');
//var {Route, Router, IndexRoute, hashHistory} = require('react-router');
const API_KEY = 'AIzaSyBGGhwubs1sWGqfIzIwlVZ6Cang_WMy1zA';

// Load foundation
//$(document).foundation();

// App css
//require('style!css!sass!applicationStyles')

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
     };

     this.videoSearch('Gigi Fly Now');
   }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos : videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
  //document.querySelector('.app')
);
