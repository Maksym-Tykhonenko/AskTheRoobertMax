import React, {
  useEffect as useRoobertEffect,
  useLayoutEffect as useRoobertLayout,
  useRef as useRoobertRef,
} from 'react';
import {
  Animated as RoobertAnim,
  View as RoobertView,
  Easing as RoobertEase,
  Dimensions as RoobertDims,
  Image,
} from 'react-native';
import { useNavigation as useRoobertNav } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';

const STORAGE_FLAG = 'ask_the_roobert_onboard';

const AskTheRoobertLoading: React.FC = () => {
  const { width, height } = RoobertDims.get('window');
  const navigation = useRoobertNav();

  // посилання на анімаційні значення
  const scaleAnim = useRoobertRef(new RoobertAnim.Value(0)).current;
  const fadeAnim = useRoobertRef(new RoobertAnim.Value(0)).current;

  // запуск анімацій
  useRoobertEffect(() => {
    RoobertAnim.spring(scaleAnim, {
      toValue: 1,
      tension: 65,
      friction: 6,
      useNativeDriver: true,
    }).start();

    RoobertAnim.timing(fadeAnim, {
      toValue: 1,
      duration: 1900,
      easing: RoobertEase.inOut(RoobertEase.ease),
      useNativeDriver: true,
    }).start();
  }, [scaleAnim, fadeAnim]);

  // перевірка, чи був пройдений онбординг
  useRoobertLayout(() => {
    (async () => {
      let needsOnboarding = false;

      try {
        const alreadySeen = await AsyncStorage.getItem(STORAGE_FLAG);
        if (!alreadySeen) {
          needsOnboarding = true;
          await AsyncStorage.setItem(STORAGE_FLAG, 'done');
        }
      } catch (e) {
        if (__DEV__) console.warn('AskTheRoobertLoading onboarding error:', e);
      }

      setTimeout(() => {
        navigation.replace(needsOnboarding ? 'AskTheRoobertOnboarding' : 'AskTheRoobertToOtherPgs');
      }, 8000);
    })();
  }, [navigation]);

  return (
    <RoobertView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('../theAskAssetsRoobert/theAskImagesRoobert/roobertRadialGradient.png')}
        style={{ position: 'absolute', top: 0, left: 0, width, height }}
      />

      <RoobertView pointerEvents="none">
        <Video
          source={require('../theAskAssetsRoobert/theAskVideosRoobert/kangarooHand.mp4')}
          style={{ width, height: width }}
          resizeMode="contain"
          controls={false}
          muted={false}
          repeat={false}
          volume={1.0}
        />
      </RoobertView>
    </RoobertView>
  );
};

export default AskTheRoobertLoading;
