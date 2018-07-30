import React from 'react';
import { APP_WIDTH, APP_HEIGHT } from '../config';

import os from 'os';
import fs from 'fs';
import path from 'path';
import wallpaper from 'wallpaper';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.RAND_MAX = 500;
    this.state = {
      randomSig: 0,
    };
    this.refreshImage = this.refreshImage.bind(this);
    this.convertToBase64 = this.convertToBase64.bind(this);
    this.setAsBackground = this.setAsBackground.bind(this);
  }

  componentWillMount() {
    this.refreshImage();
  }

  refreshImage() {
    this.setState({
      randomSig: Math.floor(Math.random() * Math.floor(this.RAND_MAX)),
    });
  }

  convertToBase64(imgSrc) {
    const img = new Image();
    img.onload = () => {
      let canvas = document.createElement('canvas');
      canvas.width = APP_WIDTH;
      canvas.height = APP_HEIGHT;
      let context = canvas.getContext('2d');
      context.drawImage(img, 0, 0);
      let dataURL = canvas.toDataURL('image/jpg');
      return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
    };
    img.crossOrigin = 'anonymous';
    img.src = imgSrc;
  }

  setAsBackground(event) {
    let base64Image = this.convertToBase64(event.target.src);
    let picturePath = path.join(os.homedir(), '/Pictures', 'wallpaps.jpg');
    picturePath = path.normalize(picturePath);
    fs.writeFile(picturePath, base64Image, 'base64', err => {
      wallpaper.set(picturePath, { scale: 'stretch' }).then(() => {
        console.log('Set background: ' + path.resolve(picturePath));
      });
    });
  }

  render() {
    return (
      <div className="appContainer">
        <button className="refreshImage" onClick={this.refreshImage}>
          Refresh
        </button>
        <p className="refreshImage setAsBackground">
          Click on the image to set as background.
        </p>
        <img
          src={`https://source.unsplash.com/random/${APP_WIDTH}x${APP_HEIGHT}?sig=${
            this.state.randomSig
          }`}
          onClick={this.setAsBackground}
        />
      </div>
    );
  }
}

export default App;
