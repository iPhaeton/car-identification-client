import * as React from 'react';
import modal from '../enhancers/modal/enhancer';
import {StandardButtons} from '../enhancers/modal/components';
import '../css/Modal.css';
import '../css/Button.css';
import '../css/About.css';
import {KNOWN_CLASSES} from "../constants";

class About extends React.Component {
  state = {
    classes: {
      collapsed: true,
    },
  }

  toggleClasses = () => {
    this.setState(() => ({classes: {collapsed: !this.state.classes.collapsed}}));
  }

  render() {
    const {onClose} = this.props;

    return (
      <div style={{backgroundColor: '#fff', width: 700}}>
        <div style={{padding: '30px 30px 0 30px'}}>
          <p style={{textAlign: 'justify'}}>
            In this demo we recognize a car make and model by a photo of the car. We trained a neural network on
            <button className="Button" style={{color: '#66aadd'}} onClick={this.toggleClasses}>
              48 classes
            </button>
            .
            The images in the slide show and the images in the carousel below are from our test set.
            You can also upload your own image and see how our network will cope with it.
          </p>
        </div>
        <div className={`animated-height KnownClasses ${this.state.classes.collapsed ? 'Hidden' : ''}`}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p style={{color: '#6ad', textDecoration: 'underline'}}>Known models</p>
            <button className="Button" onClick={this.toggleClasses}>close</button>
          </div>
          {KNOWN_CLASSES.map((cl, i) => <p key={i}>{i+1}. {cl}</p>)}
        </div>
        <StandardButtons
          className="StandardButtons"
          titles={['OK']}
          handlers={[onClose]}
        />
      </div>
    );
  }
}

export default modal()(About);
