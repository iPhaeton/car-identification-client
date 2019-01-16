import * as React from 'react';
import './ControlPanel.css';
import {PREDICTION_MODE} from "../constants";

const ControlPanel = props => {
  const {mode} = props;

  return (
    <div className="ControlPanel">
      <button className="ControlButton">Recognize my image</button>
      {mode === PREDICTION_MODE ? <button className="ControlButton">Back to slide show</button> : null}
    </div>
  )
}

export default ControlPanel;
