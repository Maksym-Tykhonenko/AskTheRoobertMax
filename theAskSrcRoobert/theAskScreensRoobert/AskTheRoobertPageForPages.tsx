const askTheRoobertPagesKnops = [
    {
        askTheRoobertPage: 'Create the decide',
        askTheRoobertIcon: require('../theAskAssetsRoobert/theAskIconsRoobert/createTheDicide.png'),
    },
    {
        askTheRoobertPage: 'Use preset',
        askTheRoobertIcon: require('../theAskAssetsRoobert/theAskIconsRoobert/usePreset.png'),
    },
    {
        askTheRoobertPage: 'Settings',
        askTheRoobertIcon: require('../theAskAssetsRoobert/theAskIconsRoobert/settings.png'),
    },
    {
        askTheRoobertPage: 'How it works?',
        askTheRoobertIcon: require('../theAskAssetsRoobert/theAskIconsRoobert/howItWorks.png'),
    },
    {
        askTheRoobertPage: 'Archive',
        askTheRoobertIcon: require('../theAskAssetsRoobert/theAskIconsRoobert/archive.png'),
    },
];

import React from 'react';
import {
    View as AskRoobertView,
    Dimensions as AskRoobertDims,
    TouchableOpacity as AskRoobertBtn,
    Text as AskRoobertText,
    Image as AskRoobertImage,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import { fonts as askTheFonts } from '../fonts';
import AskTheRoobertRadialYellowGradientProps from '../theAskComponentsRoobert/AskTheRoobertRadialYellowGradientProps';

interface AskTheRoobertPageForPagesProps {
    setAskTheRoobertPage: (page: string) => void;
    onCreateDecide?: () => void;
}

const AskTheRoobertPageForPages: React.FC<AskTheRoobertPageForPagesProps> = ({ setAskTheRoobertPage, onCreateDecide }) => {
    const askDims = AskRoobertDims.get('window');

    return (
        <AskRoobertView style={{ flex: 1 }}>
            {/* Фон з відео */}
            <AskRoobertView pointerEvents="none">
                <Video
                    repeat
                    style={{ width: askDims.width, height: askDims.width }}
                    controls={false}
                    muted
                    resizeMode="contain"
                    volume={0}
                    source={require('../theAskAssetsRoobert/theAskVideosRoobert/kangarooHand.mp4')}
                />
            </AskRoobertView>

            {/* Контейнер із кнопками */}
            <AskRoobertView
                style={{
                    borderColor: '#4940AE',
                    alignSelf: 'center',
                    width: askDims.width,
                    flex: 1,
                    marginTop: -askDims.height * 0.057,
                    borderRadius: askDims.width * 0.05,
                    elevation: 5,
                    shadowOffset: { width: 0, height: -askDims.width * 0.004 },
                    shadowOpacity: 1,
                    shadowRadius: 0,
                    borderTopLeftRadius: askDims.width * 0.08,
                    borderTopRightRadius: askDims.width * 0.08,
                    alignItems: 'center',
                    borderWidth: askDims.width * 0.0023,
                    shadowColor: '#8E83FF',
                }}
            >
                <LinearGradient
                    colors={['#2F278B', '#1B1655']}
                    start={{ x: 0.3, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderTopRightRadius: askDims.width * 0.08,
                        position: 'absolute',
                        borderTopLeftRadius: askDims.width * 0.08,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                    }}
                />

                {/* Заголовок */}
                <AskRoobertText
                    style={{
                        marginTop: askDims.width * 0.031,
                        textAlign: 'center',
                        fontSize: askDims.width * 0.064,
                        paddingHorizontal: askDims.width * 0.04,
                        color: '#FFC423',
                        fontFamily: askTheFonts.askTheRoobertK2DSemiBold,
                    }}
                >
                    Ask the Roobert
                </AskRoobertText>

                {/* Підзаголовок */}
                <AskRoobertText
                    style={{
                        marginTop: askDims.width * 0.031,
                        textAlign: 'center',
                        fontFamily: askTheFonts.askTheRoobertK2DRegular,
                        paddingHorizontal: askDims.width * 0.04,
                        color: 'white',
                        fontSize: askDims.width * 0.044,
                    }}
                >
                    Quick choices, zero overthinking.
                </AskRoobertText>

                {/* Кнопки */}
                <AskRoobertView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {askTheRoobertPagesKnops.map((knop, index) => (
                        <AskRoobertBtn
                            key={index}
                            onPress={() => {
                                if (knop.askTheRoobertPage === 'Create the decide') {
                                    if (onCreateDecide) onCreateDecide();
                                }
                                setAskTheRoobertPage(knop.askTheRoobertPage);
                            }}
                            style={{
                                gap: askDims.width * 0.0190345,
                                marginVertical: askDims.width * 0.0160345,
                                height: askDims.height * 0.071,
                                justifyContent: 'center',
                                borderColor: '#FFF3B9',
                                width: askDims.width * 0.8,
                                flexDirection: 'row',
                                borderWidth: askDims.width * 0.00350354,
                                alignItems: 'center',
                                borderRadius: askDims.width * 0.070345,
                            }}
                            activeOpacity={0.8}
                        >
                            <AskTheRoobertRadialYellowGradientProps
                                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                                borderRadius={askDims.height * 0.028}
                            />
                            <AskRoobertImage
                                source={knop.askTheRoobertIcon}
                                style={{ height: askDims.height * 0.028, width: askDims.height * 0.028 }}
                                resizeMode="contain"
                            />
                            <AskRoobertText
                                style={{
                                    textAlign: 'center',
                                    fontSize: askDims.width * 0.048,
                                    color: '#191549',
                                    fontFamily: askTheFonts.askTheRoobertK2DBold,
                                }}
                            >
                                {knop.askTheRoobertPage}
                            </AskRoobertText>
                        </AskRoobertBtn>
                    ))}
                </AskRoobertView>
            </AskRoobertView>
        </AskRoobertView>
    );
};

export default AskTheRoobertPageForPages;
