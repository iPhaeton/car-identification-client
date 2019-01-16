import * as React from 'react';
import Thumbnail from './Thumbnail';

const Thumbnails = props => {
  const {thumbnails, onThumbClick} = props;

  return (
    <div style={{width: '100%', height: 150, overflow: 'hidden'}}>
      {thumbnails.map((th, i) => <Thumbnail thumbnail={th} key={i} onClick={onThumbClick} />)}
    </div>
  );
}

export default Thumbnails;
