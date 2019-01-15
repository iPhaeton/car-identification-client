import React, { Component } from 'react';
import './App.css';
import {getPreview} from "./utils/api";

class App extends Component {
  timer = null;
  state = {
    image_base64: null,
    probs: [],
    classes: [],
  }

  getPreview = async () =>{
    const body = await getPreview();
    this.setState({...body});
  }

  componentDidMount() {
    this.getPreview();
    this.timer = setInterval(this.getPreview, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
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
