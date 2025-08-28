interface AskTheRoobertUsePresetProps {
    onAskTheRoobertAction?: (event: GestureResponderEvent) => void;
    askTheDecision?: object;
    onUsePreset?: (item: any) => void;
    askTheRoobertPage: string;
    setAskTheRoobertPage: React.Dispatch<React.SetStateAction<any>>;
}
import React, { useState, useEffect } from 'react';

import {
    ScrollView as RoobertScrollView,
    View as RoobertView,
    TouchableOpacity as RoobertPress,
    GestureResponderEvent,
    Share,
    Image as RoobertImage,
    Text as RoobertText,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoobertYellowRadial from '../theAskComponentsRoobert/AskTheRoobertRadialYellowGradientProps';
import RoobertContainer from '../theAskComponentsRoobert/AskTheRoobertUniqueView';
import { fonts as roobertFonts } from '../fonts';
import LinearGradient from 'react-native-linear-gradient';

const AskTheRoobertArchiveAndUsePreset: React.FC<AskTheRoobertUsePresetProps> = ({
    onUsePreset,
    askTheRoobertPage,
    setAskTheRoobertPage,
}) => {

    const [askTheRobertArchive, setAskTheRobertArchive] = useState<Array<any>>([]);

    const askDims = Dimensions.get('window');

    useEffect(() => {
        if (askTheRoobertPage === 'Archive') {
            AsyncStorage.getItem('askTheRobertArchive').then(res => {
                if (res) {
                    setAskTheRobertArchive(JSON.parse(res));
                } else {
                    setAskTheRobertArchive([]);
                }
            });
        }
    }, [askTheRoobertPage]);

    const presetData = [
        {
            header: 'Yes or No',
            label: '2 options',
            choices: [
                { text: 'Yes', color: '#FF2F33' },
                { text: 'No', color: '#3DC000' },
            ],
        },
        {
            header: "What's for Dinner",
            label: '4 options',
            choices: [
                { text: 'Pizza', color: '#FF2F33' },
                { text: 'Sushi', color: '#3DC000' },
                { text: 'Burger', color: '#26A4FF' },
                { text: 'Salad', color: '#FF6DEB' },
            ],
        },
    ];

    const getArchiveOrPresetData = () => {
        if (askTheRoobertPage === 'Use preset') {
            return presetData;
        }
        return askTheRobertArchive;
    }

    const archOrPresetsD = getArchiveOrPresetData();

    return (
        <RoobertView style={{ flex: 1 }}>
            <RoobertContainer>
                <RoobertView style={{
                    alignSelf: 'center',
                    justifyContent: 'flex-start',
                    width: askDims.width * 0.8,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <RoobertPress onPress={() => {
                        setAskTheRoobertPage('Ask The Roobert Home Gen Screen');
                    }}>
                        <RoobertImage
                            source={require('../theAskAssetsRoobert/theAskIconsRoobert/askTheBack.png')}
                            style={{
                                marginRight: askDims.width * 0.02,
                                width: askDims.width * 0.07,
                                height: askDims.width * 0.07,
                            }}
                            resizeMode='contain'
                        />
                    </RoobertPress>
                    <RoobertText
                        style={{
                            color: '#FFC423',
                            fontFamily: roobertFonts.askTheRoobertK2DBold,
                            fontSize: askDims.width * 0.070456,
                            textAlign: 'center',
                        }}
                    >
                        {askTheRoobertPage}
                    </RoobertText>
                </RoobertView>

                <RoobertScrollView style={{width: askDims.width, paddingTop: askDims.height * 0.01}} scrollEnabled={askTheRoobertPage === 'Archive'} contentContainerStyle={{ paddingBottom: askDims.height * 0.098345 }} showsVerticalScrollIndicator={false}>
                    {archOrPresetsD.length > 0 && archOrPresetsD.map((item, idx) => (
                        <RoobertView
                            key={idx}
                            style={{
                                alignSelf: 'center',
                                shadowOffset: { width: 0, height: 0 },
                                borderRadius: askDims.width * 0.08,
                                borderWidth: askDims.width * 0.00350354,
                                borderColor: '#493fac',
                                width: askDims.width * 0.8,
                                backgroundColor: 'transparent',
                                alignItems: 'center',
                                shadowRadius: askDims.width * 0.04,
                                shadowOpacity: 0.8,
                                shadowColor: '#000',
                                marginTop: idx === 0 ? askDims.height * 0.01 : askDims.height * 0.014,
                            }}
                        >
                            <LinearGradient
                                colors={['#4940AE', '#1a1667ff']}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    top: 0,
                                    right: 0,
                                    position: 'absolute',
                                    left: 0,
                                    borderRadius: askDims.width * 0.08,
                                    bottom: 0,
                                }}
                                start={{ x: 0.3, y: 0 }}
                            />

                            <RoobertView style={{
                                alignItems: 'center',
                                width: '100%',
                                padding: askDims.width * 0.04,
                            }}>
                                <RoobertView style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: askDims.width * 0.04,
                                    justifyContent: 'flex-start',
                                    alignSelf: 'center',
                                    marginBottom: askDims.width * 0.04,
                                }}>
                                    <RoobertText
                                        style={{
                                            fontFamily: roobertFonts.askTheRoobertK2DBold,
                                            fontSize: askDims.width * 0.059,
                                            textAlign: 'center',
                                            color: '#FFC423',
                                            maxWidth: '59%',
                                        }}
                                        numberOfLines={1}
                                        adjustsFontSizeToFit
                                    >
                                        {item.header}
                                    </RoobertText>
                                    <RoobertText
                                        style={{
                                            fontSize: askDims.width * 0.04,
                                            color: 'white',
                                            textAlign: 'center',
                                            fontFamily: roobertFonts.askTheRoobertK2DBold,
                                        }}
                                    >
                                        {askTheRoobertPage === 'Use preset' ? item.label : item.date}
                                    </RoobertText>
                                </RoobertView>

                                {item.choices.map((choice, index) => (
                                    <RoobertView
                                        key={choice.text}
                                        style={{
                                            backgroundColor: choice.color,
                                            width: '100%',
                                            marginBottom: askDims.width * 0.025,
                                            borderRadius: askDims.width * 0.0444,
                                            paddingVertical: askDims.width * 0.021,
                                            borderWidth: askDims.width * 0.003,
                                            borderColor: '#8D86DA',
                                            paddingHorizontal: askDims.width * 0.04,
                                        }}
                                    >
                                        <RoobertText
                                            style={{
                                                color: 'white',
                                                fontSize: askDims.width * 0.045,
                                                fontFamily: roobertFonts.askTheRoobertK2DBold,
                                            }}
                                        >
                                            {index + 1} - {choice.text}
                                        </RoobertText>
                                    </RoobertView>
                                ))}

                                <RoobertView style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignSelf: 'flex-start',
                                }}>
                                    <RoobertPress
                                        onPress={() => {
                                            onUsePreset && onUsePreset(item);
                                        }}
                                        style={{
                                            height: askDims.height * 0.071,
                                            justifyContent: 'center',
                                            borderColor: '#FFF3B9',
                                            shadowColor: '#000',
                                            flexDirection: 'row',
                                            shadowOffset: { width: 0, height: 0 },
                                            alignItems: 'center',
                                            borderWidth: askDims.width * 0.00350354,
                                            width: askDims.width * 0.5,
                                            shadowOpacity: 0.4,
                                            shadowRadius: askDims.width * 0.04,
                                            borderRadius: askDims.width * 0.070345,
                                        }}
                                        activeOpacity={0.8}
                                    >
                                        <RoobertYellowRadial
                                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                                            borderRadius={askDims.height * 0.028}
                                        />
                                        <RoobertText
                                            style={{
                                                fontSize: askDims.width * 0.048,
                                                color: '#191549',
                                                textAlign: 'center',
                                                fontFamily: roobertFonts.askTheRoobertK2DBold,
                                            }}
                                            >
                                            Use preset
                                        </RoobertText>
                                    </RoobertPress>

                                    <RoobertPress
                                        onPress={() => {
                                            Share.share({
                                                message: `Can't decide ${item.label === '2 options' ? 'between ' : ''}${item.header}? Our Roobert will help you with this in Ask The Roobert app!`
                                            })
                                        }}
                                        style={{
                                            height: askDims.height * 0.075,
                                            borderWidth: askDims.width * 0.0023,
                                            elevation: 5,
                                            shadowRadius: askDims.width * 0.05,
                                            width: askDims.height * 0.075,
                                            shadowOffset: { width: 0, height: 0 },
                                            shadowOpacity: 0.8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: askDims.height * 0.028,
                                            shadowColor: '#000',
                                        }}
                                    >
                                        <RoobertYellowRadial
                                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                                            borderRadius={askDims.height * 0.028}
                                        />
                                        <RoobertImage
                                            source={require('../theAskAssetsRoobert/theAskIconsRoobert/askShareDark.png')}
                                            style={{
                                                width: askDims.height * 0.037,
                                                
                                                height: askDims.height * 0.037,
                                            }}
                                        />
                                    </RoobertPress>
                                </RoobertView>
                            </RoobertView>
                        </RoobertView>
                    ))}
                </RoobertScrollView>
            </RoobertContainer>
        </RoobertView>
    );
};

export default AskTheRoobertArchiveAndUsePreset;
