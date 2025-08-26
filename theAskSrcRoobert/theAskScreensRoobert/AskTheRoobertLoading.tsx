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

  // анімації (легке масштабування + фейд-ін)
  const scaleAnim = useRoobertRef(new RoobertAnim.Value(0)).current;
  const fadeAnim = useRoobertRef(new RoobertAnim.Value(0)).current;

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

  // перевірка онбордингу (НАВІГАЦІЮ ВКЛЮЧИ ТУТ, КОЛИ ТРЕБА)
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

      // 👉 КОЛИ ГОТОВИЙ — розкоментуй навігацію:
      // navigation.replace(
      //   needsOnboarding ? 'AskTheRoobertOnboarding' : 'AskTheRoobertToOtherPgs'
      // );
    })();
  }, [navigation]);

  // ref на Video (про всяк випадок, якщо захочеш керувати вручну)
  const videoRef = useRoobertRef<Video>(null);

  return (
    <RoobertView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* бекграунд-градієнт */}
      <Image
        source={require('../theAskAssetsRoobert/theAskImagesRoobert/roobertRadialGradient.png')}
        style={{ position: 'absolute', top: 0, left: 0, width, height }}
      />

      {/* шар з анімацією появи (опціонально) */}
      <RoobertAnim.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        <RoobertView pointerEvents="none">
          <Video
            ref={videoRef}
            source={require('../theAskAssetsRoobert/theAskVideosRoobert/kangarooHand.mp4')}
            style={{ width, height: width }}   // квадратне відео, центрується
            resizeMode="contain"
            controls={false}
            // 🔁 основне — зациклити:
            repeat
            // якщо хочеш ще й дублюючу гарантію лупу:
            onEnd={() => {
              try {
                videoRef.current?.seek(0);
              } catch {}
            }}
            // звук за замовчуванням вимкнено
            muted
            volume={0}
            // для iOS — щоб крутився навіть у тихому режимі
            playsInSilentModeIOS
            ignoreSilentSwitch="ignore"
            // автоплей
            paused={false}
            // корисні колбеки для дебагу
            onError={(e) => __DEV__ && console.warn('Video error', e)}
            onLoad={() => __DEV__ && console.log('Video loaded')}
          />
        </RoobertView>
      </RoobertAnim.View>
    </RoobertView>
  );
};

export default AskTheRoobertLoading;

