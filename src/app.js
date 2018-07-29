import React from 'react';

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
          src={`https://source.unsplash.com/random/${800}x${600}?sig=${
            this.state.randomSig
          }`}
        />
      </div>
    );
  }
}

export default App;
