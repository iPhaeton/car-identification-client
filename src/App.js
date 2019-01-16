import React, { Component } from 'react';
import './App.css';
import {requestGenerator} from "./requestGenerator/index";
import {getPreview} from "./utils/api";
import Preview from './components/Preview';
import Info from './components/Info';

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

  updatePreview = (preview) =>{
    this.setState({preview});
  }

  componentDidMount() {
    this.previewGenerator = requestGenerator({
      request: getPreview,
      timeout: 5000,
      onResponse: this.updatePreview,
    });
    this.previewGenerator.start();
  }

  componentWillUnmount() {
    this.previewGenerator.stop();
  }

  render() {
    const {preview} = this.state;
    console.log(this.state)
    return (
      <div className="App">
        <div className="App-content">
          <Preview
            image={`data:image/jpeg;charset=utf-8;base64,${preview.image_base64}`}
            alt={preview.classes[0]}
          />
          <Info classes={preview.classes} probs={preview.probs} />
        </div>
      </div>
    );
  }
}

export default App;
