import { Fragment } from "react";
import {Svg, Rect} from '@react-pdf/renderer';

const Square = () => {
  return (
    <Fragment>
      <Svg with="12" height="12">
        <Rect
          width="6"
          height="6"
          fill="black"
          transform="rotate(45)"
          x={3}
          y={-3}
        />
      </Svg>
    </Fragment>
  )
};

export default Square;
