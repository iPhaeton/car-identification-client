import * as React from 'react';

const ClassInfo = props => {
  const {name, prob} = props;
  const percents = prob * 100;

  return (
    <div
      style={{
        display: 'flex',
        height: 50,
      }}
    >
      <div style={{width: '60%', position: 'relative', display: 'flex', alignItems: 'center'}}>
        <div style={{height: '80%', width: `${percents}%`, backgroundColor: 'green'}}/>
        <div style={{position: 'absolute', top: 0, left: 10, width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}>{name}</div>
      </div>
      <div style={{width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{percents.toFixed(3)}%</div>
    </div>
  )
}

export default ClassInfo;
