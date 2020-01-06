import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Switch from '@material-ui/core/Switch';
import { blue } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getUrlParamValue } from "../util/common";
import { YTAction, YoutubePlayerState } from "../util/YoutubeAction";
import axios from "axios";
import YouTube from 'react-youtube';
import YTPlayer from '../fragment/YTPlayer';

const useStyles = () => ({
  card: {
    width: 384,
    height: 216,
    spacing: 1,
  },
  media: {
    width: 384,
    height: 216,
  },
});

const BlueSwitch = withStyles({
  switchBase: {
    color: blue[300],
    '&$checked': {
      color: blue[500],
    },
    '&$checked + $track': {
      backgroundColor: blue[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

class Youtube extends React.Component {
  constructor(props) {
    super(props);
    this.players = [];
    this.state = { videos: null, autoPlay: true };
  }

  async getVideos() {
    await axios
      .get(
        /* "http://sharemoney-env.jkkfubp3xq.us-east-2.elasticbeanstalk.com/contents" */
        "/data.json"
      )
      .then(({ data }) => {
        this.setState({ videos: data.rows });
      });
  }

  componentDidMount() {
    this.getVideos();
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.mute();
    if (this.state && this.state.autoPlay === true) {
      event.target.playVideo();
    }
  }

  _onPlayerStateChange(event) {
    const ytstate = YoutubePlayerState(event.data);
    console.log(ytstate);
  }

  handleChange = name => event => {
    const isChecked = event.target.checked
    this.setState({ [name]: isChecked });
    if (!this.players || this.players.length === 0) return;
    if (isChecked === false) {
      this.players.map((frameId) => {
        YTAction(frameId).Pause();
        //player.getIframe().contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      });
    } else {
      this.players.map((frameId) => {
        YTAction(frameId).Play();
        //player.getIframe().contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
      });
    }
  };

  render() {
    const { classes } = this.props;
    //https://developers.google.com/youtube/player_parameters
    const opts = {
      height: 216,
      width: 384,
      playerVars: {
        m: 1,
        autoplay: Number(this.state.autoPlay),
        playsinline: 1
      }
    };

    return (
      <div className={classes.root}>
        <CssBaseline />
        <BottomNavigation showLabels style={{ display: "flex", justifyContent: "left", alignItems: 'flex-start' }}>
          <FormGroup>
            <FormControlLabel
              control={
                <BlueSwitch
                  checked={this.state.autoPlay}
                  onChange={this.handleChange('autoPlay')}
                  value="autoPlay"
                />
              }
              labelPlacement="start"
              label="Auto Play"
            />
          </FormGroup>
        </BottomNavigation>
        <Box
          display="flex"
          flexWrap="wrap"
          alignContent="space-around">
          {this.state.videos ? (this.state.videos.map((video) => (
            <Box m={1}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia className={classes.media} component="div">
                    {/* <YTPlayer oIframe={{ iframeId: video.id, videoId: getUrlParamValue(video.url,"v") }} /> */}
                    <YouTube
                      id={video.id}
                      videoId={getUrlParamValue(video.url, "v")}
                      opts={opts}
                      onReady={this._onReady}
                      onStateChange={this._onPlayerStateChange}
                    />)
                    {this.players.push(video.id)}
                  </CardMedia>
                </CardActionArea>
              </Card>
            </Box>
          ))) : (<></>)}
        </Box>
      </div >
    );
  }
}

export default withStyles(useStyles)(Youtube);
