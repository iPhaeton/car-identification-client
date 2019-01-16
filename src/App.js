import React, {Component} from 'react';
import './App.css';
import {BASE64_PREFIX, PREDICTION_MODE, SLIDE_SHOW_MODE} from "./constants";
import {requestGenerator} from "./requestGenerator/index";
import {getPreview, getThumbnails} from "./utils/api";
import Preview from './components/Preview';
import Info from './components/Info';
import Thumbnails from "./components/Thumbnails";
import ControlPanel from './components/ControlPanel';

class App extends Component {
  previewGenerator = null;
  state = {
    mode: SLIDE_SHOW_MODE,
    preview: {
      image_base64: null,
      probs: [],
      classes: [],
    },
    thumbnails: [],
  }

  update = (newState) => {
    this.setState({...this.state, ...newState});
  }

  handleThumbnailClick = async ({filename}) => {
    this.previewGenerator.stop();
    const preview = await getPreview(filename);
    this.update({mode: PREDICTION_MODE, preview});
  }

  handleBackToSlideShowClick = () => {
    this.previewGenerator.start();
    this.update({mode: SLIDE_SHOW_MODE})
  }

  componentDidMount = async () => {
    this.previewGenerator = requestGenerator({
      request: getPreview,
      timeout: 5000,
      onResponse: preview => this.update({preview}),
    });
    this.previewGenerator.start();

    const thumbnails = await getThumbnails(20);
    this.update({thumbnails});
  }

  componentWillUnmount() {
    this.previewGenerator.stop();
  }

  render() {
    const {mode, preview, thumbnails} = this.state;

    return (
      <div className="App">
        <div className="App-content">
          <div className="App-preview">
            <Preview
              image={`${BASE64_PREFIX}${preview.image_base64}`}
              alt={preview.classes[0]}
            />
            <Thumbnails thumbnails={thumbnails} onThumbClick={this.handleThumbnailClick}/>
          </div>
          <div className="App-info">
            <Info classes={preview.classes} probs={preview.probs}/>
            <ControlPanel mode={mode} onBackToSlideShowClick={this.handleBackToSlideShowClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
