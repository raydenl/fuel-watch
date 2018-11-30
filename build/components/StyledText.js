import React from 'react';
import { Text } from 'react-native';
export default function StyledText(props) {
    return React.createElement(Text, Object.assign({}, props, { style: [props.style, { fontFamily: 'space-mono' }] }));
}
//# sourceMappingURL=StyledText.js.map