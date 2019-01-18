import * as React from 'react';
import {findDOMNode} from 'react-dom';

const defaultOptions = {sensitivity: 1};

export function withHorizontalScroll(options) {
  const {sensitivity} = {...defaultOptions, options};

  return (WrappedComponent) => {
    class WithHorizontalScroll extends React.Component {
      handleScroll = e => this.domRef.scrollLeft += e.deltaY * sensitivity;

      render() {
        return (
          <WrappedComponent
            ref={ref => this.domRef = findDOMNode(ref)}
            onWheel={this.handleScroll}
            {...this.props}
          />
        )
      }
    }

    return WithHorizontalScroll;
  }
}
