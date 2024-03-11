import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Calendar(props) {
  return (
    <Svg
      width={17}
      height={17}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 3.421a1 1 0 00-1 1v9a1 1 0 001 1h10a1 1 0 001-1v-9a1 1 0 00-1-1h-10zm-2 1a2 2 0 012-2h10a2 2 0 012 2v9a2 2 0 01-2 2h-10a2 2 0 01-2-2v-9z"
        fill="#999"
      />
      <Path
        d="M9.75 8.421a.75.75 0 100-1.5.75.75 0 000 1.5zM12.25 8.421a.75.75 0 100-1.5.75.75 0 000 1.5zM9.75 10.921a.75.75 0 100-1.5.75.75 0 000 1.5zM12.25 10.921a.75.75 0 100-1.5.75.75 0 000 1.5zM4.75 10.921a.75.75 0 100-1.5.75.75 0 000 1.5zM7.25 10.921a.75.75 0 100-1.5.75.75 0 000 1.5zM4.75 13.421a.75.75 0 100-1.5.75.75 0 000 1.5zM7.25 13.421a.75.75 0 100-1.5.75.75 0 000 1.5zM9.75 13.421a.75.75 0 100-1.5.75.75 0 000 1.5z"
        fill="#999"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 1.421a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zm8 0a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zM2 4.921h13v1H2v-1z"
        fill="#999"
      />
    </Svg>
  );
}

export default Calendar;
