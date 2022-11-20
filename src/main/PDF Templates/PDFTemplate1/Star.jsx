import {Svg, Polygon} from '@react-pdf/renderer';
import { Fragment } from 'react';
const Star = (props) => {
  return (
    <Fragment>
      <Svg height="10" width="10">
        <Polygon points="5,0.5 2,9.9 9.5,3.9 0.5,3.9 8,9.9" fill={`${props.color}`} />
      </Svg>
    </Fragment>
  )
};

export default Star;
