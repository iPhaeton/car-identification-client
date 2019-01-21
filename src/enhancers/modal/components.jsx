import * as React from 'react';
import '../../css/Modal.css';
import {map} from '../../utils/common';

export const Modal = props => {
  const {children} = props;

  return (
    <div className="Modal">
      {children}
    </div>
  )
}

export const StandardButtons = props => {
  const {titles, handlers, className} = props;

  return (
    <div className={className}>
      <div>
        {map((title, handler, index) => (
          <button
            onClick={() => handler(title, index)}
            key={index}
          >
            {title}
          </button>
        ), titles, handlers)}
      </div>
    </div>
  );
}
