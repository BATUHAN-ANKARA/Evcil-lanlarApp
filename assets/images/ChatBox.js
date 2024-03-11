import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ChatBox(props) {
  return (
    <Svg
      width={19}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10.667 2.5v1.667H2.333V15.32l1.47-1.154h11.864V8.333h1.666V15a.833.833 0 01-.833.833H4.38L.666 18.75V3.333A.833.833 0 011.5 2.5h9.167zm4.166 0V0H16.5v2.5H19v1.667h-2.5v2.5h-1.667v-2.5h-2.5V2.5h2.5z"
        fill="#52B4D7"
      />
    </Svg>
  );
}

export default ChatBox;
