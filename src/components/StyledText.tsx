import React, { ReactNode } from 'react';
import { Text, RegisteredStyle, TextStyle } from 'react-native';

interface StyledTextProps {
  style: RegisteredStyle<TextStyle>
  children: ReactNode
}

export default function StyledText(props: StyledTextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
