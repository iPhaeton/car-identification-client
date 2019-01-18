import * as React from 'react';
import Thumbnail from './Thumbnail';
import {withHorizontalScroll} from "../enhancers/withHorizontalScroll";

class Thumbnails extends React.Component {
  render() {
    const {thumbnails, onThumbClick, onWheel} = this.props;

    return (
      <div style={{width: '100%', height: 150, overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap'}} onWheel={onWheel}>
        {thumbnails.map((th, i) => <Thumbnail thumbnail={th} key={i} onClick={onThumbClick} />)}
      </div>
    );
  }
}

export default withHorizontalScroll()(Thumbnails);
