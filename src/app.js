import React from 'react';

import os from 'os';
import fs from 'fs';
import path from 'path';
import wallpaper from 'wallpaper';

import { arrayBufferToBase64, getRandomSig } from './utils';
import { getRandomPhotoPromise, downloadImagePromise } from './utils/bridge';

import { APP_WIDTH, APP_HEIGHT } from '../config';
import { APP_ID } from '../config/keys';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageJSON: {
        urls: {
          small: '',
        },
      },
    };
    this.refreshImage = this.refreshImage.bind(this);
    this.setAsBackground = this.setAsBackground.bind(this);
  }

  componentWillMount() {
    this.refreshImage();
  }

  refreshImage() {
    getRandomPhotoPromise().then(imageJSON => {
      this.setState({
        imageJSON,
      });
    });
  }

  setAsBackground() {
    downloadImagePromise(this.state.imageJSON.urls.full).then(res => {
      res.arrayBuffer().then(resArrBuf => {
        const image64 = arrayBufferToBase64(resArrBuf);
        const randomSig = getRandomSig();
        let picturePath = path.join(
          os.homedir(),
          '/Pictures',
          `wallpaps_${randomSig}.jpg`
        );
        picturePath = path.normalize(picturePath);
        fs.writeFile(picturePath, image64, 'base64', err => {
          wallpaper.set(picturePath, { scale: 'fill' }).then(() => {
            console.log('Set background: ' + path.resolve(picturePath));
          });
        });
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
          src={`${this.state.imageJSON.urls.small}&client_id=${APP_ID}`}
          onClick={this.setAsBackground}
        />
      </div>
    );
  }
}

export default App;
