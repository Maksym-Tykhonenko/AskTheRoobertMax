import React from 'react';
import { View as AskRoobertView, Dimensions, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface AskTheRoobertUniqueViewProps {
  style?: ViewStyle;
  borderRadius?: number;
  children?: React.ReactNode;
}

const askDims = Dimensions.get('window');

const AskTheRoobertUniqueView: React.FC<AskTheRoobertUniqueViewProps> = ({
  children
}) => (
  <AskRoobertView
    style={{
      shadowOpacity: 1,
      alignSelf: 'center',
      borderTopLeftRadius: askDims.width * 0.08,
      flex: 1,
      marginTop: askDims.height * 0.057,
      borderRadius: askDims.width * 0.05,
      elevation: 5,
      borderTopRightRadius: askDims.width * 0.08,
      shadowOffset: { width: 0, height: -askDims.width * 0.004 },
      paddingTop: askDims.height * 0.035,
      shadowRadius: 0,
      borderColor: '#4940AE',
      alignItems: 'center',
      borderWidth: askDims.width * 0.0023,
      shadowColor: '#8E83FF',
      width: askDims.width,
    }}
  >
    <LinearGradient
      colors={['#2F278B', '#1B1655']}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        top: 0,
        position: 'absolute',
        borderTopLeftRadius: askDims.width * 0.08,
        left: 0,
        right: 0,
        borderTopRightRadius: askDims.width * 0.08,
        bottom: 0,
      }}
    />
    {children}
  </AskRoobertView>
);

export default AskTheRoobertUniqueView;