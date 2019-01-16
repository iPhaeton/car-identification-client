import * as React from 'react';
import {map} from "../utils/common";
import ClassInfo from './ClassInfo';

const Info = props => {
  const {classes, probs} = props;

  return (
    <div style={{
      width: '30%',
      height: 500,

    }}>
      {map((c, p) => <ClassInfo name={c} prob={p}/>, classes, probs)}
    </div>
  )
}

export default Info;
