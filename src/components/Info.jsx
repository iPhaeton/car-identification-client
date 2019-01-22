import * as React from 'react';
import {map} from "../utils/common";
import ClassInfo from './ClassInfo';
import '../css/Info.css';

const Info = props => {
  const {classes, probs} = props;

  return (
    <div className="Info">
      {map((c, p, i) => <ClassInfo name={c} prob={p} key={i}/>, classes, probs)}
    </div>
  )
}

export default Info;
