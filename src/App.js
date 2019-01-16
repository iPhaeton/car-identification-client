import React, {Component} from 'react';
import './App.css';
import {requestGenerator} from "./requestGenerator/index";
import {getPreview, getThumbnails} from "./utils/api";
import Preview from './components/Preview';
import Info from './components/Info';
import Thumbnails from "./components/Thumbnails";
import {BASE64_PREFIX} from "./constants";

class App extends Component {
  previewGenerator = null;
  state = {
    preview: {
      image_base64: null,
      probs: [],
      classes: [],
    },
    thumbnails: [],
  }

  updatePreview = (preview) => {
    this.setState({preview});
  }

  updateThumbnails = (thumbnails) => {
    this.setState({thumbnails});
  }

  handleThumbnailClick = async ({filename}) => {
    this.previewGenerator.stop();
    const preview = await getPreview(filename);
    this.updatePreview(preview);
  }

  componentDidMount = async () => {
    this.previewGenerator = requestGenerator({
      request: getPreview,
      timeout: 5000,
      onResponse: this.updatePreview,
    });
    this.previewGenerator.start();

    const thumbnails = await getThumbnails(20);
    this.updateThumbnails(thumbnails);
  }

  componentWillUnmount() {
    this.previewGenerator.stop();
  }

  render() {
    const {preview, thumbnails} = this.state;

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
          <Info classes={preview.classes} probs={preview.probs}/>
        </div>
      </div>
    );
  }
}

export default App;
