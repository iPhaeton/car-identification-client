import * as React from 'react';
import '../../css/Modal.css';
import {map} from '../../utils/common';
import '../../css/Button.css'

export const Modal = props => {
  const {open, children} = props;

  return (
    <div className={`Modal ${open ? '' : 'Modal-Hidden'}`}>
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
            className="Button"
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
