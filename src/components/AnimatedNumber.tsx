import React from 'react';
import { Animated, Easing, type TextStyle } from 'react-native';
import { Text } from './typography/Text';

type Props = {
  value: number;
  durationMs?: number;
  style?: TextStyle;
  format?: (n: number) => string;
};

export function AnimatedNumber({ value, durationMs = 300, style, format }: Props) {
  const animated = React.useRef(new Animated.Value(value)).current;
  const [display, setDisplay] = React.useState(value);

  React.useEffect(() => {
    const id = animated.addListener(({ value: v }) => setDisplay(Math.round(v)));
    return () => animated.removeListener(id);
  }, [animated]);

  React.useEffect(() => {
    Animated.timing(animated, {
      toValue: value,
      duration: durationMs,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [animated, durationMs, value]);

  return (
    <Text variant="stats" style={style}>
      {format ? format(display) : String(display)}
    </Text>
  );
}

