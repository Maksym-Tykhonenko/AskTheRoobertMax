import AskTheRoobertSettings from './AskTheRoobertSettings';
import AskTheRoobertArchiveAndUsePreset from './AskTheRoobertArchiveAndUsePreset';
import AskTheRoobertHowItWorks from './AskTheRoobertHowItWorks';
import AskTheRoobertCreateTheDecide from './AskTheRoobertCreateTheDecide';
import React, {
  useState,
  useState as useRoobertState,
} from 'react';
import {
  Platform as RoobertPlatform,
  View as RoobertView,
  SafeAreaView,
  ImageBackground,
  Dimensions as RoobertDims,
} from 'react-native';

import AskTheRoobertPageForPages from './AskTheRoobertPageForPages';


type AskPagesTheRoobert =
  | 'Ask The Roobert Home Gen Screen'
  | 'How it works?'
  | 'Use preset'
  | 'Create the decide'
  | 'Settings'
  | 'Archive';

const AskTheRoobertToOtherPgs: React.FC = () => {
  const [askActPage, setAskActPage] = useRoobertState<AskPagesTheRoobert>(
    'Ask The Roobert Home Gen Screen'
  );
  const [isOpenedRandomizer, setIsOpenedRandomizer] = useState(false);

  const [roobertScreen, setRoobertScreen] = useRoobertState(RoobertDims.get('window'));

  // Стан для збереження вибраного пресету
  const [preset, setPreset] = useState<{
    title: string;
    optionMode: number;
    options: string[];
    colors: string[];
  } | null>(null);

  // Використати пресет із архіву/пресетів
  const onUsePresetHandler = (item: any) => {
    setPreset({
      title: item.header,
      optionMode: item.choices.length,
      options: item.choices.map((c: any) => c.text),
      colors: item.choices.map((c: any) => c.color),
    });
    setIsOpenedRandomizer(true);
    setAskActPage('Create the decide');
  };

  const handleCreateDecide = () => {
    setPreset(null);
    setIsOpenedRandomizer(false);
  };

  // Рендер потрібної сторінки
  const renderActivePage = () => {
    if (askActPage === 'Ask The Roobert Home Gen Screen') {
      return (
        <AskTheRoobertPageForPages
          setAskTheRoobertPage={setAskActPage}
          onCreateDecide={handleCreateDecide}
        />
      );
    }
    if (askActPage === 'How it works?') {
      return <AskTheRoobertHowItWorks setAskTheRoobertPage={setAskActPage} />;
    }
    if (askActPage === 'Settings') {
      return <AskTheRoobertSettings setAskTheRoobertPage={setAskActPage} />;
    }
    if (askActPage === 'Create the decide') {
      return (
        <AskTheRoobertCreateTheDecide
          preset={preset}
          isOpenedRandomizer={isOpenedRandomizer}
          setAskTheRoobertPage={setAskActPage}
          setIsOpenedRandomizer={setIsOpenedRandomizer}
        />
      );
    }
    if (askActPage === 'Use preset' || askActPage === 'Archive') {
      return (
        <AskTheRoobertArchiveAndUsePreset
          onUsePreset={onUsePresetHandler}
          askTheRoobertPage={askActPage}
          setAskTheRoobertPage={setAskActPage}
        />
      );
    }
    return null;
  };

  return (
    <RoobertView
      style={{
        backgroundColor: '#000',
        height: roobertScreen.height,
        width: roobertScreen.width,
        flex: 1,
      }}
    >
      <ImageBackground
        source={require('../theAskAssetsRoobert/theAskImagesRoobert/roobertRadialGradient.png')}
        resizeMode="cover"
        style={{
          left: 0,
          width: roobertScreen.width * 1.1,
          zIndex: 0,
          position: 'absolute',
          top: 0,
          height: roobertScreen.height,
        }}
      />

      {(askActPage !== 'Ask The Roobert Home Gen Screen' &&
        !(askActPage === 'Create the decide' && isOpenedRandomizer)) && (
          <SafeAreaView />
        )}

      {RoobertPlatform.OS === 'android' && (
        <RoobertView style={{ paddingTop: roobertScreen.height * 0.0320546 }} />
      )}

      {renderActivePage()}
    </RoobertView>
  );
};

export default AskTheRoobertToOtherPgs;
