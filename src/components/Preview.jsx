import * as React from 'react';
import {ClipLoader} from 'react-spinners';
import '../css/Preview.css';

const Preview = props => {
  const {image, alt, isLoading} = props;

  return (
    <div className="Preview">
      {isLoading ?
        <ClipLoader
          color="#00ffff"
          size={50}
        /> :
        <img
          style={{maxHeight: 500, maxWidth: '100%'}}
          src={image}
          alt={alt}
        />
      }
    </div>
  )
}

export default Preview;
