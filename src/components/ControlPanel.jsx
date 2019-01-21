import * as React from 'react';
import '../css/ControlPanel.css';
import '../css/Button.css';
import {PREDICTION_MODE} from "../constants";

class ControlPanel extends React.Component {
  input = null;

  render() {
    const {mode, onAboutClick, onRecognitionRequest, onBackToSlideShowClick} = this.props;

    return (
      <div className="ControlPanel">
        <button className="Button AboutButton" onClick={onAboutClick}>About this demo</button>
        <div className="MainButtons">
          <button className="Button ControlButton" onClick={onRecognitionRequest}>Recognize my image</button>
          {mode === PREDICTION_MODE ?
            <button className="Button ControlButton" onClick={onBackToSlideShowClick}>Back to slide
              show</button>
            : null
          }
        </div>
      </div>
    )
  }
}

export default ControlPanel;
