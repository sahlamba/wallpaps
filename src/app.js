import React from 'react';
import { APP_WIDTH, APP_HEIGHT } from '../config';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.RAND_MAX = 500;
    this.state = {
      randomSig: 0,
    };
    this.refreshImage = this.refreshImage.bind(this);
  }

  componentWillMount() {
    this.refreshImage();
  }

  refreshImage() {
    this.setState({
      randomSig: Math.floor(Math.random() * Math.floor(this.RAND_MAX)),
    });
  }

  render() {
    return (
      <div className="appContainer">
        <button className="refreshImage" onClick={this.refreshImage}>
          Refresh
        </button>
        <img
          src={`https://source.unsplash.com/random/${APP_WIDTH}x${APP_HEIGHT}?sig=${
            this.state.randomSig
          }`}
        />
      </div>
    );
  }
}

export default App;
