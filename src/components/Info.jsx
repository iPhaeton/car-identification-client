import * as React from 'react';
import {map} from "../utils/common";

const Info = props => {
  const {classes, probs} = props;

  return (
    <div style={{
      width: '30%',
      height: 500,
      backgroundColor: 'green',
    }}>
      {map((c, p) => <div>{c} {p}</div>, classes, probs)}
    </div>
  )
}

export default Info;
