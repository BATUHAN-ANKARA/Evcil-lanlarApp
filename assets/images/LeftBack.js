import * as React from 'react';
import Svg, {G, Path, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function LeftBack(props) {
  return (
    <Svg
      width={32}
      height={28}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G
        filter="url(#prefix__filter0_d_130_245)"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#fff">
        <Path d="M4.333 14c0-.644.523-1.167 1.167-1.167h21a1.167 1.167 0 110 2.334h-21A1.167 1.167 0 014.333 14z" />
        <Path d="M9.825 9.675a1.167 1.167 0 010 1.65L7.15 14l2.675 2.675a1.167 1.167 0 11-1.65 1.65l-3.5-3.5a1.167 1.167 0 010-1.65l3.5-3.5a1.167 1.167 0 011.65 0z" />
      </G>
      <Defs />
    </Svg>
  );
}

export default LeftBack;
