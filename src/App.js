import React, {Component} from 'react';
import './App.css';
import {PREDICTION_MODE, SLIDE_SHOW_MODE} from "./constants";
import {requestGenerator} from "./requestGenerator/index";
import {getPreview, getThumbnails} from "./utils/api";
import Preview from './components/Preview';
import Info from './components/Info';
import Thumbnails from "./components/Thumbnails";
import ControlPanel from './components/ControlPanel';
import {recognizer} from "./recognizer/index";
import {getImageString} from "./utils/common";
import About from './components/About';

class App extends Component {
  previewGenerator = null;
  input = null;

  state = {
    mode: SLIDE_SHOW_MODE,
    preview: {
      image_base64: null,
      probs: [],
      classes: [],
    },
    thumbnails: [],
    isLoading: true,
    modal: {
      open: false,
    },
  }

  update = (newState) => {
    this.setState(() => ({...this.state, ...newState}));
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

  handleRecognitionRequest = async () => {
    this.previewGenerator.stop();
    this.update({mode: PREDICTION_MODE});
    const file = await this.recognizer.request()
    this.update({isLoading: true})
    const preview = await this.recognizer.recognize(file);
    if (preview) {
      this.update({preview});
    }
    this.update({isLoading: false})
  };

  toggleAboutModal = () => {
    this.update({modal: {open: !this.state.modal.open}});
  }

  componentDidMount = async () => {
    this.previewGenerator = requestGenerator({
      request: getPreview,
      timeout: 5000,
      onResponse: preview => this.update({preview, isLoading: false}),
    });
    this.previewGenerator.start();

    this.recognizer = recognizer();

    const thumbnails = await getThumbnails(20);
    this.update({thumbnails});
  }

  componentWillUnmount() {
    this.previewGenerator.stop();
  }

  render() {
    const {mode, preview, thumbnails, isLoading} = this.state;

    return (
      <div className="App">
        <div className="App-content">
          <div className="App-preview">
            <Preview
              image={getImageString(preview.image_base64)}
              alt={preview.classes[0]}
              isLoading={isLoading}
            />
            <Thumbnails thumbnails={thumbnails} onThumbClick={this.handleThumbnailClick}/>
          </div>
          <div className="App-info">
            <Info classes={preview.classes} probs={preview.probs}/>
            <ControlPanel
              mode={mode}
              onAboutClick={this.toggleAboutModal}
              onRecognitionRequest={this.handleRecognitionRequest}
              onBackToSlideShowClick={this.handleBackToSlideShowClick}
            />
          </div>
        </div>
        <About open={this.state.modal.open} onClose={this.toggleAboutModal}/>
      </div>
    );
  }
}

export default App;
