import * as React from 'react';
import {BASE64_PREFIX} from "../constants";
import './Thumbnail.css';

const Thumbnail = props => {
  const {thumbnail, onClick} = props;

  return (
    <button className="Thumbnail" onClick={() => onClick(thumbnail)}>
      <img src={`${BASE64_PREFIX}${thumbnail.image_base64}`} alt="thumbnail" />
    </button>
  )
}

export default Thumbnail
