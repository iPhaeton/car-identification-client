import * as React from 'react';
import '../css/ControlPanel.css';
import {PREDICTION_MODE} from "../constants";

class ControlPanel extends React.Component {
  input = null;

  render() {
    const {mode, onRecognitionRequest, onBackToSlideShowClick} = this.props;

    return (
      <div className="ControlPanel">
        <button className="ControlButton" onClick={onRecognitionRequest}>Recognize my image</button>
        {mode === PREDICTION_MODE ? <button className="ControlButton" onClick={onBackToSlideShowClick}>Back to slide show</button> : null}
      </div>
    )
  }
}

export default ControlPanel;
