import * as React from 'react';
import {ClipLoader} from 'react-spinners';

const Preview = props => {
  const {image, alt, isLoading} = props;

  return (
    <div style={{
      width: '100%',
      height: 500,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
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
