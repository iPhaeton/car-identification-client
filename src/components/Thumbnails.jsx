import * as React from 'react';
import Thumbnail from './Thumbnail';
import {withHorizontalScroll} from "../enhancers/withHorizontalScroll";
import '../css/Thumbnails.css';

class Thumbnails extends React.Component {
  render() {
    const {thumbnails, onThumbClick, onWheel} = this.props;

    return (
      <div className="Thumbnails" onWheel={onWheel}>
        {thumbnails.map((th, i) => <Thumbnail thumbnail={th} key={i} onClick={onThumbClick} />)}
      </div>
    );
  }
}

export default withHorizontalScroll()(Thumbnails);
