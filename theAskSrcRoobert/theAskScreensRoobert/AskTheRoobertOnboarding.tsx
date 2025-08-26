import askTheOnbsDtaRoobert from '../theAskDataRoobert/askTheOnbsDtaRoobert';
import React, { useState as useRoobertState } from 'react';
import {
    Text as RoobertTxt,
    Image as RoobertImg,
    Dimensions as RoobertDims,
    TouchableOpacity as RoobertTouch,
    View as RoobertView,
} from 'react-native';
import { useNavigation as useRoobertNav } from '@react-navigation/native';
import { fonts as roobertFonts } from '../fonts';
import LinearGradient from 'react-native-linear-gradient';

const AskTheRoobertOnboarding: React.FC = () => {
    const [askCurrentSliOf, setAskCurrentSliOf] = useRoobertState(0);
    const { width, height } = RoobertDims.get('window');
    const nav = useRoobertNav();

    const askTheNxtRoobert = () => {
        if (askCurrentSliOf < askTheOnbsDtaRoobert.length - 1) {
            setAskCurrentSliOf(prev => prev + 1);
        } else {
            nav.replace?.('AskTheRoobertToOtherPgs');
        }
    };

    return (
        <RoobertView style={{ flex: 1 }}>
            {/* Фонове зображення */}
            <RoobertImg
                source={askTheOnbsDtaRoobert[askCurrentSliOf].askTheImageOfOnboardingRoobert}
                resizeMode="cover"
                style={{
                    height,
                    position: 'absolute',
                    width: width * 1.03,
                    alignSelf: 'center',
                }}
            />

            {/* Контейнер для тексту та кнопок */}
            <RoobertView
                style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    height: height * 0.28,
                    bottom: height * 0.12,
                    width,
                    alignItems: 'center',
                }}
            >
                {/* Блок з описом */}
                <RoobertView
                    style={{
                        shadowOpacity: 0.8,
                        alignSelf: 'center',
                        width: width * 0.86,
                        height: height * 0.19,
                        borderColor: '#4940AE',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        borderRadius: width * 0.05,
                        shadowRadius: width * 0.05,
                        elevation: 5,
                        borderWidth: width * 0.0023,
                        alignItems: 'center',
                    }}
                >
                    <LinearGradient
                        colors={['#4940AE', '#09072C']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            borderRadius: width * 0.05,
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                        }}
                    />

                    <RoobertTxt
                        style={{
                            marginTop: width * 0.031,
                            fontSize: width * 0.059,
                            paddingHorizontal: width * 0.04,
                            textAlign: 'center',
                            color: '#FFC423',
                            fontFamily: roobertFonts.askTheRoobertK2DSemiBold,
                        }}
                    >
                        {askTheOnbsDtaRoobert[askCurrentSliOf].askTheTitleOfOnboardingRoobert}
                    </RoobertTxt>

                    <RoobertTxt
                        style={{
                            paddingHorizontal: width * 0.04,
                            marginTop: width * 0.04,
                            fontFamily: roobertFonts.askTheRoobertK2DRegular,
                            textAlign: 'center',
                            fontSize: width * 0.04,
                            color: 'white',
                        }}
                    >
                        {askTheOnbsDtaRoobert[askCurrentSliOf].askTheDescriptionOfOnboardingRoobert}
                    </RoobertTxt>
                </RoobertView>

                {/* Кнопки керування */}
                <RoobertView
                    style={{
                        marginTop: width * 0.04,
                        alignSelf: 'center',
                        width: width * 0.86,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    {/* Skip */}
                    <RoobertTouch
                        onPress={() => nav.replace?.('AskTheRoobertToOtherPgs')}
                        style={{
                            borderColor: '#4940AE',
                            width: height * 0.075,
                            height: height * 0.075,
                            justifyContent: 'center',
                            shadowOffset: { width: 0, height: 0 },
                            alignItems: 'center',
                            shadowColor: '#000',
                            borderRadius: height * 0.028,
                            shadowRadius: width * 0.05,
                            elevation: 5,
                            borderWidth: width * 0.0023,
                            shadowOpacity: 0.8,
                        }}
                    >
                        <LinearGradient
                            colors={['#4940AE', '#09072C']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                borderRadius: height * 0.028,
                                top: 0,
                                right: 0,
                                left: 0,
                                position: 'absolute',
                                bottom: 0,
                            }}
                        />
                        <RoobertImg
                            source={require('../theAskAssetsRoobert/theAskIconsRoobert/askSkip.png')}
                            style={{ width: height * 0.037, height: height * 0.037 }}
                        />
                    </RoobertTouch>

                    {/* Next */}
                    <RoobertTouch
                        onPress={askTheNxtRoobert}
                        style={{
                            height: height * 0.075,
                            shadowColor: '#000',
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation: 5,
                            shadowOpacity: 0.8,
                            shadowOffset: { width: 0, height: 0 },
                            shadowRadius: width * 0.05,
                            borderWidth: width * 0.0023,
                            flex: 1,
                            borderRadius: height * 0.028,
                            borderColor: '#4940AE',
                            marginHorizontal: width * 0.025,
                        }}
                    >
                        <LinearGradient
                            colors={['#FEDD3C', '#FFB514']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                right: 0,
                                top: 0,
                                position: 'absolute',
                                borderRadius: height * 0.028,
                                left: 0,
                                bottom: 0,
                            }}
                        />
                        <RoobertTxt
                            style={{
                                fontFamily: roobertFonts.askTheRoobertK2DBold,
                                fontSize: width * 0.053,
                                textAlign: 'center',
                                color: '#191549',
                            }}
                        >
                            Next
                        </RoobertTxt>
                    </RoobertTouch>

                    {/* Share */}
                    <RoobertTouch
                        onPress={askTheNxtRoobert}
                        style={{
                            borderColor: '#4940AE',
                            height: height * 0.075,
                            alignItems: 'center',
                            shadowRadius: width * 0.05,
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.8,
                            shadowColor: '#000',
                            justifyContent: 'center',
                            borderWidth: width * 0.0023,
                            width: height * 0.075,
                            borderRadius: height * 0.028,
                            elevation: 5,
                        }}
                    >
                        <LinearGradient
                            colors={['#4940AE', '#09072C']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                bottom: 0,
                                position: 'absolute',
                                borderRadius: height * 0.028,
                                top: 0,
                                right: 0,
                                left: 0,
                            }}
                        />
                        <RoobertImg
                            source={require('../theAskAssetsRoobert/theAskIconsRoobert/askShare.png')}
                            style={{ width: height * 0.037, height: height * 0.037 }}
                        />
                    </RoobertTouch>
                </RoobertView>
            </RoobertView>
        </RoobertView>
    );
};

export default AskTheRoobertOnboarding;
