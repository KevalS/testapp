import * as React from 'react';
import './style.css';

class SimpleComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {url: ''};

      let videoUrl = localStorage.getItem('videoId')
      videoUrl = JSON.parse(videoUrl)
      let videoTitle = localStorage.getItem('title')
      videoTitle = JSON.parse(videoTitle)
      console.log('video------------',videoUrl)
      this.state = {url: videoUrl,title: videoTitle};
  }

  render() {
    return (
        <div className="video">
        <iframe src={this.state.url}
        title='video'
        width="900"
        height="550"
        />
        <h2>{this.state.title}</h2>

        </div>
    );
  }
}

export default SimpleComponent;