import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

interface RadialYellowGradientProps {
  style?: ViewStyle;
  borderRadius?: number;
}

const AskTheRoobertRadialYellowGradientProps: React.FC<RadialYellowGradientProps> = ({
  style,
  borderRadius = 0,
}) => (
  <View style={[styles.container, style, { borderRadius, overflow: 'hidden' }]}>
    <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <Defs>
        <RadialGradient
          id="radialGrad"
          cx="50%"
          cy="50%"
          r="60%"
          fx="50%"
          fy="50%"
        >
          <Stop offset="0%" stopColor="#FEDD3C" stopOpacity="1" />
          <Stop offset="60%" stopColor="#FFC423" stopOpacity="1" />
          <Stop offset="100%" stopColor="#FFB514" stopOpacity="1" />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="100" height="100" fill="url(#radialGrad)" />
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
});

export default AskTheRoobertRadialYellowGradientProps;