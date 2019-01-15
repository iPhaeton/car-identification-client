import React, { Component } from 'react';
import './App.css';
import {PreviewGenerator} from "./PreviewGenerator/index";

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
    this.previewGenerator = new PreviewGenerator(5000, this.update);
    this.previewGenerator.start();
  }

  componentWillUnmount() {
    this.previewGenerator.stop();
  }

  render() {
    return (
      <div className="App">
        <div className="App-content">
          <img src={`data:image/jpeg;charset=utf-8;base64,${this.state.image_base64}`}/>
        </div>
      </div>
    );
  }
}

export default App;
