import * as React from 'react';
import {Modal} from './components';

export default function modal() {
  return (WrappedComponent) => {
    return props => {
      const {open, buttonsProps, ...wrappedComponentProps} = props;

      return (
        <Modal open={open}>
          <div>
            <WrappedComponent {...wrappedComponentProps} />
          </div>
        </Modal>
      );
    }
  }
}