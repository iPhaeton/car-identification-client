import React, { Component } from 'react';
import './App.css';
import {requestGenerator} from "./requestGenerator/index";
import {getPreview} from "./utils/api";
import Preview from './components/Preview';
import Info from './components/Info';

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
    console.log(this.state)
    return (
      <div className="App">
        <div className="App-content">
          <Preview
            image={`data:image/jpeg;charset=utf-8;base64,${this.state.image_base64}`}
            alt={this.state.classes[0]}
          />
          <Info classes={this.state.classes} probs={this.state.probs} />
        </div>
      </div>
    );
  }
}

export default App;
