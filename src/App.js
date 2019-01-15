import React, { Component } from 'react';
import './App.css';
import {requestGenerator} from "./requestGenerator/index";
import {getPreview} from "./utils/api";

class App extends Component {
  previewGenerator = null;
  state = {
    image_base64: null,
    probs: [],
    classes: [],
  }

  update = (newState) =>{
    this.setState({...newState});
  }

  componentDidMount() {
    this.previewGenerator = requestGenerator({
      request: getPreview,
      timeout: 5000,
      onResponse: this.update,
    });
    this.previewGenerator.start();
  }

  componentWillUnmount() {
    this.previewGenerator.stop();
  }

  render() {
    return (
      <div className="App">
        <div className="App-content">
          <img
            src={`data:image/jpeg;charset=utf-8;base64,${this.state.image_base64}`}
            alt={this.state.classes[0]}
          />
        </div>
      </div>
    );
  }
}

export default App;
