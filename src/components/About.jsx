import * as React from 'react';
import modal from '../enhancers/modal/enhancer';
import {StandardButtons} from '../enhancers/modal/components';
import '../css/Modal.css';
import '../css/Button.css';

const About = props => {
  const {onClose} = props;

  return (
    <div style={{backgroundColor: '#fff', width: 700}}>
      <div style={{padding: '30px 30px 0 30px'}}>
        <p style={{textAlign: 'justify'}}>
          In this demo we recognize a car make and model by a photo of the car. We trained a neural network on
          <button className="Button" style={{color: '#66aadd'}}>
            48 classes
          </button>
          .
          The images in the slide show and the images in the carousel below are from our test set.
          You can also upload your own image and see how our network will cope with it.
        </p>
      </div>
      <StandardButtons
        className="StandardButtons"
        titles={['OK']}
        handlers={[onClose]}
      />
    </div>
  )
}

export default modal()(About);