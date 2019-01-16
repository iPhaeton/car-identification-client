import * as React from 'react';

const Preview = props => {
  const {image, alt} = props;

  return (
    <div style={{
      width: '70%',
      height: 500,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <img
        src={image}
        alt={alt}
      />
    </div>
  )
}

export default Preview;
