import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { loadDynamicScript } from "../util/common";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  iframe: {
    height: 216,
    width: 384,
    border: 0
  }
});

class YTPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Play: false,
      Pause: false,
      Stop: false,
      next: false,
      prev: false
    }
  }

  componentDidMount = () => {
    // On mount, check to see if the API script is already loaded
    if (!window.YT) { // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = this.initYoutubePlayer;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      // If script is already there, load the video directly
      this.initYoutubePlayer();
    }
  };

  initYoutubePlayer = () => {
    this.player = new window.YT.Player(this.props.oIframe.iframeId, {
      height: this.props.classes.iframe.height,
      width: this.props.classes.iframe.width, 
      videoId: this.props.oIframe.videoId,
      playerVars: {
        'autoplay': 1,
        'm': 1,
        'playsinline': 1,
      },
      events: {
        'onReady': this.onPlayerReady,
        'onStateChange': this.onPlayerStateChange
      }
    });
  }
  
  onPlayerStateChange = () => {
    console.log("onPlayerStateChange");
  }

  onPlayerReady = () => {
    console.log("onPlayerReady");
    /* this.player.mute();
    this.player.playVideo(); */
  }

  render() {
    const { classes, oIframe } = this.props;

    return (
      <React.Fragment>
        <div style={{height: "inherit", width: "inherit"}} id={oIframe.iframeId}/>
      </React.Fragment>
    )
  }
}

YTPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
  oIframe: PropTypes.object.isRequired,
};

export default withStyles(styles)(YTPlayer);