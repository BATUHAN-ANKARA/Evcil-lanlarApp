import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

function Dots(props) {
  return (
    <Svg
      width={4}
      height={21}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect y={0.233} width={4} height={4} rx={2} fill="#fff" />
      <Rect y={8.233} width={4} height={4} rx={2} fill="#fff" />
      <Rect y={16.233} width={4} height={4} rx={2} fill="#fff" />
    </Svg>
  );
}

export default Dots;
